<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { inBrowser, useData, useRoute, withBase } from 'vitepress'
import PageRedirect from './PageRedirect.vue'
import ImageViewer from './ImageViewer.vue'

const { frontmatter } = useData()
const route = useRoute()

function decodePath(path: string) {
  try {
    return decodeURI(path)
  } catch {
    return path
  }
}

function getPathWithoutBase(path: string) {
  const candidates = [withBase('/'), decodePath(withBase('/'))]
  const decodedPath = decodePath(path)

  for (const base of candidates) {
    if (path === base || decodedPath === base) {
      return '/'
    }
    if (path.startsWith(base)) {
      return `/${path.slice(base.length)}`
    }
    if (decodedPath.startsWith(base)) {
      return `/${decodedPath.slice(base.length)}`
    }
  }

  return decodedPath
}

const isRedirectEntryRoute = computed(() => {
  const currentPath = inBrowser ? window.location.pathname : route.path
  const pathWithoutBase = getPathWithoutBase(currentPath)
  return pathWithoutBase === '/' || pathWithoutBase === '/index.html' || pathWithoutBase === '/docs/' || pathWithoutBase === '/docs/index.html'
})
const isRedirectPage = computed(() => frontmatter.value.layout === 'page-redirect' && isRedirectEntryRoute.value)

let imageObserver: MutationObserver | null = null
let lazyImageObserver: IntersectionObserver | null = null
let scheduledEnhanceTask: number | null = null
let scheduledPreloadTask: number | null = null
let scheduledEnhanceBatchTask: number | null = null
let activeLazyImageLoads = 0
let lazyImageQueue: HTMLImageElement[] = []
let activeLazyImages = new Set<HTMLImageElement>()
let lastScrollY = 0
let lastScrollAt = 0
let scrollPixelsPerMs = 0
let lastPreloadScanAt = 0
let lazyImageRuntimeId = 0
const lightboxSrc = ref('')
const lightboxAlt = ref('')
let lightboxTrigger: HTMLImageElement | null = null
const logoTargetUrl = 'https://www.hiwonder.net/'
let logoLinkPatched = false

function patchLogoLink() {
  if (!inBrowser || logoLinkPatched) return
  const logoImg = document.querySelector<HTMLImageElement>('img.VPImage.logo')
  const link = logoImg?.closest('a') as HTMLAnchorElement | null
  if (!link) return
  logoLinkPatched = true
  link.setAttribute('href', logoTargetUrl)
  link.setAttribute('target', '_self')
  link.addEventListener(
    'click',
    (e) => {
      e.preventDefault()
      window.location.href = logoTargetUrl
    },
    { once: false }
  )
}

// 图片懒加载可调参数区：
// - 如果切换章节还是卡，优先调小 rootMargin、preloadAhead、batchSize 和并发数。
// - 如果图片出现太晚，再适当调大 rootMargin 或 preloadAhead。
// - 这里的距离单位都是 px；时间单位都是 ms。
const lazyImagePlaceholder =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%229%22 viewBox=%220 0 16 9%22%3E%3C/svg%3E'

// IntersectionObserver 的提前触发范围，顺序是：上、右、下、左。
// 下方距离越大，越早开始加载后面的图片；太大会让切章节瞬间加载过多图片。
const lazyImageRootMargin = '160px 0px 420px'

// 滚动时主动预加载的前方距离。滚得越快，会从 min 提升到 max。
const lazyImagePreloadMinAhead = 320
const lazyImagePreloadMaxAhead = 900

// 允许预加载视口上方多远的图片，避免轻微回滚时重新等待。
const lazyImagePreloadBehind = 180

// 离视口多近算高优先级。高优先级图片会 fetchpriority=high。
const lazyImageHighPriorityDistance = 220

// 离视口多近算浏览器自动优先级，其余图片保持 low。
const lazyImageAutoPriorityDistance = 520

// 滚动预加载扫描节流。数值越大，滚动时 CPU 越低，但图片响应会慢一点。
const lazyImagePreloadScanInterval = 160

// 每批给多少张图片绑定懒加载逻辑。数值越小，切章节越不容易卡，但首轮处理更慢。
const imageEnhanceBatchSize = 32

