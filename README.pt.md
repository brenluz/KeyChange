# KeyChange

Um aplicativo leve para o sistema Windows para gerenciar atalhos de teclado personalizados. O KeyChange fica na bandeja do sistema e oferece acesso rápido às suas configurações de keybinds sem poluir a barra de tarefas.

## Tecnologias

- **Frontend** — Angular + Tailwind CSS
- **Backend** — Rust
- **Desktop** — Tauri v2

## Funcionalidades

- Roda silenciosamente na bandeja do sistema
- Clique no ícone da bandeja para mostrar/ocultar a janela
- Visualize e pesquise seus keybinds personalizados
- Suporte a tema claro/escuro
- Janela sem borda nativa com controles customizados

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
├── src/                  # Frontend Angular
│   └── app/
│       ├── header/       # Componente de barra de título customizada
│       └── user-keybinds/
├── src-tauri/            # Backend Rust
│   ├── src/
│   │   ├── lib.rs        # Configuração do Tauri, ícone da bandeja, comandos
│   │   └── utils/        # Funções auxiliares (hex_to_color, etc.)
│   └── tauri.conf.json
└── tailwind.config.js
```

## IDE Recomendada

[VS Code](https://code.visualstudio.com/) com as seguintes extensões:
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

## Licença

MIT