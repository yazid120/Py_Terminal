# Kevin McCallister CLI Toolkit
## Refactoring & Feature Roadmap

## Vision

Transform the current prototype into a modular, extensible developer terminal inspired by:

- PowerShell
- Bash
- Nushell
- Warp
- Fig
- Oh My Posh

The project should become a **developer productivity shell** with:

- Modular architecture
- Plugin system
- Interactive REPL
- Command execution engine
- AI integration
- Beautiful terminal UI
- Cross-platform support

---

# Phase 1 — Project Refactor

## Goal

Separate responsibilities into dedicated modules.

Current `main.py` contains:

- CLI registration
- REPL
- command execution
- UI
- business logic

These responsibilities must be separated.

### Target Structure

```
kevin-cli/
│
├── main.py
├── shell.py
├── engine.py
├── registry.py
├── context.py
│
├── commands/
│   ├── __init__.py
│   ├── hello.py
│   ├── system.py
│   ├── calculator.py
│   ├── filesystem.py
│   ├── network.py
│   ├── process.py
│   ├── git.py
│   ├── docker.py
│   ├── ai.py
│   └── utils.py
│
├── services/
│   ├── history.py
│   ├── aliases.py
│   ├── logger.py
│   ├── config.py
│   ├── plugins.py
│   └── autocomplete.py
│
├── plugins/
│
├── themes/
│
└── config/
```

---

# Phase 2 — Command Engine

## Objective

Replace direct Click execution with a real execution engine.

Create:

```
CommandEngine
```

Responsibilities:

- register commands
- unregister commands
- parse user input
- execute commands
- execute aliases
- execute plugins
- support pipelines later

Example API

```python
engine.register(command)

engine.execute(
    "hello Kevin"
)
```

The engine must never depend directly on Click.

Commands should simply expose

```
name
description
handler()
```

---

# Phase 3 — Shell Context

Create a persistent shell state.

```
ShellContext
```

Should store:

- current directory
- environment variables
- aliases
- command history
- prompt
- username
- hostname
- active theme
- current git repository
- current git branch

The shell context should persist during the REPL session.

---

# Phase 4 — REPL

Move the interactive shell into

```
shell.py
```

Responsibilities

- display prompt
- read user input
- execute engine
- handle errors
- store history
- support Ctrl+C
- support Ctrl+D

Future support:

- autocomplete
- syntax highlighting
- multiline editing

---

# Phase 5 — Built-in Commands

Move every command into its own module.

Current commands

- hello
- greet
- calculator
- system-info

New commands

Filesystem

- pwd
- ls
- tree
- cd
- mkdir
- touch
- cp
- mv
- rm
- find
- cat
- head
- tail

System

- cpu
- memory
- disk
- battery
- processes
- env
- clear
- exit

Networking

- ping
- dns
- traceroute
- ports
- ip

Developer

- json pretty
- uuid
- base64 encode/decode
- hash
- jwt decode
- jwt encode

---

# Phase 6 — History

Implement

```
history
```

Support

```
history

!!

!5

!hello
```

History should be persistent.

---

# Phase 7 — Alias System

Support

```
alias ll=ls

alias gs=git status

alias cls=clear
```

Commands

```
alias

unalias

aliases
```

---

# Phase 8 — Variables

Support shell variables.

Example

```
name=Kevin

echo $name

Kevin
```

Variables should be stored inside ShellContext.

---

# Phase 9 — Configuration

Implement

```
config.json
```

Support

```
theme

username

prompt

default editor

history size

colors
```

Commands

```
config get

config set

config reset
```

---

# Phase 10 — Logging

Log every executed command.

Example

```
2026-07-14 19:42 ls

2026-07-14 19:43 git status

2026-07-14 19:44 docker ps
```

---

# Phase 11 — Plugin System

Goal

Allow third-party commands.

Each plugin

```
plugins/weather/

plugin.json

weather.py
```

Plugin manifest

```
name

version

author

description

commands
```

The engine should automatically discover plugins.

---

# Phase 12 — Themes

Support multiple themes.

Examples

```
Default

Dark

Matrix

Cyberpunk

Dracula

Nord
```

Themes should control

- prompt colors
- error colors
- success colors
- banners

---

# Phase 13 — Prompt

Replace

```
>
```

With

```
Kevin@Windows

~/Projects/MyApp

(main)

❯
```

Prompt should display

- username
- hostname
- current directory
- git branch
- virtual environment
- current time (optional)

---

# Phase 14 — Autocomplete

Replace basic input()

Use

```
prompt_toolkit
```

Features

- tab completion
- history search
- command suggestions
- multiline editing
- syntax highlighting

---

# Phase 15 — Pipeline Engine

Support

```
|

```

Example

```
ls

↓

grep py

↓

sort

↓

head
```

Commands should return structured output rather than only printing.

---

# Phase 16 — Background Jobs

Support

```
download &

backup &
```

Commands

```
jobs

kill

fg

bg
```

---

# Phase 17 — Git Integration

Commands

```
git status

git log

git branches

git checkout

git pull

git push
```

Prefer GitPython.

---

# Phase 18 — Docker Integration

Commands

```
docker ps

docker images

docker logs

docker restart
```

Prefer Docker SDK.

---

# Phase 19 — HTTP Client

Built-in REST client.

Examples

```
http GET https://api.github.com

http POST
```

Support

- headers
- json
- authentication

---

# Phase 20 — AI Integration

Create

```
ai
```

Commands

```
ask

explain

refactor

generate tests

commit-message

summarize

review
```

Provider abstraction

```
OpenAI

Claude

Local models
```

The AI layer should be provider-independent.

---

# Phase 21 — Package Manager

Implement

```
install

remove

search

update
```

For plugins.

Example

```
install weather

install github

install docker
```

---

# Phase 22 — Future Features

Possible additions

- SSH client
- SFTP
- SQLite shell
- MySQL shell
- PostgreSQL shell
- Kubernetes integration
- AWS integration
- Azure integration
- GCP integration
- Secret manager
- Task scheduler
- Macro recorder
- Encryption tools
- File watcher
- System monitor
- Markdown renderer
- Image viewer (terminal)
- AI workflow automation

---

# Design Principles

The codebase should follow:

- SOLID principles
- Dependency Injection where appropriate
- Plugin-first architecture
- Type hints
- Dataclasses where useful
- Small focused modules
- Unit-testable design
- Cross-platform compatibility
- Minimal coupling
- High cohesion

Avoid:

- Large monolithic files
- Global mutable state
- Business logic inside UI code
- Circular imports
- Tight coupling between engine and commands

The engine should remain generic so that commands, plugins, AI providers, and future features can evolve independently.