// 分批处理之间的间隔。一般保持一帧左右即可。
const imageEnhanceBatchDelay = 16

const levelOneStorageKey = 'hiwonder-doc-module-level-one'
const levelTwoStorageKey = 'hiwonder-doc-module-level-two'
const standaloneLevelTwoStorageKey = 'hiwonder-doc-module-level-two-standalone'

interface ModuleOption {
  id: string
  label: string
}

function getDocRoot() {
  // VitePress 当前正文区域；所有图片处理都限制在当前章节里。
  return document.querySelector('.vp-doc')
}

function getModuleOptions(blocks: HTMLElement[], level: 1 | 2) {
  const options = new Map<string, ModuleOption>()

  for (const block of blocks) {
    const id = level === 1 ? block.dataset.docLevelOneId : block.dataset.docLevelTwoId
    const label = level === 1 ? block.dataset.docLevelOneLabel : block.dataset.docLevelTwoLabel

    if (id && !options.has(id)) {
      options.set(id, {
        id,
        label: label || id
      })
    }
  }

  return Array.from(options.values())
}

function getSavedOptionId(storageKey: string, options: ModuleOption[]) {
  if (!inBrowser) {
    return options[0]?.id || ''
  }

  const saved = window.localStorage.getItem(storageKey)
  const selectedId = options.some((option) => option.id === saved) ? saved || '' : options[0]?.id || ''

  if (selectedId) {
    window.localStorage.setItem(storageKey, selectedId)
  }

  return selectedId
}

function getNestedLevelTwoBlocksForSelection(docRoot: Element, selectedLevelOneId: string) {
  return Array.from(docRoot.querySelectorAll<HTMLElement>('.doc-level-two-block')).filter((block) => {
    const parentLevelOne = block.closest<HTMLElement>('.doc-level-one-block')
    return parentLevelOne?.dataset.docLevelOneId === selectedLevelOneId
  })
}

function getStandaloneLevelTwoBlocks(docRoot: Element) {
  return Array.from(docRoot.querySelectorAll<HTMLElement>('.doc-level-two-block')).filter(
    (block) => !block.closest('.doc-level-one-block')
  )
}

function createSwitcherRow(
  labelText: string,
  level: 1 | 2,
  options: ModuleOption[],
  selectedId: string,
  storageKey: string
) {
  const row = document.createElement('div')
  row.className = 'doc-variant-switcher__row'

  if (labelText) {
    row.setAttribute('role', 'group')
    row.setAttribute('aria-label', labelText)

    const label = document.createElement('span')
    label.className = 'doc-variant-switcher__label'
    label.textContent = labelText
    row.appendChild(label)
  }

  for (const option of options) {
    const button = document.createElement('button')
    const isSelected = option.id === selectedId
    button.className = 'doc-variant-switcher__button'
    button.type = 'button'
    button.dataset.docModuleLevel = String(level)
    button.dataset.docModuleOption = option.id
    button.dataset.docModuleStorageKey = storageKey
    button.classList.toggle('is-selected', isSelected)
    button.setAttribute('aria-pressed', String(isSelected))

    const name = document.createElement('span')
    name.className = 'doc-variant-switcher__button-name'
    name.textContent = option.label
    button.appendChild(name)

    row.appendChild(button)
  }

  return row
}

function bindModuleSwitcherEvents(switcher: HTMLElement) {
  switcher.querySelectorAll<HTMLButtonElement>('[data-doc-module-option]').forEach((button) => {
    button.onclick = () => {
      const nextOptionId = button.dataset.docModuleOption || ''
      const storageKey = button.dataset.docModuleStorageKey || levelOneStorageKey
      window.localStorage.setItem(storageKey, nextOptionId)
      applyModuleFilter()
    }
  })
}

