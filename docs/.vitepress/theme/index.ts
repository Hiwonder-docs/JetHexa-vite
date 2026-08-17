import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import './custom.css'
import Layout from './Layout.vue'

function collectLockedLinks(items: any[], links = new Set<string>()) {
  for (const item of items || []) {
    if (item?.class === 'is-preview-locked' && item?.link) {
      links.add(item.link)
    }
    collectLockedLinks(item?.items || [], links)
  }
  return links
}

function isLockedHref(href: string, lockedLinks: Set<string>) {
  if (!href || lockedLinks.size === 0) {
    return false
  }

  const pathname = new URL(href, window.location.origin).pathname
  return [...lockedLinks].some((lockedLink) => {
    const lockedPath = new URL(lockedLink, window.location.origin).pathname
    return pathname.endsWith(lockedPath)
  })
}

function markLockedSidebarItems(sidebar: any[]) {
  if (typeof window === 'undefined') {
    return
  }

  const lockedLinks = collectLockedLinks(sidebar)
  document.querySelectorAll<HTMLAnchorElement>('.VPSidebarItem > .item > a.link').forEach((link) => {
    const href = link.getAttribute('href') || ''
    link.closest('.VPSidebarItem')?.classList.toggle('is-preview-locked', isLockedHref(href, lockedLinks))
  })

  document.querySelectorAll<HTMLAnchorElement>('.pager-link').forEach((link) => {
    const href = link.getAttribute('href') || ''
    link.classList.toggle('is-preview-locked', isLockedHref(href, lockedLinks))
  })
}

function getLockedMarkerObserverRoots() {
  return Array.from(document.querySelectorAll<HTMLElement>('.VPSidebar, .VPDocFooter'))
}

const LockedSidebarMarker = defineComponent({
  setup() {
    const { theme } = useData()
    const route = useRoute()
    let observer: MutationObserver | null = null
    let pending = false

    const scheduleMark = () => {
      if (typeof window === 'undefined' || pending) {
        return
      }

      pending = true
      window.requestAnimationFrame(() => {
        pending = false
        markLockedSidebarItems(theme.value.sidebar || [])
      })
    }

    watch(
      () => [route.path, theme.value.sidebar],
      async () => {
        await nextTick()
        scheduleMark()
      },
      { immediate: true },
    )

    onMounted(() => {
      scheduleMark()
      observer = new MutationObserver(() => {
        scheduleMark()
      })

      for (const root of getLockedMarkerObserverRoots()) {
        observer.observe(root, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['href'],
        })
      }
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
      observer = null
    })

    return () => null
  },
})

export default {
  ...DefaultTheme,
  Layout: () => h(Layout, null, { 'layout-bottom': () => h(LockedSidebarMarker) }),
}

