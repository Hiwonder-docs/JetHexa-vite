import fs from 'fs'
import path from 'path'

const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>?,.!?;:，。！？、；：（）《》【】“”‘’\/]+/g
const rCombining = /[\u0300-\u036F]/g

// Generate anchors with the same slug logic used by VitePress sidebar links.
function generateAnchor(text: string) {
  return text
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()
}

function cleanSidebarText(text: string) {
  return text
    .replace(/\*\*([^*\n]+?)\*\*/g, '$1')
    .replace(/__([^_\n]+?)__/g, '$1')
    .replace(/<\/?strong>/gi, '')
    .replace(/<\/?b>/gi, '')
    .trim()
}

function isLockedPreviewPage(content: string) {
  return /<!--\s*preview-locked\s*-->/i.test(content)
}

function buildPageLink(name: string, anchor?: string) {
  const pagePath = `/docs/${name}.html`
  const fullPath = anchor ? `${pagePath}#${anchor}` : pagePath
  return encodeURI(fullPath)
}

function getMarkdownStem(filename: string) {
  return filename.replace(/\.md$/i, '')
}

function isAppendixStem(stem: string) {
  const normalized = stem.trim().toLowerCase()
  return normalized === 'appendix' || normalized.startsWith('appendix.')
}

function buildSidebarSortKey(filename: string): [number, number[], string] {
  const stem = getMarkdownStem(filename)
  if (isAppendixStem(stem)) {
    return [2, [], stem.toLowerCase()]
  }

  const match = stem.match(/^(\d+(?:\.\d+)*)/)
  if (match) {
    return [0, match[1].split('.').map(part => parseInt(part, 10)), stem.toLowerCase()]
  }

  return [1, [], stem.toLowerCase()]
}

export function getSidebar() {
  const pageDir = path.resolve(__dirname, '../docs')
  if (!fs.existsSync(pageDir)) return []

  const files = fs.readdirSync(pageDir).filter(f => {
    return f.endsWith('.md') && f.toLowerCase() !== 'index.md'
  })

  // Keep the sidebar order consistent with the staging script.
  files.sort((a, b) => {
    const [groupA, partsA, stemA] = buildSidebarSortKey(a)
    const [groupB, partsB, stemB] = buildSidebarSortKey(b)

    if (groupA !== groupB) {
      return groupA - groupB
    }

    if (groupA === 0) {
      const maxLength = Math.max(partsA.length, partsB.length)
      for (let i = 0; i < maxLength; i++) {
        const valueA = partsA[i] ?? -1
        const valueB = partsB[i] ?? -1
        if (valueA !== valueB) {
          return valueA - valueB
        }
      }
    }

    return stemA.localeCompare(stemB, 'en')
  })

  const sidebar: any[] = []

  // Build one sidebar entry for each Markdown page.
  for (const file of files) {
    const name = file.replace(/\.md$/, '')
    const content = fs.readFileSync(path.join(pageDir, file), 'utf-8')
    const lockedPreviewPage = isLockedPreviewPage(content)

    // Parse headings line by line and ignore fenced code blocks.
    const lines = content.split('\n')
    const items: any[] = []
    let pageTitle = ''
    let inCodeBlock = false

    for (const line of lines) {
      const trimmedLine = line.trim()

      if (trimmedLine.startsWith('```')) {
        inCodeBlock = !inCodeBlock
        continue
      }

      if (!inCodeBlock) {
        const h1Match = trimmedLine.match(/^#\s+(.+)$/)
        if (h1Match && !pageTitle) {
          pageTitle = cleanSidebarText(h1Match[1].trim())
          continue
        }

        const match = trimmedLine.match(/^##\s+(.+)$/)
        if (match) {
          const rawTitle = match[1].trim()
          const title = cleanSidebarText(rawTitle)
          const anchor = generateAnchor(rawTitle)
          items.push({
            text: title,
            link: buildPageLink(name, anchor),
            class: lockedPreviewPage ? 'is-preview-locked' : undefined,
          })
        }
      }
    }

    sidebar.push({
      text: pageTitle || name,
      link: buildPageLink(name),
      collapsed: false,
      class: lockedPreviewPage ? 'is-preview-locked' : undefined,
      items: items,
    })
  }

  return sidebar
}
