# JetHexa Documentation

This repository contains the JetHexa VitePress documentation site. The
documentation source files are Markdown files under `docs/docs/`.

## Local development

Install dependencies and start the local documentation server:

```bash
npm ci
npm run docs:dev
```

Build the production site:

```bash
npm run docs:build
npm run docs:stage-main
```

The production files are staged in `projects/JetHexa/en/latest/`.

## GitHub Pages deployment

For the `JetHexa-vite` repository, configure GitHub Pages to deploy from the
`main` branch and `/(root)`. The initial GitHub Pages URL is:

```text
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/latest/
```

After the reverse proxy is configured, the public documentation URL is:

```text
https://wiki.hiwonder.com/projects/JetHexa/en/latest/
```
