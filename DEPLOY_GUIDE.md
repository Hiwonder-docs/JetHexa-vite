# VitePress 鏂囨。閮ㄧ讲鎸囧崡

> 閫傜敤浜庡涓」鐩殑 VitePress 鏂囨。閮ㄧ讲锛屾瘡涓」鐩嫭绔嬩粨搴擄紝閫氳繃瀹濆 Nginx 鍙嶅悜浠ｇ悊缁熶竴瀵瑰鎻愪緵鏈嶅姟銆?
---

## 鏋舵瀯璇存槑

```
鐢ㄦ埛璁块棶 wiki-test.hiwonder.com/projects/椤圭洰鍚?en/latest/docs/xxx.html
         鈹?         鈻?    瀹濆 Nginx锛堝弽鍚戜唬鐞嗭級
         鈹?         鈻?    GitHub Pages锛堟瘡涓」鐩嫭绔嬩粨搴擄級
    hiwonder-docs.github.io/浠撳簱鍚?projects/椤圭洰鍚?en/latest/...
```

### 璁块棶鍦板潃

| 鏂瑰紡 | 鍦板潃鏍煎紡 |
|------|---------|
| GitHub Pages 鐩磋繛 | `https://hiwonder-docs.github.io/浠撳簱鍚?projects/椤圭洰鍚?en/latest/docs/xxx.html` |
| 瀹濆鍙嶄唬锛堝鐢ㄦ埛锛?| `https://wiki-test.hiwonder.com/projects/椤圭洰鍚?en/latest/docs/xxx.html` |

---

## 涓€銆佹湰鍦伴」鐩粨鏋?
姣忎釜椤圭洰鐨?VitePress 椤圭洰缁撴瀯濡備笅锛?
```
椤圭洰鍚?
鈹溾攢鈹€ docs/
鈹?  鈹溾攢鈹€ .vitepress/
鈹?  鈹?  鈹斺攢鈹€ config.mts          鈫?VitePress 閰嶇疆
鈹?  鈹溾攢鈹€ 1_xxx.md                鈫?Markdown 鏂囨。
鈹?  鈹溾攢鈹€ 2_xxx.md
鈹?  鈹斺攢鈹€ public/
鈹?      鈹斺攢鈹€ favicon.ico
鈹溾攢鈹€ scripts/
鈹?  鈹斺攢鈹€ stage_main_site.mjs     鈫?鏋勫缓浜х墿鏁寸悊鑴氭湰
鈹溾攢鈹€ package.json
鈹斺攢鈹€ .gitignore
```

---

## 浜屻€侀厤缃枃浠?
### 1. VitePress 閰嶇疆 `docs/.vitepress/config.mts`

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 鈿狅笍 鍏抽敭锛歜ase 璺緞鏍煎紡涓?/projects/椤圭洰鍚?en/latest/
  base: process.env.DOCS_BASE || '/projects/椤圭洰鍚?en/latest/',
  lang: 'en-US',
  title: '椤圭洰鍚?Documentation',
  description: '椤圭洰鍚?robot documentation',
  // ... 鍏朵粬閰嶇疆
})
```

### 2. 鏋勫缓鑴氭湰 `scripts/stage_main_site.mjs`

```javascript
import { mkdir, rm, cp } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = join(__dirname, '..')

await rm(join(repositoryRoot, 'projects'), { recursive: true, force: true })

// 鈿狅笍 鎶?椤圭洰鍚?鏀规垚浣犵殑椤圭洰鍚?const targetDir = join(repositoryRoot, 'projects/椤圭洰鍚?en/latest')
await mkdir(targetDir, { recursive: true })

await cp(
  join(repositoryRoot, 'docs/.vitepress/dist'),
  targetDir,
  { recursive: true }
)

console.log('Staged files to:', targetDir)
```

### 3. `package.json` 鐨?scripts

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:stage-main": "node scripts/stage_main_site.mjs"
  }
}
```

### 4. 棣栭〉閲嶅畾鍚?`index.html`锛堜粨搴撴牴鐩綍锛?
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=/projects/椤圭洰鍚?en/latest/docs/1_xxx.html">
  <title>椤圭洰鍚?Documentation</title>
</head>
<body>
  <a href="/projects/椤圭洰鍚?en/latest/docs/1_xxx.html">Click here if you are not redirected automatically.</a>