function ensureModuleSwitcher(
  docRoot: Element,
  levelOneBlocks: HTMLElement[],
  levelOneOptions: ModuleOption[],
  selectedLevelOneId: string,
  levelTwoOptions: ModuleOption[],
  selectedLevelTwoId: string
) {
  const hasOptions = levelOneOptions.length > 0 || levelTwoOptions.length > 0
  let switcher = docRoot.querySelector<HTMLElement>('.doc-variant-switcher--nested')

  if (!hasOptions) {
    switcher?.remove()
    return
  }

  if (!switcher) {
    switcher = document.createElement('div')
    switcher.className = 'doc-variant-switcher doc-variant-switcher--nested'
    switcher.setAttribute('role', 'group')
    switcher.setAttribute('aria-label', 'Select document version')

    const firstBlock = levelOneBlocks[0]
    firstBlock.parentElement?.insertBefore(switcher, firstBlock)
  }

  const rows: HTMLElement[] = []

  if (levelOneOptions.length > 0) {
    rows.push(createSwitcherRow('Current version', 1, levelOneOptions, selectedLevelOneId, levelOneStorageKey))
  }

  if (levelTwoOptions.length > 0) {
    rows.push(createSwitcherRow('', 2, levelTwoOptions, selectedLevelTwoId, levelTwoStorageKey))
  }

  switcher.replaceChildren(...rows)
  bindModuleSwitcherEvents(switcher)
}

function ensureStandaloneModuleSwitcher(
  docRoot: Element,
  standaloneLevelTwoBlocks: HTMLElement[],
  standaloneLevelTwoOptions: ModuleOption[],
  selectedStandaloneLevelTwoId: string
) {
  let switcher = docRoot.querySelector<HTMLElement>('.doc-variant-switcher--standalone')

  if (standaloneLevelTwoOptions.length === 0) {
    switcher?.remove()
    return
  }

  if (!switcher) {
    switcher = document.createElement('div')
    switcher.className = 'doc-variant-switcher doc-variant-switcher--standalone'
    switcher.setAttribute('role', 'group')
    switcher.setAttribute('aria-label', 'Select document content')

    const firstBlock = standaloneLevelTwoBlocks[0]
    firstBlock.parentElement?.insertBefore(switcher, firstBlock)
  }

  switcher.replaceChildren(
    createSwitcherRow(
      '',
      2,
      standaloneLevelTwoOptions,
      selectedStandaloneLevelTwoId,
      standaloneLevelTwoStorageKey
    )
  )
  bindModuleSwitcherEvents(switcher)
}

function applyModuleFilter() {
  if (!inBrowser) {
    return
  }

  const docRoot = getDocRoot()
  if (!docRoot) {
    return
  }

  const levelOneBlocks = Array.from(docRoot.querySelectorAll<HTMLElement>('.doc-level-one-block'))
  const allLevelTwoBlocks = Array.from(docRoot.querySelectorAll<HTMLElement>('.doc-level-two-block'))

  if (levelOneBlocks.length === 0 && allLevelTwoBlocks.length === 0) {
    docRoot.querySelectorAll('.doc-variant-switcher').forEach((switcher) => switcher.remove())
    return
  }

  const levelOneOptions = getModuleOptions(levelOneBlocks, 1)
  const selectedLevelOneId = getSavedOptionId(levelOneStorageKey, levelOneOptions)
  const nestedLevelTwoBlocks = getNestedLevelTwoBlocksForSelection(docRoot, selectedLevelOneId)
  const standaloneLevelTwoBlocks = getStandaloneLevelTwoBlocks(docRoot)
  const levelTwoOptions = getModuleOptions(nestedLevelTwoBlocks, 2)
  const standaloneLevelTwoOptions = getModuleOptions(standaloneLevelTwoBlocks, 2)
  const selectedLevelTwoId = getSavedOptionId(levelTwoStorageKey, levelTwoOptions)
  const selectedStandaloneLevelTwoId = getSavedOptionId(
    standaloneLevelTwoStorageKey,
    standaloneLevelTwoOptions
  )

  ensureModuleSwitcher(
    docRoot,
    levelOneBlocks,
    levelOneOptions,
    selectedLevelOneId,
    levelTwoOptions,
    selectedLevelTwoId
  )
  ensureStandaloneModuleSwitcher(
    docRoot,
    standaloneLevelTwoBlocks,
    standaloneLevelTwoOptions,
    selectedStandaloneLevelTwoId
  )

  for (const block of levelOneBlocks) {
    block.hidden = Boolean(selectedLevelOneId) && block.dataset.docLevelOneId !== selectedLevelOneId
  }

  for (const block of allLevelTwoBlocks) {
    const parentLevelOne = block.closest<HTMLElement>('.doc-level-one-block')

    if (!parentLevelOne) {
      block.hidden =
        Boolean(selectedStandaloneLevelTwoId) &&
        block.dataset.docLevelTwoId !== selectedStandaloneLevelTwoId
      continue
    }

    const isInSelectedLevelOne = parentLevelOne.dataset.docLevelOneId === selectedLevelOneId
    const isSelectedLevelTwo = !selectedLevelTwoId || block.dataset.docLevelTwoId === selectedLevelTwoId
    block.hidden = !(isInSelectedLevelOne && isSelectedLevelTwo)
  }

  scheduleImageEnhancement()
  scheduleNearViewportPreload()
}

