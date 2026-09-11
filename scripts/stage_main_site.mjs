import { mkdir, rm, cp, readdir, readFile, writeFile, unlink } from 'fs/promises'
import { fileURLToPath } from 'url'
import { access } from 'fs/promises'
import { dirname, join, extname, basename } from 'path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')
const validVersions = ['24JetsonNano', 'JetsonOrinNX', 'JetsonNano', 'RaspberryPi', 'JetsonOrinNano']
const version = process.env.DOCS_VERSION || process.argv[2] || '24JetsonNano'

if (!validVersions.includes(version)) {
  console.error(`Invalid version: ${version}`)
  console.error(`Valid versions: ${validVersions.join(', ')}`)
  process.exit(1)
}

const targetDir = join(repositoryRoot, 'projects', 'JetHexa', 'en', version)
await rm(targetDir, { recursive: true, force: true })
await mkdir(targetDir, { recursive: true })

await cp(
  join(repositoryRoot, 'docs/.vitepress/dist'),
  targetDir,
  { recursive: true }
)

const sourceCodeDir = join(repositoryRoot, 'content', version, '_static', 'source_code')
if (await pathExists(sourceCodeDir)) {
  await cp(
    sourceCodeDir,
    join(targetDir, '_static/source_code'),
    { recursive: true, force: true }
  )
}

await convertRasterImagesToWebp(targetDir)

console.log('Staged files to:', targetDir)

async function walkFiles(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = join(rootDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walkFiles(entryPath))
    } else if (entry.isFile()) {
      files.push(entryPath)
    }
  }

  return files
}

async function pathExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

function isConvertibleRasterImage(filePath) {
  const extension = extname(filePath).toLowerCase()
  return extension === '.png' || extension === '.jpg' || extension === '.jpeg'
}

function isTextAsset(filePath) {
  const extension = extname(filePath).toLowerCase()
  return (
    extension === '.html' ||
    extension === '.js' ||
    extension === '.css' ||
    extension === '.json' ||
    extension === '.mjs' ||
    extension === '.txt' ||
    extension === '.xml' ||
    extension === '.svg' ||
    extension === '.md' ||
    extension === '.map'
  )
}

async function convertRasterImagesToWebp(rootDir) {
  const allFiles = await walkFiles(rootDir)
  const rasterFiles = allFiles.filter(isConvertibleRasterImage)
  const replacements = new Map()

  for (const filePath of rasterFiles) {
    const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')
    await sharp(filePath)
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(webpPath)
    await unlink(filePath)
    replacements.set(basename(filePath), basename(webpPath))
  }

  const textFiles = allFiles.filter(isTextAsset)

  for (const filePath of textFiles) {
    let content = await readFile(filePath, 'utf8')
    let changed = false

    for (const [oldName, newName] of replacements) {
      if (content.includes(oldName)) {
        content = content.split(oldName).join(newName)
        changed = true
      }
    }

    if (changed) {
      await writeFile(filePath, content)
    }
  }
}
