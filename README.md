# KeyChange

A lightweight Windows tray application for managing custom keybinds. KeyChange lives in your system tray and gives you quick access to your keybind configuration without cluttering your taskbar.

## Tech Stack

- **Frontend** — Angular + Tailwind CSS
- **Backend** — Rust
- **Desktop** — Tauri v2

## Features

- Runs silently in the system tray
- Click the tray icon to show/hide the window
- View and search your custom keybinds
- Dark/light theme support
- Custom frameless window with native-style controls

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri CLI prerequisites](https://v2.tauri.app/start/prerequisites/)

## Getting Started

Clone the repository:

```bash
git clone https://github.com/brenluz/KeyChange.git
cd KeyChange
```

Install dependencies:

```bash
pnpm install
```

Run in development mode:

```bash
pnpm tauri dev
```

Build for production:

```bash
pnpm tauri build
```

## Project Structure

```
KeyChange/
├── src/                  # Angular frontend
│   └── app/
│       ├── header/       # Custom titlebar component
│       └── user-keybinds/
├── src-tauri/            # Rust backend
│   ├── src/
│   │   ├── lib.rs        # Tauri setup, tray icon, commands
│   │   └── utils/        # Helper functions (hex_to_color, etc.)
│   └── tauri.conf.json
└── tailwind.config.js
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) with the following extensions:
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

## License

MIT