function scheduleModuleEnhancement() {
  if (!inBrowser) {
    return
  }

  window.setTimeout(() => {
    applyModuleFilter()
  }, 0)
}

function releaseLazyImageResources(root: Element | null) {
  // 切章节前尽量把旧章节未完成的图片加载态清掉。
  // 浏览器底层请求不一定能强制取消，但可以断开 observer、清队列、移除 srcset/sizes 引用。
  const releaseTargets = new Set<HTMLImageElement>([...lazyImageQueue, ...activeLazyImages])

  root?.querySelectorAll<HTMLImageElement>('img[data-lazy-src]').forEach((img) => {
    releaseTargets.add(img)
  })

  releaseTargets.forEach((img) => {
    lazyImageObserver?.unobserve(img)
    delete img.dataset.lazyObserved
    delete img.dataset.lazyUrgent

    if (img.dataset.lazyLoaded === 'true') {
      return
    }

    img.dataset.lazyLoading = 'false'
    img.removeAttribute('srcset')
    img.removeAttribute('sizes')
    img.src = lazyImagePlaceholder
  })
}

function resetLazyImageRuntime(root: Element | null = null) {
  // 每次切章节都会递增运行批次；旧图片的 load/error 回调回来时会被忽略。
  lazyImageRuntimeId += 1
  imageObserver?.disconnect()
  imageObserver = null
  releaseLazyImageResources(root)
  lazyImageObserver?.disconnect()
  lazyImageObserver = null
  lazyImageQueue = []
  activeLazyImages.clear()
  activeLazyImageLoads = 0
  scrollPixelsPerMs = 0
  lastPreloadScanAt = 0
  if (scheduledEnhanceTask !== null) {
    window.clearTimeout(scheduledEnhanceTask)
    scheduledEnhanceTask = null
  }
  if (scheduledEnhanceBatchTask !== null) {
    window.clearTimeout(scheduledEnhanceBatchTask)
    scheduledEnhanceBatchTask = null
  }
  if (scheduledPreloadTask !== null) {
    window.cancelAnimationFrame(scheduledPreloadTask)
    scheduledPreloadTask = null
  }
}

function isPendingLazyImage(img: HTMLImageElement) {
  return Boolean(img.dataset.lazySrc) && img.dataset.lazyLoaded !== 'true'
}

function isImageInHiddenModule(img: HTMLImageElement) {
  return Boolean(img.closest('.doc-level-one-block[hidden], .doc-level-two-block[hidden]'))
}

function updateImageLightboxEligibility(img: HTMLImageElement) {
  const source = img.currentSrc || img.getAttribute('src') || img.dataset.lazySrc || ''
  const eligible =
    img.complete &&
    img.naturalWidth > 0 &&
    (img.naturalWidth >= 320 || img.naturalHeight >= 240) &&
    !img.classList.contains('inline-icon') &&
    !img.closest('a') &&
    !source.startsWith('data:image')

  img.classList.toggle('vp-lightbox-trigger', eligible)
  if (eligible) {
    img.setAttribute('tabindex', '0')
    img.setAttribute('role', 'button')
    img.setAttribute('aria-label', img.alt ? `Click to enlarge: ${img.alt}` : 'Click to enlarge image')
  } else {
    img.removeAttribute('tabindex')
    img.removeAttribute('role')
    img.removeAttribute('aria-label')
  }
}

