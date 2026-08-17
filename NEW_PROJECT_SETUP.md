# 新项目文档部署流程

> 适用于在 `wiki-test.hiwonder.com` 域名下新增 VitePress 文档项目的场景。
> 每个项目独立 GitHub 仓库，通过宝塔 Nginx 反向代理统一对外提供服务。

---

## 占位符说明

本文档中使用以下占位符，使用时请全部替换为实际值：

| 占位符 | 含义 | 示例值 |
|--------|------|--------|
| `<项目名>` | URL 路由中的项目标识（路由 `/projects/<项目名>/` 中的值） | `LanderPi`、`SOARM101` |
| `<仓库名>` | GitHub 仓库的名称（可能与项目名不同） | `LanderPi-vite`、`SOARM101` |

> ⚠️ `<项目名>` 和 `<仓库名>` 可以相同也可以不同，但同一个项目中所有地方必须保持一致。

---

## 完整流程

### 第一步：GitHub 创建仓库

1. 在 GitHub 上创建一个新仓库（建议设为 Public）
2. 仓库名记为 `<仓库名>`（例如 `LanderPi-vite`）
3. 不要勾选 "Initialize this repository"（保持空仓库）
4. 本地克隆空仓库到任意目录

```bash
git clone https://github.com/<你的用户名>/<仓库名>.git
```

---

### 第二步：复制模板项目

1. 将现有的 LanderPi-vite 项目**完整复制**到新克隆的空仓库目录中
2. 进入新仓库目录

---

### 第三步：替换文档内容

1. **替换 Markdown 文档**：
   - 删除 `docs/docs/` 下的所有 `.md` 文件
   - 把新项目的 Markdown 文件放到 `docs/docs/` 目录下

2. **替换静态资源**：
   - 删除 `docs/_static/` 下的所有内容
   - 把新项目的图片等资源放到 `docs/_static/` 目录下

> 📌 文件目录结构保持 `docs/docs/*.md` 和 `docs/_static/**/*` 不变，只换内容。

---

### 第四步：修改配置文件（关键）

需要修改以下 6 个文件中的 `<项目名>` 和 `<仓库名>`：

#### 4.1 `docs/.vitepress/config.mts`（第 15 行）

```typescript
// 修改前
const docsBase = normalizeBase(process.env.DOCS_BASE || '/projects/LanderPi/en/latest/')

// 修改后
const docsBase = normalizeBase(process.env.DOCS_BASE || '/projects/<项目名>/en/latest/')
```

同时检查第 641-642 行的 `title` 和 `description`：

```typescript
title: '<项目名> Documentation',
description: '<项目名> robot documentation',
```

#### 4.2 `scripts/stage_main_site.mjs`（第 10 行）

```javascript
// 修改前
const targetDir = join(repositoryRoot, 'projects/LanderPi/en/latest')

// 修改后
const targetDir = join(repositoryRoot, 'projects/<项目名>/en/latest')
```

#### 4.3 根目录 `index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=/projects/<项目名>/en/latest/docs/<入口文档名>.html">
  <title><项目名> Documentation</title>
</head>
<body>
  <a href="/projects/<项目名>/en/latest/docs/<入口文档名>.html">Click here if you are not redirected automatically.</a>
</body>
</html>
```

> ⚠️ `<入口文档名>` 是 `docs/docs/` 下的第一个文档名（不含 `.md` 后缀），例如 `1_LanderPi_User_Manual`。

#### 4.4 `docs/index.md`（第 3 行）

```markdown
---
layout: page-redirect
redirectTo: /docs/<入口文档名>.html
---
```

> 这里是相对于 `base` 的路径，不用加 `/projects/<项目名>/en/latest/` 前缀。

#### 4.5 `docs/docs/index.md`（第 3 行）

同上：

```markdown
---
layout: page-redirect
redirectTo: /docs/<入口文档名>.html
---
```

#### 4.6 `README.md`（可选）

更新项目描述：

```markdown
# <项目名> Documentation

This repository contains the <项目名> VitePress documentation site.
```

---

### 第五步：本地构建验证

在仓库根目录执行：

```bash
# 1. 安装依赖（首次需要）
npm ci

# 2. 构建文档
npm run docs:build

