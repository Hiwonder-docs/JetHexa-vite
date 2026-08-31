import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { getSidebar } from './autoSidebar.mts'
import mathjax3 from 'markdown-it-mathjax3'

const problematicStrongEndingPattern = /[：；，。！？、（）【】《》「」『』“”‘’]$/u
const problematicStrongOpeningPattern = /^[（(][^*\n]+?[）)]$/u
const strongWhitespacePattern = /\*\*([^*\n]+)\*\*/g
const inlineCodePattern = /(`+[^`]*`+)/g
const fencePattern = /^\s*(```+|~~~+)/
const lazyImagePlaceholder =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%229%22 viewBox=%220 0 16 9%22%3E%3C/svg%3E'
const imageDimensionCache = new Map<string, { width: number; height: number } | null>()
const docsBase = normalizeBase(process.env.DOCS_BASE || '/projects/JetHexa/en/latest/')

function normalizeBase(value: string) {
  return `/${value.replace(/^\/+|\/+$/g, '')}/`
}

function replaceOutsideInlineCode(line: string, replacer: (segment: string) => string) {
  return line
    .split(inlineCodePattern)
    .map((segment) => (segment.startsWith('`') ? segment : replacer(segment)))
    .join('')
}

function normalizeStrongPairs(segment: string) {
  let normalized = ''
  let cursor = 0

  while (cursor < segment.length) {
    const openingMarker = segment.indexOf('**', cursor)

    if (openingMarker === -1) {
      normalized += segment.slice(cursor)
      break
    }

    const closingMarker = segment.indexOf('**', openingMarker + 2)

    if (closingMarker === -1) {
      normalized += segment.slice(cursor)
      break
    }

    const content = segment.slice(openingMarker + 2, closingMarker)
    const previousChar = openingMarker > 0 ? segment[openingMarker - 1] : ''
    const nextChar = closingMarker + 2 < segment.length ? segment[closingMarker + 2] : ''
    const needsOpeningFix =
      Boolean(previousChar) && /\S/u.test(previousChar) && problematicStrongOpeningPattern.test(content)
    const needsEndingFix =
      Boolean(nextChar) && /\S/u.test(nextChar) && problematicStrongEndingPattern.test(content)

    normalized += segment.slice(cursor, openingMarker)
    normalized += needsOpeningFix || needsEndingFix ? `<strong>${content}</strong>` : `**${content}**`
    cursor = closingMarker + 2
  }

  return normalized
}

function normalizeProblematicStrongSyntax(code: string) {
  let inFence = false
  let activeFenceMarker = ''

  return code
    .split('\n')
    .map((line) => {
      const trimmed = line.trimStart()
      const fenceMatch = trimmed.match(fencePattern)

      if (fenceMatch) {
        const marker = fenceMatch[1]
        if (!inFence) {
          inFence = true
          activeFenceMarker = marker
        } else if (marker[0] === activeFenceMarker[0] && marker.length >= activeFenceMarker.length) {
          inFence = false
          activeFenceMarker = ''
        }
        return line
      }

      if (inFence) {
        return line
      }

      return replaceOutsideInlineCode(line, (segment) => {
        return normalizeStrongPairs(segment)
      })
    })
    .join('\n')
}

function trimWhitespaceInsideStrong(code: string) {
  let inFence = false
  let activeFenceMarker = ''

  return code
    .split('\n')
    .map((line) => {
      const trimmed = line.trimStart()
      const fenceMatch = trimmed.match(fencePattern)

      if (fenceMatch) {
        const marker = fenceMatch[1]
        if (!inFence) {
          inFence = true
          activeFenceMarker = marker
        } else if (marker[0] === activeFenceMarker[0] && marker.length >= activeFenceMarker.length) {
          inFence = false
          activeFenceMarker = ''
        }
        return line
      }

      if (inFence || line.includes('|')) {
        return line
      }

      return replaceOutsideInlineCode(line, (segment) =>
        segment.replace(strongWhitespacePattern, (match, content: string) => {
          const normalized = content.trim()
          if (!normalized || normalized === content) {
            return match
          }
          return `**${normalized}**`
        })
      )
    })
    .join('\n')
}