function openLightbox(img: HTMLImageElement) {
  if (lightboxSrc.value || isImageInHiddenModule(img)) {
    return
  }

  lightboxTrigger = img
  lightboxSrc.value = img.currentSrc || img.src
  lightboxAlt.value = img.alt.trim()
}

function closeLightbox() {
  const trigger = lightboxTrigger
  lightboxSrc.value = ''
  lightboxAlt.value = ''
  lightboxTrigger = null

  if (trigger?.isConnected) {
    nextTick(() => trigger.focus({ preventScroll: true }))
  }
}

function getLightboxTrigger(target: EventTarget | null) {
  if (!(target instanceof HTMLImageElement) || !target.classList.contains('vp-lightbox-trigger')) {
    return null
  }
  return getDocRoot()?.contains(target) ? target : null
}

function handleLightboxDocumentClick(event: MouseEvent) {
  const img = getLightboxTrigger(event.target)
  if (img) {
    event.preventDefault()
    openLightbox(img)
  }
}

function handleLightboxDocumentKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return
  }
  const img = getLightboxTrigger(event.target)
  if (img) {
    event.preventDefault()
    openLightbox(img)
  }
}

function ensureImageAspectRatio(img: HTMLImageElement) {
  if (img.style.aspectRatio) {
    return
  }

  const width = Number(img.getAttribute('width'))
  const height = Number(img.getAttribute('height'))

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return
  }

  img.style.aspectRatio = `${width} / ${height}`
}

function markImageState(img: HTMLImageElement, state: 'pending' | 'loaded' | 'error') {
  img.classList.remove('is-pending', 'is-loaded', 'is-error')
  img.classList.add(`is-${state}`)
  updateImageLightboxEligibility(img)
}

function bindImageState(img: HTMLImageElement) {
  if (img.dataset.imageStateBound === 'true') {
    return
  }

  img.dataset.imageStateBound = 'true'

  img.addEventListener('load', () => {
    if (isPendingLazyImage(img)) {
      return
    }
    markImageState(img, 'loaded')
  })

  img.addEventListener('error', () => {
    if (isPendingLazyImage(img)) {
      return
    }
    markImageState(img, 'error')
  })
}

function finishLazyImageLoad(img: HTMLImageElement, state: 'loaded' | 'error') {
  img.dataset.lazyLoaded = 'true'
  img.dataset.lazyLoading = 'false'
  activeLazyImages.delete(img)
  markImageState(img, state)
  activeLazyImageLoads = Math.max(0, activeLazyImageLoads - 1)
  processLazyImageQueue()
}

function loadLazyImage(img: HTMLImageElement) {
  // 真正把 data-lazy-src 写回 src 的地方；并发由 getLazyImageConcurrency 控制。
  const lazySrc = img.dataset.lazySrc
  if (!lazySrc || img.dataset.lazyLoaded === 'true' || img.dataset.lazyLoading === 'true') {
    return
  }

  img.dataset.lazyLoading = 'true'
  activeLazyImages.add(img)
  activeLazyImageLoads += 1
  const runtimeId = lazyImageRuntimeId

  let finished = false
  const finish = (state: 'loaded' | 'error') => {
    if (finished) {
      return
    }
    finished = true
    if (runtimeId !== lazyImageRuntimeId || !img.isConnected) {
      activeLazyImages.delete(img)
      return
    }
    finishLazyImageLoad(img, state)
  }

  img.addEventListener('load', () => finish(img.naturalWidth > 0 ? 'loaded' : 'error'), { once: true })
  img.addEventListener('error', () => finish('error'), { once: true })

  if (img.dataset.lazySizes) {
    img.sizes = img.dataset.lazySizes
  }
  if (img.dataset.lazySrcset) {
    img.srcset = img.dataset.lazySrcset
  }
  promoteLoadingPriority(img)
  img.src = lazySrc

  window.setTimeout(() => {
    if (img.complete) {
      finish(img.naturalWidth > 0 ? 'loaded' : 'error')
    }
  }, 0)
}

