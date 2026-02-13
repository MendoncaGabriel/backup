# Backup Automático Node.js

Sistema de backup automatizado para arquivos e volumes Docker, com suporte a **CLI**, **agendamento via cron**, e **logs**.

---

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

## 🚀 Como instalar o projeto

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

## ▶️ Exemplo de uso

### 1. Adicionar caminho ao backup

Adicione o diretório ou arquivo para o backup:

```bash
backup add /home/user/documentos
```

### 2. Definir destino do backup

Defina o diretório onde os backups serão armazenados:

```bash
backup dest /mnt/backups
```

### 3. Executar backup manualmente

Execute um backup imediato:

```bash
backup run
```

### 4. Agendar backup diário às 2h

Defina o agendamento no formato cron para rodar diariamente às 2h da manhã:

```bash
backup schedule "0 2 * * *"
backup start
```

---

## 📅 Agendamento via cron

O agendamento do backup é feito via **cron**, de acordo com a sua configuração no sistema. Para agendar o comando `backup run` automaticamente, siga as etapas abaixo:

### 1. Abra o crontab para editar

```bash
crontab -e
```

### 2. Adicione a linha abaixo para rodar o backup todos os dias à meia-noite (00:00)

```cron
0 0 * * * backup run
```

Isso agendará o comando `backup run` para ser executado todos os dias à meia-noite.

---

## 🔑 Dar permissão de execução

Se você estiver usando o **CLI** e precisar tornar o script executável, use o comando:

```bash
chmod +x bin/backup.js
```

---

## 💡 Dicas

* **Permissões**: Certifique-se de que o usuário que executa o backup tem permissão de leitura nos caminhos e gravação no destino.
* **Volumes Docker**: Para backups de volumes Docker, garanta que os volumes estejam montados corretamente.
* **Espaço em Disco**: Monitore o espaço em disco para garantir que há espaço suficiente para os backups.