function convertNoteContainersToGitHubAlerts(code: string) {
  const lines = code.split('\n')
  const normalizedLines: string[] = []
  let inFence = false
  let activeFenceMarker = ''
  let changed = false

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trimStart()
    const fenceMatch = trimmed.match(fencePattern)

    if (fenceMatch) {
      const marker = fenceMatch[1]
      if (!inFence) {
        inFence = true
        activeFenceMarker = marker
      } else if (marker[0] === activeFenceMarker[0] && marker.length >= activeFenceMarker.length) {
        inFence = false
        activeFenceMarker = ''
      }
      normalizedLines.push(line)
      continue
    }

    if (inFence || !/^\s*:::\{[Nn]ote\}\s*$/.test(line)) {
      normalizedLines.push(line)
      continue
    }

    const bodyLines: string[] = []
    let closeLine = index + 1

    while (closeLine < lines.length && !/^\s*:::\s*$/.test(lines[closeLine])) {
      bodyLines.push(lines[closeLine])
      closeLine += 1
    }

    if (closeLine >= lines.length) {
      normalizedLines.push(line)
      continue
    }

    normalizedLines.push('> [!NOTE]')
    for (const bodyLine of bodyLines) {
      normalizedLines.push(bodyLine.length > 0 ? `> ${bodyLine}` : '>')
    }

    index = closeLine
    changed = true
  }

  return changed ? normalizedLines.join('\n') : code
}

function normalizeNoteContainers() {
  return {
    name: 'normalize-note-containers',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !/:::\{[Nn]ote\}/.test(code)) {
        return null
      }

      const transformed = convertNoteContainersToGitHubAlerts(code)
      return transformed === code ? null : transformed
    }
  }
}


function preserveBrokenAbsoluteImages() {
  const imageTagPattern = /<img\b[^>]*\bsrc="([A-Za-z]:\\[^"]+)"[^>]*\/?>/g

  return {
    name: 'preserve-broken-absolute-images',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !imageTagPattern.test(code)) {
        return null
      }

      imageTagPattern.lastIndex = 0
      const transformed = code.replace(imageTagPattern, (tag) => `{${tag.slice(1, -1)}}`)
      return transformed === code ? null : transformed
    }
  }
}

function addNativeLazyLoadingToImages(code: string) {
  const imageTagPattern = /<img\b[^>]*>/g

  return code.replace(imageTagPattern, (tag) => {
    if (/\bloading\s*=/.test(tag)) {
      return tag
    }

    return tag.replace('<img', '<img loading="lazy"')
  })
}

function normalizeProblematicStrongEmphasis() {
  return {
    name: 'normalize-problematic-strong-emphasis',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !code.includes('**')) {
        return null
      }

      const transformed = normalizeProblematicStrongSyntax(code)
      return transformed === code ? null : transformed
    }
  }
}

function normalizeStrongWhitespace() {
  return {
    name: 'normalize-strong-whitespace',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !strongWhitespacePattern.test(code)) {
        return null
      }

      strongWhitespacePattern.lastIndex = 0
      const transformed = trimWhitespaceInsideStrong(code)
      return transformed === code ? null : transformed
    }
  }
}

function lazyLoadHtmlImages() {
  const imageTagPattern = /<img\b[^>]*>/i

  return {
    name: 'lazy-load-html-images',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !imageTagPattern.test(code)) {
        return null
      }

      const transformed = addNativeLazyLoadingToImages(code)
      return transformed === code ? null : transformed
    }
  }
}

function getHtmlAttribute(tag: string, attributeName: string) {
  const attributePattern = new RegExp(`\\s${attributeName}\\s*=\\s*(["'])(.*?)\\1`, 'i')
  const attributeMatch = tag.match(attributePattern)
  return attributeMatch?.[2] || ''
}

function getNumericHtmlAttribute(tag: string, attributeName: string) {
  const rawValue = getHtmlAttribute(tag, attributeName)
  if (!/^\d+(?:\.\d+)?$/.test(rawValue)) {
    return null
  }

  const value = Number(rawValue)
  return Number.isFinite(value) && value > 0 ? value : null
}

function readPngDimensions(buffer: Buffer) {
  if (
    buffer.length < 24 ||
    buffer.toString('binary', 0, 8) !== '\x89PNG\r\n\x1A\n' ||
    buffer.toString('ascii', 12, 16) !== 'IHDR'
  ) {
    return null
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  }
}

function readGifDimensions(buffer: Buffer) {
  const signature = buffer.toString('ascii', 0, 6)
  if (buffer.length < 10 || (signature !== 'GIF87a' && signature !== 'GIF89a')) {
    return null
  }

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8)
  }
}

