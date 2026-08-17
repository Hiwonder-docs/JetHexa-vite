import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const supportedSourceExts = new Set(['.png', '.jpg', '.jpeg'])
const reportImageExts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp'])
const referenceExts = new Set(['.html', '.js', '.css', '.json'])
const progressLogIntervalMs = 1500
const largeImageWarningBytes = 1024 * 1024

function formatBytes(byteCount) {
  if (byteCount >= 1024 * 1024) {
    return `${(byteCount / 1024 / 1024).toFixed(2)}MB`
  }
  if (byteCount >= 1024) {
    return `${(byteCount / 1024).toFixed(1)}KB`
  }
  return `${byteCount}B`
}

function parseArgs(argv) {
  const args = {
    dist: '',
    minKb: 128,
    quality: 84,
    alphaQuality: 84,
    maxEdge: 2048,
    effort: 5,
    workers: 4,
    keepOriginals: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    const readValue = () => {
      const value = argv[index + 1]
      if (!value || value.startsWith('--')) {
        throw new Error(`${arg} 闇€瑕佷竴涓€糮)
      }
      index += 1
      return value
    }

    if (arg === '--dist') {
      args.dist = readValue()
    } else if (arg === '--min-kb') {
      args.minKb = Number(readValue())
    } else if (arg === '--quality') {
      args.quality = Number(readValue())
    } else if (arg === '--alpha-quality') {
      args.alphaQuality = Number(readValue())
    } else if (arg === '--max-edge') {
      args.maxEdge = Number(readValue())
    } else if (arg === '--effort') {
      args.effort = Number(readValue())
    } else if (arg === '--workers') {
      args.workers = Number(readValue())
    } else if (arg === '--keep-originals') {
      args.keepOriginals = true
    } else {
      throw new Error(`涓嶆敮鎸佺殑鍙傛暟锛?{arg}`)
    }
  }

  if (!args.dist) {
    throw new Error('蹇呴』浼犲叆 --dist')
  }
  if (!Number.isFinite(args.minKb) || args.minKb < 0) {
    throw new Error('--min-kb 蹇呴』鏄ぇ浜庣瓑浜?0 鐨勬暟瀛?)
  }
  if (!Number.isFinite(args.quality) || args.quality < 1 || args.quality > 100) {
    throw new Error('--quality 蹇呴』鏄?1 鍒?100 涔嬮棿鐨勬暟瀛?)
  }
  if (!Number.isFinite(args.alphaQuality) || args.alphaQuality < 0 || args.alphaQuality > 100) {
    throw new Error('--alpha-quality 蹇呴』鏄?0 鍒?100 涔嬮棿鐨勬暟瀛?)
  }
  if (!Number.isFinite(args.maxEdge) || args.maxEdge < 0) {
    throw new Error('--max-edge 蹇呴』鏄ぇ浜庣瓑浜?0 鐨勬暟瀛?)
  }
  if (!Number.isFinite(args.effort) || args.effort < 0 || args.effort > 6) {
    throw new Error('--effort 蹇呴』鏄?0 鍒?6 涔嬮棿鐨勬暟瀛?)
  }
  if (!Number.isFinite(args.workers) || args.workers < 1) {
    throw new Error('--workers 蹇呴』鏄ぇ浜庣瓑浜?1 鐨勬暟瀛?)
  }

  args.minBytes = Math.round(args.minKb * 1024)
  args.maxEdge = Math.max(0, Math.floor(args.maxEdge))
  args.workers = Math.max(1, Math.floor(args.workers))
  return args
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function walkFiles(rootDir) {
  const files = []
  const entries = await fs.readdir(rootDir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walkFiles(fullPath))
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/')
}

async function reportLargeFinalImages(assetsDir) {
  const imageFiles = (await walkFiles(assetsDir)).filter((filePath) => {
    return reportImageExts.has(path.extname(filePath).toLowerCase())
  })
  const imageStats = await Promise.all(imageFiles.map(async (filePath) => {
    const stat = await fs.stat(filePath)
    return { filePath, bytes: stat.size }
  }))
  const largeImages = imageStats
    .filter((item) => item.bytes > largeImageWarningBytes)
    .sort((left, right) => right.bytes - left.bytes)
  const overTwoMb = largeImages.filter((item) => item.bytes > 2 * 1024 * 1024).length
  const overFiveMb = largeImages.filter((item) => item.bytes > 5 * 1024 * 1024).length

  console.log(
    'WebP 浜х墿澶у浘妫€鏌? ' +
      `${imageStats.length} 寮犳渶缁堝浘鐗囷紝瓒呰繃 1MB ${largeImages.length} 寮狅紝` +
      `瓒呰繃 2MB ${overTwoMb} 寮狅紝瓒呰繃 5MB ${overFiveMb} 寮犮€俙
  )
  for (const item of largeImages.slice(0, 10)) {
    console.log(`- ${toPosixPath(path.relative(assetsDir, item.filePath))}: ${formatBytes(item.bytes)}`)
  }
  if (largeImages.length > 10) {
    console.log(`- 鍏朵綑 ${largeImages.length - 10} 寮犺秴杩?1MB 鐨勫浘鐗囨湭灞曞紑銆俙)
  }
}

function getAssetUrlVariants(assetName) {
  const encodedAssetName = encodeURI(assetName)
  return Array.from(new Set([
    `/assets/${assetName}`,
    `/assets/${encodedAssetName}`,
    `assets/${assetName}`,
    `assets/${encodedAssetName}`,
    assetName,
    encodedAssetName,
  ]))
}

function replaceAllLiteral(text, search, replacement) {
  return text.split(search).join(replacement)
}

async function convertOneImage(imagePath, options) {
  const sourceStat = await fs.stat(imagePath)
  if (sourceStat.size < options.minBytes) {
    return { status: 'skipped-small', source: imagePath, sourceBytes: sourceStat.size }
  }

  const sourceExt = path.extname(imagePath).toLowerCase()
  if (!supportedSourceExts.has(sourceExt)) {
    return { status: 'skipped-format', source: imagePath, sourceBytes: sourceStat.size }
  }

  const webpPath = imagePath.slice(0, -sourceExt.length) + '.webp'
  if (await fileExists(webpPath)) {
    return { status: 'skipped-existing', source: imagePath, sourceBytes: sourceStat.size, webp: webpPath }
  }

  try {
    const metadata = await sharp(imagePath, { animated: false }).metadata()
    const shouldResize = options.maxEdge > 0 && Math.max(metadata.width || 0, metadata.height || 0) > options.maxEdge
    let transformer = sharp(imagePath, { animated: false }).rotate()
    if (shouldResize) {
      transformer = transformer.resize({
        width: options.maxEdge,
        height: options.maxEdge,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    const webpOptions = {
      quality: options.quality,
      alphaQuality: options.alphaQuality,
      effort: options.effort,
      smartSubsample: true,
    }
    const converted = await transformer.webp(webpOptions).toBuffer({ resolveWithObject: true })
    const output = converted.data
    if (output.length >= sourceStat.size) {
      return {
        status: 'skipped-larger',
        source: imagePath,
        sourceBytes: sourceStat.size,
        webpBytes: output.length,
      }
    }

    await fs.writeFile(webpPath, output)
    return {
      status: 'converted',
      source: imagePath,
      webp: webpPath,
      sourceBytes: sourceStat.size,
      webpBytes: output.length,
      savedBytes: sourceStat.size - output.length,
      resized: shouldResize,
      sourceWidth: metadata.width || 0,
      sourceHeight: metadata.height || 0,
      webpWidth: converted.info.width,
      webpHeight: converted.info.height,
    }
  } catch (error) {
    return {
      status: 'error',
      source: imagePath,
      sourceBytes: sourceStat.size,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

async function runLimited(items, limit, worker) {
  const results = new Array(items.length)
  let cursor = 0

  async function runWorker() {
    while (cursor < items.length) {
      const current = cursor
      cursor += 1
      results[current] = await worker(items[current], current)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runWorker())
  )
  return results
}

function createConversionProgress(total) {
  const startedAt = Date.now()
  const progressStep = Math.max(5, Math.min(50, Math.floor(total / 20) || 5))
  let lastLoggedAt = startedAt
  let lastLoggedProcessed = 0
  const stats = {
    processed: 0,
    converted: 0,
    skipped: 0,
    errors: 0,
    savedBytes: 0,
  }

  function writeProgress() {
    const elapsedSeconds = Math.max(0.001, (Date.now() - startedAt) / 1000)
    const rate = stats.processed / elapsedSeconds
    console.log(
      'WebP 杞爜杩涘害: ' +
        `${stats.processed}/${total}锛岀敓鎴?${stats.converted} 寮狅紝璺宠繃 ${stats.skipped} 寮狅紝` +
        `澶辫触 ${stats.errors} 寮狅紝鑺傜渷 ${formatBytes(stats.savedBytes)}锛岄€熷害 ${rate.toFixed(1)} 寮?绉掋€俙
    )
    lastLoggedAt = Date.now()
    lastLoggedProcessed = stats.processed
  }

  return {
    record(result) {
      stats.processed += 1
      if (result.status === 'converted') {
        stats.converted += 1
        stats.savedBytes += result.savedBytes || 0
      } else if (result.status === 'error') {
        stats.errors += 1
      } else {
        stats.skipped += 1
      }

      const now = Date.now()
      if (
        stats.processed === total ||
        stats.processed % progressStep === 0 ||
        now - lastLoggedAt >= progressLogIntervalMs
      ) {
        writeProgress()
      }
    },
    finish() {
      if (stats.processed > 0 && stats.processed !== lastLoggedProcessed) {
        writeProgress()
      }
    },
  }
}

async function replaceReferences(distDir, conversions) {
  const files = (await walkFiles(distDir)).filter((filePath) => {
    return referenceExts.has(path.extname(filePath).toLowerCase())
  })
  const replacementPairs = conversions.map((item) => {
    const sourceName = path.basename(item.source)
    const webpName = path.basename(item.webp)
    return {
      source: item.source,
      webp: item.webp,
      sourceName,
      webpName,
      variants: getAssetUrlVariants(sourceName).map((sourceUrl) => {
        return {
          sourceUrl,
          webpUrl: sourceUrl.replace(sourceName, webpName).replace(encodeURI(sourceName), encodeURI(webpName)),
        }
      }),
      replacements: 0,
    }
  })

  let changedFiles = 0
  let processedFiles = 0
  const startedAt = Date.now()
  let lastLoggedAt = startedAt
  const progressStep = Math.max(10, Math.min(100, Math.floor(files.length / 10) || 10))

  if (replacementPairs.length) {
    console.log(`WebP 寮曠敤鏀瑰啓寮€濮? ${files.length} 涓骇鐗╂枃浠讹紝${replacementPairs.length} 寮?WebP銆俙)
  }

  for (const filePath of files) {
    let content = await fs.readFile(filePath, 'utf8')
    let updated = content

    for (const pair of replacementPairs) {
      for (const variant of pair.variants) {
        if (!updated.includes(variant.sourceUrl)) {
          continue
        }
        const before = updated
        updated = replaceAllLiteral(updated, variant.sourceUrl, variant.webpUrl)
        pair.replacements += before.split(variant.sourceUrl).length - 1
      }
    }

    if (updated !== content) {
      await fs.writeFile(filePath, updated, 'utf8')
      changedFiles += 1
    }

    processedFiles += 1
    const now = Date.now()
    if (
      replacementPairs.length &&
      (processedFiles === files.length ||
        processedFiles % progressStep === 0 ||
        now - lastLoggedAt >= progressLogIntervalMs)
    ) {
      const elapsedSeconds = Math.max(0.001, (now - startedAt) / 1000)
      console.log(
        'WebP 寮曠敤鏀瑰啓杩涘害: ' +
          `${processedFiles}/${files.length}锛屽凡鏀瑰啓 ${changedFiles} 涓枃浠讹紝` +
          `閫熷害 ${(processedFiles / elapsedSeconds).toFixed(1)} 鏂囦欢/绉掋€俙
      )
      lastLoggedAt = now
    }
  }

  return { changedFiles, replacementPairs }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const distDir = path.resolve(options.dist)
  const assetsDir = path.join(distDir, 'assets')

  if (!await fileExists(distDir)) {
    throw new Error(`dist 鐩綍涓嶅瓨鍦細${distDir}`)
  }
  if (!await fileExists(assetsDir)) {
    console.log('WebP 杞爜宸茶烦杩囷細dist/assets 涓嶅瓨鍦?)
    return
  }

  const allFiles = await walkFiles(assetsDir)
  const sourceImages = allFiles.filter((filePath) => supportedSourceExts.has(path.extname(filePath).toLowerCase()))
  console.log(
    'WebP 杞爜鎵弿: ' +
      `${sourceImages.length} 寮犲€欓€夊浘锛岄槇鍊?${options.minKb}KB锛岃川閲?${options.quality}锛宍 +
      `閫忔槑璐ㄩ噺 ${options.alphaQuality}锛屾渶闀胯竟 ${options.maxEdge || '涓嶉檺鍒?}锛屽苟鍙?${options.workers}銆俙
  )
  const conversionProgress = createConversionProgress(sourceImages.length)
  const results = await runLimited(sourceImages, options.workers, async (filePath) => {
    const result = await convertOneImage(filePath, options)
    conversionProgress.record(result)
    return result
  })
  conversionProgress.finish()
  const conversions = results.filter((item) => item.status === 'converted')
  const referenceResult = await replaceReferences(distDir, conversions)
  let removedOriginals = 0
  let unusedConversions = 0
  let cleanedPairs = 0
  const cleanupStartedAt = Date.now()
  let lastCleanupLoggedAt = cleanupStartedAt
  const cleanupStep = Math.max(10, Math.min(100, Math.floor(referenceResult.replacementPairs.length / 10) || 10))

  for (const pair of referenceResult.replacementPairs) {
    if (pair.replacements === 0) {
      unusedConversions += 1
      await fs.rm(pair.webp, { force: true })
      continue
    }
    if (!options.keepOriginals) {
      await fs.rm(pair.source, { force: true })
      removedOriginals += 1
    }

    cleanedPairs += 1
    const now = Date.now()
    if (
      referenceResult.replacementPairs.length &&
      (cleanedPairs === referenceResult.replacementPairs.length ||
        cleanedPairs % cleanupStep === 0 ||
        now - lastCleanupLoggedAt >= progressLogIntervalMs)
    ) {
      const elapsedSeconds = Math.max(0.001, (now - cleanupStartedAt) / 1000)
      console.log(
        'WebP 鍘熷浘娓呯悊杩涘害: ' +
          `${cleanedPairs}/${referenceResult.replacementPairs.length}锛屽垹闄ゅ師鍥?${removedOriginals} 寮狅紝` +
          `閫熷害 ${(cleanedPairs / elapsedSeconds).toFixed(1)} 寮?绉掋€俙
      )
      lastCleanupLoggedAt = now
    }
  }

  await reportLargeFinalImages(assetsDir)

  const stats = {
    scanned: sourceImages.length,
    converted: conversions.length,
    resized: conversions.filter((item) => item.resized).length,
    referenced: referenceResult.replacementPairs.filter((item) => item.replacements > 0).length,
    changedFiles: referenceResult.changedFiles,
    removedOriginals,
    unusedConversions,
    savedBytes: conversions.reduce((sum, item) => sum + (item.savedBytes || 0), 0),
    skippedSmall: results.filter((item) => item.status === 'skipped-small').length,
    skippedLarger: results.filter((item) => item.status === 'skipped-larger').length,
    skippedExisting: results.filter((item) => item.status === 'skipped-existing').length,
    errors: results.filter((item) => item.status === 'error').length,
  }

  console.log(
    'WebP 杞爜宸插鐞? ' +
      `${stats.scanned} 寮犲€欓€夊浘锛岀敓鎴?${stats.converted} 寮狅紝鍏朵腑缂╂斁 ${stats.resized} 寮狅紝寮曠敤 ${stats.referenced} 寮狅紝` +
      `鏀瑰啓 ${stats.changedFiles} 涓骇鐗╂枃浠讹紝鍒犻櫎鍘熷浘 ${stats.removedOriginals} 寮狅紝` +
      `鑺傜渷 ${(stats.savedBytes / 1024 / 1024).toFixed(2)}MB銆俙
  )

  if (stats.unusedConversions) {
    console.log(`WebP 杞爜娓呯悊: ${stats.unusedConversions} 寮?WebP 鏈湪浜х墿涓壘鍒板紩鐢紝宸插垹闄ゃ€俙)
  }
  if (stats.skippedSmall || stats.skippedLarger || stats.skippedExisting) {
    console.log(
      'WebP 杞爜璺宠繃: ' +
        `灏忓浘 ${stats.skippedSmall} 寮狅紝杞悗鏇村ぇ ${stats.skippedLarger} 寮狅紝宸插瓨鍦?WebP ${stats.skippedExisting} 寮犮€俙
    )
  }
  if (stats.errors) {
    const samples = results.filter((item) => item.status === 'error').slice(0, 5)
    console.log(`WebP 杞爜澶辫触: ${stats.errors} 寮狅紝绀轰緥锛歚)
    for (const item of samples) {
      console.log(`- ${toPosixPath(path.relative(distDir, item.source))}: ${item.error}`)
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
