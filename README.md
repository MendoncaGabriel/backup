## 📌 Comandos disponíveis

| Comando           | O que faz                                                                         |
| ----------------- | --------------------------------------------------------------------------------- |
| `run`             | Executa o backup manualmente na hora.                                             |
| `add <path>`      | Adiciona um diretório/arquivo à lista de caminhos que serão incluídos no backup.  |
| `remove <path>`   | Remove um caminho da lista de backup.                                             |
| `list`            | Mostra todos os caminhos atualmente configurados para backup.                     |
| `dest <path>`     | Define o diretório base onde os backups serão armazenados.                        |
| `schedule <cron>` | Define um agendamento usando formato **cron** (ex: `0 2 * * *` para 2h da manhã). |
| `start`           | Inicia o agendador automático de backups conforme configuração.                   |
| `interval <days>` | Executa backup automaticamente a cada X dias (ex: `interval 7`).                  |

---

# 🚀 Como instalar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/MendoncaGabriel/backup.git
```

### 2️⃣ Entrar na pasta do projeto

```bash
cd backup
```

### 3️⃣ Instalar dependências

```bash
npm install
```

### 4️⃣ Tornar comando global (opcional)

Se o projeto tiver `"bin"` configurado no `package.json`, você pode rodar:

```bash
npm link
```

Isso permite usar o comando globalmente no sistema.

---

# ▶️ Exemplo de uso

Adicionar pasta:

```bash
backup add /home/user/documentos
```

Definir destino:

```bash
backup dest /mnt/backups
```

Executar manualmente:

```bash
backup run
```

Agendar diário às 2h:

```bash
backup schedule "0 2 * * *"
backup start
```

# Dar permissão
chmod +x bin/backup.js