function processLazyImageQueue() {
  if (lazyImageQueue.length > 1) {
    lazyImageQueue.sort((first, second) => getLazyImageQueueRank(first) - getLazyImageQueueRank(second))
  }

  while (activeLazyImageLoads < getLazyImageConcurrency() && lazyImageQueue.length > 0) {
    const img = lazyImageQueue.shift()
    if (
      !img ||
      isImageInHiddenModule(img) ||
      img.dataset.lazyLoaded === 'true' ||
      img.dataset.lazyLoading === 'true'
    ) {
      continue
    }
    loadLazyImage(img)
  }
}

function getLazyImageConcurrency() {
  // 为了避免 CPU/内存瞬时冲高，默认只并发 1 张；快速滚动时最多 2 张。
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }).connection

  if (connection?.saveData || connection?.effectiveType?.includes('2g')) {
    return 1
  }

  if (connection?.effectiveType?.includes('3g')) {
    return 1
  }

  return scrollPixelsPerMs > 1.2 ? 2 : 1
}

function getImageDistanceToViewport(img: HTMLImageElement) {
  if (!inBrowser || !img.isConnected || isImageInHiddenModule(img)) {
    return Number.POSITIVE_INFINITY
  }

  const rect = img.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight

  if (rect.bottom >= 0 && rect.top <= viewportHeight) {
    return 0
  }

  if (rect.top > viewportHeight) {
    return rect.top - viewportHeight
  }

  return Math.abs(rect.bottom)
}

function isUrgentLazyImage(img: HTMLImageElement) {
  return img.dataset.lazyUrgent === 'true' || getImageDistanceToViewport(img) <= lazyImageHighPriorityDistance
}

function getLazyImageQueueRank(img: HTMLImageElement) {
  return (isUrgentLazyImage(img) ? 0 : 1) * 100000 + getImageDistanceToViewport(img)
}

function promoteLoadingPriority(img: HTMLImageElement) {
  const distance = getImageDistanceToViewport(img)
  img.setAttribute('loading', 'eager')

  if (img.dataset.lazyUrgent === 'true' || distance <= lazyImageHighPriorityDistance) {
    img.setAttribute('fetchpriority', 'high')
  } else if (distance <= lazyImageAutoPriorityDistance) {
    img.setAttribute('fetchpriority', 'auto')
  } else {
    img.setAttribute('fetchpriority', 'low')
  }
}

function getLazyImagePreloadAhead() {
  // 滚动越快，前方预加载距离越长，但不会超过 lazyImagePreloadMaxAhead。
  const velocityBoost = Math.min(
    lazyImagePreloadMaxAhead - lazyImagePreloadMinAhead,
    Math.round(scrollPixelsPerMs * 360)
  )

  return lazyImagePreloadMinAhead + velocityBoost
}

function queueLazyImage(img: HTMLImageElement, priority = false) {
  // 进入队列后按“紧急程度 + 距离视口”排序加载。
  if (
    isImageInHiddenModule(img) ||
    !img.dataset.lazySrc ||
    img.dataset.lazyLoaded === 'true' ||
    img.dataset.lazyLoading === 'true'
  ) {
    return
  }

  if (priority) {
    img.dataset.lazyUrgent = 'true'
  }

  if (lazyImageQueue.includes(img)) {
    processLazyImageQueue()
    return
  }

  if (priority) {
    lazyImageQueue.unshift(img)
  } else {
    lazyImageQueue.push(img)
  }
  processLazyImageQueue()
}

