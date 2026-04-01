# KeyChange

A lightweight Windows tray application for managing custom keybinds. KeyChange lives in your system tray and gives you quick access to your keybind configuration.

## Tech Stack

- **Frontend** — Angular + Tailwind CSS
- **Backend** — Rust
- **Desktop** — Tauri v2

## Features

- Runs Silently in the Tray
- Click the tray icon to show/hide the window, right-click to quit
- Create custom keybinds that launch apps, open URLs, or run system tools
- Global shortcuts that work even when the app is not focused
- Edit and delete existing keybinds
- App picker with presets, file browser, and custom URL support
- Custom frameless window with native-style controls

Coming Soon: 
- Search through your keybinds instantly
- Export and import keybinds as JSON
- Dark/light theme support
- Start on startup option


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
├── src/                        # Angular frontend
│   └── app/
│       ├── title-bar/          # Custom frameless titlebar
│       ├── user-keybinds/      # Main keybind list page
│       ├── add-keybind-modal/  # Add/edit keybind modal
│       ├── app-picker-modal/   # App and URL picker
│       ├── settings/           # Settings page (Coming Soon)
│       └── services/           # Keybind, settings, icon cache services
├── src-tauri/                  # Rust backend
│   ├── src/
│   │   ├── lib.rs              # Tauri setup, tray icon, commands
│   │   └── utils/              # Helper functions
│   ├── capabilities/           # Tauri permissions
│   └── tauri.conf.json
└── tailwind.config.js
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/) with the following extensions:
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

## License

MIT