# 3. 整理构建产物
npm run docs:stage-main
```

构建完成后，检查 `projects/<项目名>/en/latest/` 目录：

- 应该有 `docs/*.html`（每个 md 对应一个 html）
- 应该有 `assets/`（包含 CSS、JS、图片）
- 应该有 `index.html`

**关键检查**：打开 `projects/<项目名>/en/latest/index.html`，确认其中的 CSS 路径为：
```
/projects/<项目名>/en/latest/assets/xxx.css
```

如果路径不对，说明 `config.mts` 的 `base` 配置有误。

---

### 第六步：提交并推送到 GitHub

```bash
# 1. 添加文件（注意不要提交 node_modules、docs/.vitepress/dist 等）
git add projects/ index.html .nojekyll .gitignore package.json package-lock.json scripts/ docs/ .vitepress/

# 2. 简化提交（推荐）
git add -A
# 但要确保 .gitignore 正确

# 3. 提交
git commit -m "init: <项目名> 文档初始化"

# 4. 推送
git push origin main
```

> 📌 `.gitignore` 应包含 `node_modules/`，但 `docs/`、`scripts/` 等源码可以保留（取决于你希望仓库包含什么）。
> **必须提交**：`projects/`、`index.html`、`.nojekyll`（GitHub Pages 直接服务这些静态文件）。

---

### 第七步：配置 GitHub Pages

1. 打开 GitHub 仓库 → **Settings** → **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `root`
4. **不要绑定自定义域名**（Custom domain 留空）

等待几分钟，验证 GitHub Pages 直连是否可访问：
```
https://<你的GitHub用户名>.github.io/<仓库名>/projects/<项目名>/en/latest/
```

> 例如：`https://hiwonder-docs.github.io/LanderPi-vite/projects/LanderPi/en/latest/`

如果 CSS 样式正常，说明 GitHub Pages 配置成功。

---

### 第八步：配置宝塔 Nginx 反向代理

1. 登录宝塔面板
2. 找到 `wiki-test.hiwonder.com` 站点 → **设置** → **配置文件**
3. 在 `server {}` 块内追加一条 location 规则：

```nginx
# <项目名>
location ^~ /projects/<项目名>/ {
    proxy_pass https://hiwonder-docs.github.io/<仓库名>/projects/<项目名>/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}
```

以 LanderPi 为例：

```nginx
# LanderPi
location ^~ /projects/LanderPi/ {
    proxy_pass https://hiwonder-docs.github.io/LanderPi-vite/projects/LanderPi/;
    proxy_set_header Host hiwonder-docs.github.io;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_ssl_server_name on;
}
```

4. **保存并重载 Nginx**

> ⚠️ **常见错误**：`proxy_pass` 后面**不要加反引号**！直接写 URL，以分号 `;` 结尾。

---

### 第九步：验证访问

浏览器访问：
```
https://wiki-test.hiwonder.com/projects/<项目名>/en/latest/
```

应自动跳转到文档首页。如果样式正常、图片显示正常，部署成功。

---

## 快速检查清单

按此清单逐项确认：

- [ ] GitHub 已创建空仓库 `<仓库名>`
- [ ] 本地仓库已复制模板项目
- [ ] `docs/docs/` 下的 Markdown 文件已替换为新项目内容
- [ ] `docs/_static/` 下的静态资源已替换
- [ ] `docs/.vitepress/config.mts` 的 `base` 已改为 `/projects/<项目名>/en/latest/`
- [ ] `docs/.vitepress/config.mts` 的 `title`、`description` 已更新
- [ ] `scripts/stage_main_site.mjs` 的 `targetDir` 已改为 `projects/<项目名>/en/latest`
- [ ] 根目录 `index.html` 重定向路径已更新
- [ ] `docs/index.md` 的 `redirectTo` 已更新
- [ ] `docs/docs/index.md` 的 `redirectTo` 已更新
- [ ] `npm run docs:build` 执行成功
- [ ] `npm run docs:stage-main` 执行成功
- [ ] `projects/<项目名>/en/latest/` 目录下有 `docs/`、`assets/`、`index.html`
- [ ] 生成的 HTML 中 CSS 路径为 `/projects/<项目名>/en/latest/assets/xxx.css`
- [ ] 已提交并推送到 GitHub
- [ ] GitHub Pages Source 设为 `main` / `root`
- [ ] GitHub Pages 未绑定自定义域名
- [ ] GitHub Pages 直连访问正常（`https://<用户名>.github.io/<仓库名>/...`）
- [ ] 宝塔 Nginx 已添加 `location ^~ /projects/<项目名>/` 规则
- [ ] Nginx 规则中 `proxy_pass` 无反引号
- [ ] Nginx 规则中 `proxy_pass` 的 `<仓库名>` 与 git remote 一致（执行 `git remote -v` 确认，通常带 `-vite` 后缀）
- [ ] Nginx 已重载
- [ ] `https://wiki-test.hiwonder.com/projects/<项目名>/en/latest/` 访问正常

---

## 常见问题

### Q1: 访问报 502 Bad Gateway

**原因**：Nginx 配置错误，常见有两个坑：

1. **反引号问题**：从文档复制代码时，`proxy_pass` URL 被反引号包裹——**这是最常见原因**
2. **仓库名不匹配**：`<仓库名>`（GitHub 仓库名，通常带 `-vite` 后缀）与 `<项目名>`（URL 路由，不带后缀）混淆

**检查**：
1. `proxy_pass` 后面是否有多余的反引号（\`）
2. `proxy_pass` 的 URL 是否正确：`https://hiwonder-docs.github.io/<仓库名>/projects/<项目名>/`
3. `<仓库名>` 是否与 `git remote -v` 中的 origin 一致（通常带 `-vite` 后缀）
4. 直接访问 `https://<用户名>.github.io/<仓库名>/projects/<项目名>/en/latest/` 验证 GitHub Pages 是否可访问

**正确写法**：
```nginx
# ✅ 无反引号 + 仓库名带 -vite 后缀（如果仓库名有后缀）
proxy_pass https://hiwonder-docs.github.io/<仓库名>/projects/<项目名>/;
```

**错误写法**（会 502）：
```nginx
# ❌ 有反引号
proxy_pass `https://hiwonder-docs.github.io/<仓库名>/projects/<项目名>/;`

# ❌ 仓库名缺 -vite 后缀（假设仓库名是 xxx-vite）
proxy_pass https://hiwonder-docs.github.io/<项目名>/projects/<项目名>/;
```

**记忆口诀**：项目名不带 `-vite`，仓库名带 `-vite`，Nginx 的 `proxy_pass` 里两个名字不要搞反。

### Q2: 页面能打开但 CSS 丢失

**原因**：`base` 配置错误，或构建产物未推送到 GitHub。

**检查**：
1. 打开 `projects/<项目名>/en/latest/index.html`，看 CSS 路径是否为 `/projects/<项目名>/en/latest/assets/xxx.css`
2. 确认 `config.mts` 的 `base` 为 `/projects/<项目名>/en/latest/`
3. 确认 `projects/` 目录已提交到 GitHub
4. 浏览器 F12 → Network → 看 CSS 请求返回什么状态

### Q3: 访问报 500 服务器异常

**原因**：请求被 PHP 拦截。

**解决**：location 前缀加 `^~`：
```nginx
location ^~ /projects/<项目名>/ {
```

### Q4: 访问报域名已占用

**原因**：另一个 GitHub 仓库还绑着 `wiki-test.hiwonder.com`。

**解决**：在该仓库 Settings → Pages → Custom domain → Remove。

### Q5: 构建产物路径不对（生成了 `projects/` 而不是 `projects/<项目名>/en/latest/`）

**原因**：`stage_main_site.mjs` 的 `targetDir` 未更新。

**解决**：确认第 10 行为：
```javascript
const targetDir = join(repositoryRoot, 'projects/<项目名>/en/latest')
```

---

## 文件结构参考

完整的项目目录结构如下：

```
<仓库名>/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts              ← VitePress 配置（改 base）
│   │   └── autoSidebar.mts         ← 侧边栏自动生成（一般不用改）
│   ├── docs/                       ← Markdown 文档（替换内容）
│   │   ├── 1_xxx.md
│   │   ├── 2_xxx.md
│   │   └── index.md
│   ├── _static/                    ← 静态资源（替换内容）
│   │   └── media/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── e-logo.png
│   └── index.md                    ← 首页重定向（改 redirectTo）
├── scripts/
│   └── stage_main_site.mjs         ← 构建脚本（改 targetDir）
├── projects/                       ← 构建产物（自动生成，需提交）
│   └── <项目名>/
│       └── en/
│           └── latest/
│               ├── assets/
│               ├── docs/
│               │   └── *.html
│               ├── index.html
│               ├── 404.html
│               ├── favicon.ico
│               └── ...
├── .nojekyll                       ← 空文件，防止 GitHub Pages 忽略 _ 开头文件
├── .gitignore
├── index.html                      ← 根目录重定向（改 URL）
├── package.json
├── package-lock.json
└── README.md
```

---

## 关键配置项速查表

| 文件 | 配置项 | 值 |
|------|--------|-----|
| `docs/.vitepress/config.mts` | `base` | `/projects/<项目名>/en/latest/` |
| `scripts/stage_main_site.mjs` | `targetDir` | `projects/<项目名>/en/latest` |
| 根目录 `index.html` | `meta refresh` | `/projects/<项目名>/en/latest/docs/<入口>.html` |
| `docs/index.md` | `redirectTo` | `/docs/<入口>.html` |
| `docs/docs/index.md` | `redirectTo` | `/docs/<入口>.html` |
| Nginx `location` | 匹配路径 | `^~ /projects/<项目名>/` |
| Nginx `proxy_pass` | 上游地址 | `https://hiwonder-docs.github.io/<仓库名>/projects/<项目名>/` |