function preloadImagesNearViewport() {
  // 滚动/resize 时补充扫描视口附近图片；这里有节流，避免长章节里反复全量测距。
  if (!inBrowser) {
    return
  }

  const now = window.performance.now()
  if (lastPreloadScanAt > 0 && now - lastPreloadScanAt < lazyImagePreloadScanInterval) {
    return
  }
  lastPreloadScanAt = now

  const docRoot = getDocRoot()
  if (!docRoot) {
    return
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const preloadAhead = getLazyImagePreloadAhead()
  const images = Array.from(docRoot.querySelectorAll<HTMLImageElement>('img[data-lazy-src]'))

  for (const img of images) {
    if (
      isImageInHiddenModule(img) ||
      img.dataset.lazyLoaded === 'true' ||
      img.dataset.lazyLoading === 'true'
    ) {
      continue
    }

    const rect = img.getBoundingClientRect()
    if (rect.bottom < -lazyImagePreloadBehind || rect.top > viewportHeight + preloadAhead) {
      continue
    }

    const isUrgent = rect.bottom >= -80 && rect.top <= viewportHeight + 180
    queueLazyImage(img, isUrgent)
  }
}

function scheduleNearViewportPreload() {
  if (!inBrowser || scheduledPreloadTask !== null) {
    return
  }

  scheduledPreloadTask = window.requestAnimationFrame(() => {
    scheduledPreloadTask = null
    preloadImagesNearViewport()
  })
}

function handleViewportScroll() {
  const now = window.performance.now()
  const scrollY = window.scrollY

  if (lastScrollAt > 0) {
    const elapsed = Math.max(16, now - lastScrollAt)
    scrollPixelsPerMs = Math.min(4, Math.abs(scrollY - lastScrollY) / elapsed)
  }

  lastScrollY = scrollY
  lastScrollAt = now
  scheduleNearViewportPreload()
}

function getLazyImageObserver() {
  // 主要依赖 IntersectionObserver 发现接近视口的图片，比滚动时全量扫描轻。
  if (!inBrowser || !('IntersectionObserver' in window)) {
    return null
  }

  if (!lazyImageObserver) {
    lazyImageObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }

          const img = entry.target as HTMLImageElement
          lazyImageObserver?.unobserve(img)
          queueLazyImage(img)
        }
      },
      {
        rootMargin: lazyImageRootMargin,
        threshold: 0.01
      }
    )
  }

  return lazyImageObserver
}

function observeLazyImage(img: HTMLImageElement) {
  if (isImageInHiddenModule(img)) {
    return
  }

  const observer = getLazyImageObserver()
  if (!observer) {
    queueLazyImage(img)
    return
  }

  if (img.dataset.lazyObserved === 'true') {
    return
  }

  img.dataset.lazyObserved = 'true'
  observer.observe(img)
}

function enhanceImage(img: HTMLImageElement, shouldAssignPriority: boolean) {
  // 给单张图片补状态 class、优先级和懒加载观察器。
  // inline-icon 和 data:image 不参与硬懒加载，避免正文小图闪烁。
  const isInlineIcon = img.classList.contains('inline-icon')
  const currentSrc = img.currentSrc || ''
  const sourceSrc = img.getAttribute('src') || ''
  const lazySrc = img.dataset.lazySrc || ''
  const isDataImage = lazySrc
    ? lazySrc.startsWith('data:image')
    : currentSrc.startsWith('data:image') || sourceSrc.startsWith('data:image')
  const isInsideTable = Boolean(img.closest('table'))

  img.setAttribute('decoding', 'async')

  if (isInlineIcon || isDataImage) {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded')
    }
    return false
  }

  img.classList.add('vp-lazy-image')
  img.classList.toggle('is-table-image', isInsideTable)
  ensureImageAspectRatio(img)

  const isPriorityImage = shouldAssignPriority && !isInsideTable

  if (isPriorityImage) {
    img.setAttribute('loading', 'eager')
    img.setAttribute('fetchpriority', 'high')
    img.classList.add('is-priority-image')
    img.dataset.lazyPriority = 'true'
  } else {
    img.setAttribute('loading', 'lazy')
    img.setAttribute('fetchpriority', 'low')
    img.classList.remove('is-priority-image')
    img.dataset.lazyPriority = 'false'
  }

  bindImageState(img)

  if (lazySrc && img.dataset.lazyLoaded !== 'true') {
    markImageState(img, 'pending')
    if (isPriorityImage) {
      queueLazyImage(img, true)
    } else {
      observeLazyImage(img)
    }
  } else if (img.complete) {
    markImageState(img, img.naturalWidth > 0 ? 'loaded' : 'error')
  } else {
    markImageState(img, 'pending')
  }

  return isPriorityImage
}

