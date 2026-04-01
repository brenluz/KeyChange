# KeyChange

Um aplicativo leve para a bandeja do sistema Windows para gerenciar atalhos de teclado personalizados. O KeyChange fica na bandeja do sistema e oferece acesso rápido às suas configurações de keybinds sem poluir a barra de tarefas.

## Tecnologias

- **Frontend** — Angular + Tailwind CSS
- **Backend** — Rust
- **Desktop** — Tauri v2

## Funcionalidades

- Roda silenciosamente na bandeja do sistema — sem poluir a barra de tarefas
- Clique no ícone da bandeja para mostrar/ocultar a janela, clique com o botão direito para sair
- Crie keybinds personalizados que abrem aplicativos, URLs ou ferramentas do sistema
- Atalhos globais que funcionam mesmo quando o aplicativo não está em foco
- Edite e exclua keybinds existentes
- Seletor de aplicativos com presets, navegador de arquivos e suporte a URLs personalizadas
- Exportação e importação de keybinds em JSON

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- [Rust](https://www.rust-lang.org/tools/install)
- [Pré-requisitos do Tauri CLI](https://v2.tauri.app/start/prerequisites/)

## Como começar

Clone o repositório:

```bash
git clone https://github.com/brenluz/KeyChange.git
cd KeyChange
```

Instale as dependências:

```bash
pnpm install
```

Execute em modo de desenvolvimento:

```bash
pnpm tauri dev
```

Gere o build de produção:

```bash
pnpm tauri build
```

## Estrutura do Projeto

```
KeyChange/
├── src/                        # Frontend Angular
│   └── app/
│       ├── title-bar/          # Barra de título frameless customizada
│       ├── user-keybinds/      # Página principal de keybinds
│       ├── add-keybind-modal/  # Modal de adicionar/editar keybind
│       ├── app-picker-modal/   # Seletor de aplicativos e URLs
│       ├── settings/           # Página de configurações
│       └── services/           # Serviços de keybind, configurações e cache de ícones
├── src-tauri/                  # Backend Rust
│   ├── src/
│   │   ├── lib.rs              # Configuração do Tauri, ícone da bandeja, comandos
│   │   └── utils/              # Funções auxiliares
│   ├── capabilities/           # Permissões do Tauri
│   └── tauri.conf.json
└── tailwind.config.js
```

## IDE Recomendada

[VS Code](https://code.visualstudio.com/) ou [Cursor](https://cursor.sh/) com as seguintes extensões:
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

## Licença

MIT