</body>
</html>
```

### 5. `.nojekyll`锛堜粨搴撴牴鐩綍锛?
鍒涘缓涓€涓┖鐨?`.nojekyll` 鏂囦欢锛岄槻姝?GitHub Pages 蹇界暐 `_` 寮€澶寸殑鏂囦欢銆?
---

## 涓夈€佹瀯寤烘祦绋?
姣忔鏇存柊鏂囨。鍚庯紝鎵ц浠ヤ笅姝ラ锛?
```bash
# 1. 鏈湴淇敼 Markdown 鏂囨。
# 2. 鏋勫缓鏂囨。
npm run docs:build

# 3. 鏁寸悊鏋勫缓浜х墿鍒?projects/椤圭洰鍚?en/latest/
npm run docs:stage-main

# 4. 鎻愪氦鍒?GitHub
git add projects/ index.html .nojekyll .gitignore
git commit -m "鏇存柊鏂囨。"
git push origin main
```

> **娉ㄦ剰**锛氬彧鎻愪氦 `projects/`銆乣index.html`銆乣.nojekyll`銆乣.gitignore`锛屼笉鎻愪氦 `docs/`銆乣scripts/`銆乣node_modules/` 绛夈€?
---

## 鍥涖€丟itHub Pages 閰嶇疆

1. 鎵撳紑 GitHub 浠撳簱 鈫?**Settings** 鈫?**Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `root`
4. **涓嶈缁戝畾鑷畾涔夊煙鍚?*锛圕ustom domain 鐣欑┖锛?
---

## 浜斻€佸疂濉?Nginx 鍙嶅悜浠ｇ悊閰嶇疆

### 1. 娣诲姞绔欑偣

瀹濆闈㈡澘 鈫?缃戠珯 鈫?娣诲姞绔欑偣锛?- 鍩熷悕锛歚wiki-test.hiwonder.com`
- 涓嶉渶瑕佸垱寤烘暟鎹簱

### 2. 閰嶇疆 Nginx

绔欑偣璁剧疆 鈫?**閰嶇疆鏂囦欢**锛屽湪 `server {}` 鍧楀唴娣诲姞姣忎釜椤圭洰鐨勫弽鍚戜唬鐞嗚鍒欙細

```nginx
# ============ 鏂囨。鍙嶄唬瑙勫垯 ============

