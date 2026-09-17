import { access, cp, mkdir, readFile, rm, writeFile } from 'fs/promises'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')
const validVersions = ['latest', 'JetsonOrinNX', 'RaspberryPi', 'JetsonNanoRos1']
const version = process.argv[2] || 'JetsonNanoRos1'

if (!validVersions.includes(version)) {
  console.error(`Invalid version: ${version}`)
  console.error(`Valid versions: ${validVersions.join(', ')}`)
  process.exit(1)
}

const docsBase = `/projects/JetHexa/en/${version}/`
const contentDir = join(repositoryRoot, 'content', version)
const contentDocsDir = join(contentDir, 'docs')
const contentStaticDir = join(contentDir, '_static')
const docsDocsDir = join(repositoryRoot, 'docs', 'docs')
const docsStaticDir = join(repositoryRoot, 'docs', '_static')
const rootIndexPath = join(repositoryRoot, 'docs', 'index.md')
const vitepressCliPath = join(repositoryRoot, 'node_modules', 'vitepress', 'bin', 'vitepress.js')
const originalRootIndex = await readFile(rootIndexPath, 'utf8')
const rootRedirectIndex = `---
layout: page-redirect
redirectTo: /docs/index.html
---

Redirecting to content page...
`

let restored = false
async function restoreRootIndex() {
  if (restored) return
  restored = true
  await writeFile(rootIndexPath, originalRootIndex).catch(() => {})
}

try {
  await writeFile(rootIndexPath, rootRedirectIndex)
  await copyVersionContent()
} catch (error) {
  await restoreRootIndex()
  throw error
}

console.log(`\n========== Previewing ${version} ==========`)
console.log(`DOCS_BASE: ${docsBase}`)

const devServer = spawn(process.execPath, [vitepressCliPath, 'dev', 'docs'], {
  stdio: 'inherit',
  cwd: repositoryRoot,
  env: { ...process.env, DOCS_BASE: docsBase, DOCS_VERSION: version }
})

process.on('SIGINT', async () => {
  await restoreRootIndex()
  process.exit(130)
})

process.on('SIGTERM', async () => {
  await restoreRootIndex()
  process.exit(143)
})

devServer.on('exit', async (code) => {
  await restoreRootIndex()
  process.exit(code ?? 0)
})

devServer.on('error', async (error) => {
  await restoreRootIndex()
  console.error(error)
  process.exit(1)
})

async function copyVersionContent() {
  await rm(docsDocsDir, { recursive: true, force: true })
  await rm(docsStaticDir, { recursive: true, force: true })
  await mkdir(docsDocsDir, { recursive: true })
  await mkdir(docsStaticDir, { recursive: true })

  if (!await pathExists(contentDocsDir)) {
    throw new Error(`Missing documentation directory: ${contentDocsDir}`)
  }

  await cp(contentDocsDir, docsDocsDir, { recursive: true })
  if (await pathExists(contentStaticDir)) {
    await cp(contentStaticDir, docsStaticDir, { recursive: true })
  }
}

async function pathExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}
