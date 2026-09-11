import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')
const validVersions = ['latest', 'JetsonOrinNano']
const version = process.argv[2] || 'latest'

if (!validVersions.includes(version)) {
  console.error(`Invalid version: ${version}`)
  console.error(`Valid versions: ${validVersions.join(', ')}`)
  process.exit(1)
}

const docsBase = `/projects/JetHexa/en/${version}/`
const vitepressCliPath = join(repositoryRoot, 'node_modules', 'vitepress', 'bin', 'vitepress.js')
const extraArgs = process.argv.slice(3)
const previewServer = spawn(process.execPath, [vitepressCliPath, 'preview', 'docs', ...extraArgs], {
  stdio: 'inherit',
  cwd: repositoryRoot,
  env: { ...process.env, DOCS_BASE: docsBase, DOCS_VERSION: version }
})

previewServer.on('exit', (code) => {
  process.exit(code ?? 0)
})

previewServer.on('error', (error) => {
  console.error(error)
  process.exit(1)
})