function readJpegDimensions(buffer: Buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null
  }

  let offset = 2
  const startOfFrameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf])

  while (offset + 3 < buffer.length) {
    while (offset < buffer.length && buffer[offset] !== 0xff) {
      offset += 1
    }
    while (offset < buffer.length && buffer[offset] === 0xff) {
      offset += 1
    }
    if (offset >= buffer.length) {
      return null
    }

    const marker = buffer[offset]
    offset += 1
    if (marker === 0xd8 || marker === 0xd9) {
      continue
    }
    if (offset + 1 >= buffer.length) {
      return null
    }

    const segmentLength = buffer.readUInt16BE(offset)
    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      return null
    }
    if (startOfFrameMarkers.has(marker)) {
      return {
      width: buffer.readUInt16BE(offset + 5),
      height: buffer.readUInt16BE(offset + 3)
      }
    }

    offset += segmentLength
  }

  return null
}

function readWebpDimensions(buffer: Buffer) {
  if (buffer.length < 30 || buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    return null
  }

  const chunkType = buffer.toString('ascii', 12, 16)
  if (chunkType === 'VP8X' && buffer.length >= 30) {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3)
    }
  }
  if (chunkType === 'VP8L' && buffer.length >= 25 && buffer[20] === 0x2f) {
    const b0 = buffer[21]
    const b1 = buffer[22]
    const b2 = buffer[23]
    const b3 = buffer[24]
    return {
      width: 1 + (((b1 & 0x3f) << 8) | b0),
      height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6))
    }
  }
  if (chunkType === 'VP8 ' && buffer.length >= 30 && buffer[23] === 0x9d && buffer[24] === 0x01 && buffer[25] === 0x2a) {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff
    }
  }

  return null
}

function readImageDimensions(imagePath: string) {
  const cachedDimensions = imageDimensionCache.get(imagePath)
  if (imageDimensionCache.has(imagePath)) {
    return cachedDimensions
  }

  let dimensions: { width: number; height: number } | null = null

  try {
    const buffer = fs.readFileSync(imagePath)
    const ext = path.extname(imagePath).toLowerCase()
    if (ext === '.png') {
      dimensions = readPngDimensions(buffer)
    } else if (ext === '.jpg' || ext === '.jpeg') {
      dimensions = readJpegDimensions(buffer)
    } else if (ext === '.gif') {
      dimensions = readGifDimensions(buffer)
    } else if (ext === '.webp') {
      dimensions = readWebpDimensions(buffer)
    }
  } catch {
    dimensions = null
  }

  if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) {
    dimensions = null
  }

  imageDimensionCache.set(imagePath, dimensions)
  return dimensions
}