# 椤圭洰1锛歀anderPi
location ^~ /projects/LanderPi/ {
    proxy_pass https://hiwonder-docs.github.io/LanderPi-vite/projects/LanderPi/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}

# 椤圭洰2锛歀eRobot
location ^~ /projects/LeRobot/ {
    proxy_pass https://hiwonder-docs.github.io/LeRobot-vite/projects/LeRobot/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}

# 椤圭洰3锛歑XX锛堟寜姝ゆ牸寮忔坊鍔犳洿澶氶」鐩級
# location ^~ /projects/XXX/ {
#     proxy_pass https://hiwonder-docs.github.io/XXX浠撳簱鍚?projects/XXX/;
#     proxy_set_header Host hiwonder-docs.github.io;
#     proxy_set_header X-Real-IP $remote_addr;
#     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#     proxy_set_header X-Forwarded-Proto $scheme;
#     proxy_ssl_server_name on;
# }
```

### 鍏抽敭璇存槑

| 閰嶇疆椤?| 璇存槑 |
|--------|------|
| `^~` | 浼樺厛鍖归厤锛岄槻姝㈣ PHP 鍜屾鍒欒鍒欐嫤鎴?|
| `proxy_pass` 甯?URI | 淇濈暀瀹屾暣璺緞锛屼笉浼氭埅鏂墠缂€ |
| `proxy_set_header Host` | 璁?GitHub 璇嗗埆璇锋眰鐨勫煙鍚?|
| `proxy_ssl_server_name on` | 鏀寔 SNI锛屽惁鍒?HTTPS 鍙嶄唬浼氬け璐?|

### 3. 姣忓姞涓€涓柊椤圭洰鍙渶

1. 鍦?GitHub 鍒涘缓鏂颁粨搴擄紝鎸夋湰鏂囨。閰嶇疆濂介」鐩?2. 鍦ㄥ疂濉?Nginx 閰嶇疆涓姞涓€鏉?`location ^~ /projects/椤圭洰鍚?` 瑙勫垯
3. 閲嶈浇 Nginx

---

## 鍏€丏NS 閰嶇疆

鍦ㄩ樋閲屼簯 DNS 鎺у埗鍙帮細

| 涓绘満璁板綍 | 璁板綍绫诲瀷 | 璁板綍鍊?|
|---------|---------|--------|
| `wiki-test` | A | 瀹濆鏈嶅姟鍣ㄧ殑鍏綉 IP |

> 鈿狅笍 涓嶈鐢?CNAME 鎸囧悜 `hiwonder-docs.github.io`锛屽繀椤绘寚鍚戝疂濉旀湇鍔″櫒 IP銆?
---

## 涓冦€丠TTPS 閰嶇疆锛堝彲閫夛級

1. 瀹濆闈㈡澘 鈫?绔欑偣 鈫?SSL 鈫?**Let's Encrypt** 鈫?鐢宠璇佷功
2. 鍕鹃€?**寮哄埗 HTTPS**
3. 鍙嶅悜浠ｇ悊閰嶇疆鏃犻渶淇敼锛岃嚜鍔ㄦ敮鎸?
---

## 鍏€?gitignore 鍙傝€?
```
node_modules/
docs/
scripts/
.github/
*.log
.DS_Store
Thumbs.db
```

> 鍙彁浜?`projects/`銆乣index.html`銆乣.nojekyll`銆乣.gitignore`銆乣README.md`

---

## 涔濄€佸揩閫熸鏌ユ竻鍗?
鎼缓鏂伴」鐩椂锛屾寜姝ゆ竻鍗曢€愰」纭锛?
- [ ] `config.mts` 鐨?`base` 璁剧疆涓?`/projects/椤圭洰鍚?en/latest/`
- [ ] `stage_main_site.mjs` 涓殑椤圭洰鍚嶅凡鏇挎崲
- [ ] `index.html` 鐨勯噸瀹氬悜璺緞宸叉浛鎹?- [ ] `.nojekyll` 鏂囦欢瀛樺湪
- [ ] 鏈湴鎵ц `npm run docs:build && npm run docs:stage-main` 鎴愬姛
- [ ] `projects/椤圭洰鍚?en/latest/` 鐩綍涓嬫湁 `assets/` 鍜?`docs/`
- [ ] HTML 涓?CSS 璺緞涓?`/projects/椤圭洰鍚?en/latest/assets/xxx.css`
- [ ] GitHub Pages Source 璁句负 `main` / `root`
- [ ] GitHub Pages 鏈粦瀹氳嚜瀹氫箟鍩熷悕
- [ ] 瀹濆 Nginx 宸叉坊鍔犲搴旂殑 `location ^~` 瑙勫垯
- [ ] Nginx 宸查噸杞?- [ ] DNS 鎸囧悜瀹濆鏈嶅姟鍣?IP

---

## 鍗併€佸父瑙侀棶棰?
### Q1: CSS 鏍峰紡涓㈠け

**鍘熷洜**锛欳SS 璺緞涓嶅锛屾垨鏂囦欢鏈帹閫佸埌 GitHub銆?
**妫€鏌?*锛?1. 娴忚鍣?F12 鈫?Network 鈫?鐪?CSS 璇锋眰杩斿洖浠€涔堢姸鎬?2. 鐩存帴璁块棶 `https://hiwonder-docs.github.io/浠撳簱鍚?projects/椤圭洰鍚?en/latest/assets/xxx.css` 鏄惁鑳芥墦寮€
3. 纭 `base` 閰嶇疆姝ｇ‘

### Q2: 502 Bad Gateway

**鍘熷洜**锛歂ginx 鏃犳硶杩炴帴鍒?GitHub銆?
**妫€鏌?*锛?1. `proxy_pass` 鍦板潃鏄惁姝ｇ‘
2. `proxy_ssl_server_name on` 鏄惁娣诲姞
3. 鏈嶅姟鍣ㄨ兘鍚﹁闂?GitHub锛歚curl -v https://hiwonder-docs.github.io`

### Q3: 500 鏈嶅姟鍣ㄥ紓甯?
**鍘熷洜**锛氳姹傝 PHP 鎷︽埅銆?
**瑙ｅ喅**锛歭ocation 鍓嶇紑鍔?`^~`锛屽 `location ^~ /projects/椤圭洰鍚?`

### Q4: 璁块棶 `wiki-test.hiwonder.com` 鎶ュ煙鍚嶅凡鍗犵敤

**鍘熷洜**锛氬彟涓€涓?GitHub 浠撳簱杩樼粦鐫€杩欎釜鍩熷悕銆?
**瑙ｅ喅**锛氬湪璇ヤ粨搴?Settings 鈫?Pages 鈫?Custom domain 鈫?Remove