function enhanceImages() {
  // 章节进入后会拿到当前章节全部图片，但不会一次性处理完。
  // 大章节图片很多时，分批处理能明显降低切章节瞬间的主线程压力。
  if (!inBrowser) {
    return
  }

  const docRoot = getDocRoot()
  if (!docRoot) {
    return
  }

  const images = Array.from(docRoot.querySelectorAll('img')) as HTMLImageElement[]
  let index = 0
  let priorityAssigned = Array.from(
    docRoot.querySelectorAll<HTMLImageElement>('img.is-priority-image')
  ).some((img) => !isImageInHiddenModule(img))

  if (scheduledEnhanceBatchTask !== null) {
    window.clearTimeout(scheduledEnhanceBatchTask)
    scheduledEnhanceBatchTask = null
  }

  const runBatch = () => {
    scheduledEnhanceBatchTask = null

    const limit = Math.min(index + imageEnhanceBatchSize, images.length)
    for (; index < limit; index += 1) {
      const img = images[index]
      if (!img.isConnected || !docRoot.contains(img) || isImageInHiddenModule(img)) {
        continue
      }
      priorityAssigned = enhanceImage(img, !priorityAssigned) || priorityAssigned
    }

    if (index < images.length) {
      scheduledEnhanceBatchTask = window.setTimeout(runBatch, imageEnhanceBatchDelay)
      return
    }

    scheduleNearViewportPreload()
  }

  runBatch()
}

function observeDocChanges() {
  // VitePress/插件如果后续插入新图片，只对新增图片重新增强。
  imageObserver?.disconnect()

  const docRoot = getDocRoot()
  if (!docRoot) {
    return
  }

  imageObserver = new MutationObserver((mutations) => {
    const hasNewModule = mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some(
        (node) =>
          node instanceof HTMLElement &&
          (node.matches('.doc-level-one-block, .doc-level-two-block') ||
            Boolean(node.querySelector('.doc-level-one-block, .doc-level-two-block')))
      )
    )
    const hasNewImage = mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some((node) => node instanceof HTMLImageElement || (node instanceof HTMLElement && node.querySelector('img')))
    )

    if (hasNewModule) {
      applyModuleFilter()
    }

    if (hasNewImage) {
      enhanceImages()
    }
  })

  imageObserver.observe(docRoot, {
    childList: true,
    subtree: true
  })
}

function scheduleImageEnhancement() {
  // 延后一小段时间，等 VitePress 把新章节 DOM 挂上后再处理图片。
  if (!inBrowser) {
    return
  }

  if (scheduledEnhanceTask !== null) {
    window.clearTimeout(scheduledEnhanceTask)
  }

  scheduledEnhanceTask = window.setTimeout(() => {
    scheduledEnhanceTask = null
    enhanceImages()
    observeDocChanges()
  }, 16)
}

onMounted(() => {
  lastScrollY = window.scrollY
  lastScrollAt = window.performance.now()
  window.addEventListener('scroll', handleViewportScroll, { passive: true })
  window.addEventListener('resize', scheduleNearViewportPreload)
  document.addEventListener('click', handleLightboxDocumentClick)
  document.addEventListener('keydown', handleLightboxDocumentKeydown)
  patchLogoLink()
  scheduleImageEnhancement()
  scheduleModuleEnhancement()
})

watch(
  () => route.path,
  async () => {
    // 路由切换时先关闭图片灯箱并清旧章节运行态，再等新章节 DOM 挂载后重新绑定图片逻辑。
    closeLightbox()
    resetLazyImageRuntime(getDocRoot())
    await nextTick()
    patchLogoLink()
    scheduleImageEnhancement()
    scheduleModuleEnhancement()
  }
)

onBeforeUnmount(() => {
  closeLightbox()
  imageObserver?.disconnect()
  resetLazyImageRuntime(getDocRoot())
  window.removeEventListener('scroll', handleViewportScroll)
  window.removeEventListener('resize', scheduleNearViewportPreload)
  document.removeEventListener('click', handleLightboxDocumentClick)
  document.removeEventListener('keydown', handleLightboxDocumentKeydown)
})
</script>

<template>
  <PageRedirect v-if="isRedirectPage" />
  <component :is="DefaultTheme.Layout" v-else />
  <slot name="layout-bottom" />
  <ImageViewer
    v-if="lightboxSrc"
    :src="lightboxSrc"
    :alt="lightboxAlt"
    @close="closeLightbox"
  />
</template>
