import { access, cp, mkdir, readFile, rm, writeFile } from 'fs/promises'
import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')
const validVersions = ['latest', 'JetsonOrinNano']
const version = process.argv[2]

if (!version || !validVersions.includes(version)) {
  console.error('Usage: node scripts/build_version.mjs <version>')
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

console.log(`\n========== Building ${version} ==========`)
console.log(`DOCS_BASE: ${docsBase}`)

try {
  await writeFile(rootIndexPath, rootRedirectIndex)

  console.log('\n[1/3] Copying content files...')
  await copyVersionContent()
  console.log('  Done.')

  console.log('\n[2/3] Building with VitePress...')
  execFileSync(process.execPath, [vitepressCliPath, 'build', 'docs'], {
    stdio: 'inherit',
    cwd: repositoryRoot,
    env: { ...process.env, DOCS_BASE: docsBase, DOCS_VERSION: version }
  })
  console.log('  Done.')

  console.log('\n[3/3] Staging production files...')
  execFileSync(process.execPath, ['scripts/stage_main_site.mjs'], {
    stdio: 'inherit',
    cwd: repositoryRoot,
    env: { ...process.env, DOCS_VERSION: version }
  })

  console.log(`\n========== ${version} build complete ==========\n`)
} finally {
  await writeFile(rootIndexPath, originalRootIndex)
}

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
