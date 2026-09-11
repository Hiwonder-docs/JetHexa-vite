# JetHexa Documentation

This repository contains the JetHexa VitePress documentation site. The
versioned documentation sources are stored under `content/<version>/`.

Available versions:

- `latest`: JetHexa
- `JetsonOrinNano`: Jetson Orin Nano

## Local development

Install dependencies and start the local documentation server:

```bash
npm ci
npm run docs:dev
```

Preview a specific version:

```bash
npm run dev:latest
npm run dev:jetson-orin-nano
```

Build and stage both production versions:

```bash
npm run build:all
```

Preview the version that was built most recently:

```bash
npm run preview:latest
npm run preview:jetson-orin-nano
```

The production files are staged in `projects/JetHexa/en/<version>/`.

## GitHub Pages deployment

For the `JetHexa-vite` repository, configure GitHub Pages to deploy from the
`main` branch and `/(root)`. The initial GitHub Pages URL is:

```text
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/latest/
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/JetsonOrinNano/
```

After the reverse proxy is configured, the public documentation URL is:

```text
https://wiki.hiwonder.com/projects/JetHexa/en/latest/
https://wiki.hiwonder.com/projects/JetHexa/en/JetsonOrinNano/
```
