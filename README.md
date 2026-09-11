# JetHexa Documentation

This repository contains the JetHexa VitePress documentation site. The
versioned documentation sources are stored under `content/<version>/`.

Available versions:

- `JetsonNanoRos1`: Jetson Nano-ROS1
- `JetsonOrinNX`: Jetson Orin NX
- `JetsonNano`: Jetson Nano
- `RaspberryPi`: Raspberry Pi
- `JetsonOrinNano`: Jetson Orin Nano

## Local development

Install dependencies and start the local documentation server:

```bash
npm ci
npm run docs:dev
```

Preview a specific version:

```bash
npm run dev:jetson-nano-ros1
npm run dev:jetson-orin-nx
npm run dev:jetson-nano
npm run dev:raspberry-pi
npm run dev:jetson-orin-nano
```

Build and stage both production versions:

```bash
npm run build:all
```

Preview the version that was built most recently:

```bash
npm run preview:jetson-nano-ros1
npm run preview:jetson-orin-nx
npm run preview:jetson-nano
npm run preview:raspberry-pi
npm run preview:jetson-orin-nano
```

The production files are staged in `projects/JetHexa/en/<version>/`.

## GitHub Pages deployment

For the `JetHexa-vite` repository, configure GitHub Pages to deploy from the
`main` branch and `/(root)`. The initial GitHub Pages URL is:

```text
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/JetsonNanoRos1/
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/JetsonOrinNX/
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/JetsonNano/
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/RaspberryPi/
https://Hiwonder-docs.github.io/JetHexa-vite/projects/JetHexa/en/JetsonOrinNano/
```

After the reverse proxy is configured, the public documentation URL is:

```text
https://wiki.hiwonder.com/projects/JetHexa/en/JetsonNanoRos1/
https://wiki.hiwonder.com/projects/JetHexa/en/JetsonOrinNX/
https://wiki.hiwonder.com/projects/JetHexa/en/JetsonNano/
https://wiki.hiwonder.com/projects/JetHexa/en/RaspberryPi/
https://wiki.hiwonder.com/projects/JetHexa/en/JetsonOrinNano/
```