function resolveLocalImagePath(markdownId: string, src: string) {
  if (!src || /^(?:https?:|data:|#|\/)/i.test(src) || /^[A-Za-z]:[\\/]/.test(src)) {
    return null
  }

  let cleanSrc = src
  try {
    cleanSrc = decodeURIComponent(src)
  } catch {
    cleanSrc = src
  }

  cleanSrc = cleanSrc.replace(/\\/g, '/').split(/[?#]/, 1)[0]
  return path.resolve(path.dirname(markdownId), cleanSrc)
}

function addImageDimensionsToTag(tag: string, markdownId: string) {
  if (hasAttribute(tag, 'width') && hasAttribute(tag, 'height')) {
    return tag
  }

  const src = getHtmlAttribute(tag, 'src') || getHtmlAttribute(tag, 'data-lazy-src')
  const imagePath = resolveLocalImagePath(markdownId, src)
  if (!imagePath) {
    return tag
  }

  const dimensions = readImageDimensions(imagePath)
  if (!dimensions) {
    return tag
  }

  const currentWidth = getNumericHtmlAttribute(tag, 'width')
  const currentHeight = getNumericHtmlAttribute(tag, 'height')
  let width = dimensions.width
  let height = dimensions.height

  if (currentWidth && !currentHeight) {
    width = currentWidth
    height = Math.max(1, Math.round((currentWidth * dimensions.height) / dimensions.width))
  } else if (!currentWidth && currentHeight) {
    height = currentHeight
    width = Math.max(1, Math.round((currentHeight * dimensions.width) / dimensions.height))
  }

  let preparedTag = tag
  if (!hasAttribute(preparedTag, 'width')) {
    preparedTag = preparedTag.replace('<img', `<img width="${width}"`)
  }
  if (!hasAttribute(preparedTag, 'height')) {
    preparedTag = preparedTag.replace('<img', `<img height="${height}"`)
  }

  return preparedTag
}

function reserveLocalImageDimensions() {
  const imageTagPattern = /<img\b[^>]*>/g

  return {
    name: 'reserve-local-image-dimensions',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (!id.endsWith('.md') || !imageTagPattern.test(code)) {
        return null
      }

      imageTagPattern.lastIndex = 0
      const transformed = code.replace(imageTagPattern, (tag) => addImageDimensionsToTag(tag, id))
      return transformed === code ? null : transformed
    }
  }
}

function hasAttribute(tag: string, attributeName: string) {
  return new RegExp(`\\s${attributeName}(?:\\s*=|\\s|>)`, 'i').test(tag)
}

function addClassNames(tag: string, classNames: string[]) {
  const classPattern = /\sclass=(["'])(.*?)\1/i
  const classMatch = tag.match(classPattern)

  if (!classMatch) {
    return tag.replace('<img', `<img class="${classNames.join(' ')}"`)
  }

  const existingClassNames = classMatch[2].split(/\s+/).filter(Boolean)
  const mergedClassNames = Array.from(new Set([...existingClassNames, ...classNames]))
  return tag.replace(classPattern, ` class=${classMatch[1]}${mergedClassNames.join(' ')}${classMatch[1]}`)
}

function moveImageAttribute(tag: string, fromAttribute: string, toAttribute: string) {
  const attributePattern = new RegExp(`\\s${fromAttribute}=(["'])(.*?)\\1`, 'i')
  const attributeMatch = tag.match(attributePattern)

  if (!attributeMatch) {
    return tag
  }

  return tag.replace(attributePattern, ` ${toAttribute}=${attributeMatch[1]}${attributeMatch[2]}${attributeMatch[1]}`)
}

function prepareHardLazyImageTag(tag: string) {
  if (
    !/\sloading=(["'])lazy\1/i.test(tag) ||
    hasAttribute(tag, 'data-lazy-src') ||
    /\sclass=(["'])[^"']*\binline-icon\b[^"']*\1/i.test(tag) ||
    /\ssrc=(["'])data:image/i.test(tag)
  ) {
    return tag
  }

  const srcPattern = /\ssrc=(["'])(.*?)\1/i
  const srcMatch = tag.match(srcPattern)
  if (!srcMatch || !srcMatch[2]) {
    return tag
  }

  let preparedTag = tag
  preparedTag = moveImageAttribute(preparedTag, 'srcset', 'data-lazy-srcset')
  preparedTag = moveImageAttribute(preparedTag, 'sizes', 'data-lazy-sizes')
  preparedTag = preparedTag.replace(
    srcPattern,
    ` src="${lazyImagePlaceholder}" data-lazy-src=${srcMatch[1]}${srcMatch[2]}${srcMatch[1]}`
  )

  if (!hasAttribute(preparedTag, 'decoding')) {
    preparedTag = preparedTag.replace('<img', '<img decoding="async"')
  }
  if (!hasAttribute(preparedTag, 'fetchpriority')) {
    preparedTag = preparedTag.replace('<img', '<img fetchpriority="low"')
  }
  if (!hasAttribute(preparedTag, 'data-lazy-image')) {
    preparedTag = preparedTag.replace('<img', '<img data-lazy-image="true"')
  }

  return addClassNames(preparedTag, ['vp-lazy-image', 'is-pending'])
}

function prepareHardLazyImages(code: string) {
  return code.replace(/<img\b[^>]*>/g, prepareHardLazyImageTag)
}

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function slugDocModuleLabel(label: string, fallback: string) {
  return (
    label
      .normalize('NFKD')
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || fallback
  )
}

function parseDocModuleMarker(line: string) {
  const markerMatch = line.trim().match(/^(:{3,4})(?!:)(.*)$/u)

  if (!markerMatch) {
    return null
  }

  const colonCount = markerMatch[1].length
  const info = (markerMatch[2] || '').trim()

  return {
    level: colonCount - 2,
    info,
    isOpen: info.length > 0
  }
}

function parseDocModuleMeta(rawInfo: string, level: number) {
  const label = rawInfo.trim() || `Untitled level ${level} block`
  return {
    id: slugDocModuleLabel(label, `level-${level}`),
    label
  }
}

function docModuleBlockPlugin(md: any) {
  function docModuleBlock(state: any, startLine: number, endLine: number, silent: boolean) {
    const start = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    const firstLine = state.src.slice(start, max)
    const openingMarker = parseDocModuleMarker(firstLine)

    if (!openingMarker?.isOpen) {
      return false
    }

    if (silent) {
      return true
    }

    let nextLine = startLine
    let autoClosed = false
    let depth = 1

    while (nextLine + 1 < endLine) {
      nextLine += 1
      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
      const lineMax = state.eMarks[nextLine]
      const marker = parseDocModuleMarker(state.src.slice(lineStart, lineMax))

      if (!marker || marker.level !== openingMarker.level) {
        continue
      }

      if (marker.isOpen) {
        depth += 1
        continue
      }

      depth -= 1
      if (depth === 0) {
        autoClosed = true
        break
      }
    }

    let contentStartLine = startLine + 1
    const oldParent = state.parentType
    const oldLineMax = state.lineMax
    const meta = parseDocModuleMeta(openingMarker.info, openingMarker.level)
    const openTokenName = openingMarker.level === 1 ? 'doc_level_one_block_open' : 'doc_level_two_block_open'
    const closeTokenName = openingMarker.level === 1 ? 'doc_level_one_block_close' : 'doc_level_two_block_close'

    state.parentType = 'container'
    state.lineMax = nextLine

    const openToken = state.push(openTokenName, 'section', 1)
    openToken.block = true
    openToken.map = [startLine, nextLine]
    openToken.meta = meta

    state.md.block.tokenize(state, contentStartLine, nextLine)

    const closeToken = state.push(closeTokenName, 'section', -1)
    closeToken.block = true

    state.parentType = oldParent
    state.lineMax = oldLineMax
    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before('fence', 'doc_module_block', docModuleBlock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })

  md.renderer.rules.doc_level_one_block_open = (tokens: any[], idx: number) => {
    const meta = tokens[idx].meta || { id: '', label: '' }
    return `<section class="doc-level-one-block" data-doc-level-one-id="${escapeHtmlAttribute(meta.id)}" data-doc-level-one-label="${escapeHtmlAttribute(meta.label)}">\n`
  }

  md.renderer.rules.doc_level_two_block_open = (tokens: any[], idx: number) => {
    const meta = tokens[idx].meta || { id: '', label: '' }
    return `<section class="doc-level-two-block" data-doc-level-two-id="${escapeHtmlAttribute(meta.id)}" data-doc-level-two-label="${escapeHtmlAttribute(meta.label)}">\n`
  }

  md.renderer.rules.doc_level_one_block_close = () => '</section>\n'
  md.renderer.rules.doc_level_two_block_close = () => '</section>\n'
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: docsBase,
  title: 'JetHexa Documentation',
  description: 'JetHexa documentation',
  head: [['link', { rel: 'icon', href: `${docsBase}favicon.ico` }]],
  ignoreDeadLinks: true,
  transformHtml(code) {
    return prepareHardLazyImages(code)
  },
  vite: {
    assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.WEBP', '**/*.BMP', '**/*.ICO', '**/*.SVG', '**/*.MP4', '**/*.MOV', '**/*.AVI', '**/*.WAV', '**/*.MP3', '**/*.emf', '**/*.EMF', '**/*.wmf', '**/*.WMF', '**/*.GIF', '**/*.db'],
    plugins: [
      normalizeNoteContainers(),
      normalizeStrongWhitespace(),
      normalizeProblematicStrongEmphasis(),
      preserveBrokenAbsoluteImages(),
      reserveLocalImageDimensions(),
      lazyLoadHtmlImages()
    ]
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    math: true,
    config: (md) => {
      md.use(docModuleBlockPlugin)
      md.use(mathjax3)
    }
  },
  themeConfig: {
    siteTitle: false,
    logo: '/e-logo.png',
    outline: [2, 3],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            searchBox: {
              resetButtonTitle: 'Clear search query',
              resetButtonAriaLabel: 'Clear search query',
              cancelButtonText: 'Cancel',
              cancelButtonAriaLabel: 'Cancel'
            },
            startScreen: {
              recentSearchTitle: 'Recent Searches',
              noRecentSearchText: 'No recent searches',
              suggestedQueryTitle: 'Suggested Queries'
            },
            noResultsScreen: {
              noResultsText: 'No results found for',
              suggestedQueryText: 'You can try searching for',
              reportMissingResultsText: 'Have any queries?',
              reportMissingResultsLinkText: 'Report here'
            },
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    },
    nav: [
      { text: 'Home', link: 'https://www.hiwonder.net/', target: '_self' },
    ],
    sidebar: getSidebar()
  }
})
