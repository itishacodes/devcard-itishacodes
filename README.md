# 👨‍💻 @ganeshak11/devcard

A sleek, interactive, and fully-featured personal business card built for the terminal. 

This CLI tool serves as a digital identity card, showcasing my bio, technical skills, and contact links in a beautifully animated `boxen` layout complete with an interactive command palette and a scannable QR code!

## 🚀 Quick Start

You can run the DevCard instantly without installing anything using `npx`:

```bash
npx ganeshak11
```

## ✨ Features

- **Beautiful UI**: Built using `boxen` and `chalk` for a clean, colorful, and responsive terminal layout.
- **Interactive Command Palette**: Navigate through different sections using your arrow keys via `inquirer`.
- **Scannable QR Code**: Scan the terminal with your phone to instantly visit my portfolio site using `qrcode-terminal`.
- **Easter Egg Animation**: Trigger the "Summon the Duck" option for a fun terminal buffer animation!

## 🛠️ Built With

- [TypeScript](https://www.typescriptlang.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - For the interactive prompt
- [Boxen](https://github.com/sindresorhus/boxen) - For the sleek borders
- [Chalk](https://github.com/chalk/chalk) - For terminal string styling
- [QRCode-Terminal](https://github.com/gtanner/qrcode-terminal) - For rendering the QR code

## 📦 Local Development

If you want to clone this repo and run it locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the TypeScript:
   ```bash
   npm run build
   ```
4. Run the CLI:
   ```bash
   npm start
   ```

---
*Built as part of the Fortis-Tools DevOps toolkit.*
