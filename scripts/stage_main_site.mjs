import { mkdir, rm, cp } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')

await rm(join(repositoryRoot, 'projects'), { recursive: true, force: true })

const targetDir = join(repositoryRoot, 'projects/JetHexa/en/latest')
await mkdir(targetDir, { recursive: true })

await cp(
  join(repositoryRoot, 'docs/.vitepress/dist'),
  targetDir,
  { recursive: true }
)

console.log('Staged files to:', targetDir)
