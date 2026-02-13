const fs = require("fs");
const path = require("path");
const { log } = require("./logger.js");

const configPath = path.join(__dirname, "../config.json");

// Valores padrão caso o config não exista
const defaultConfig = {
  destination: "/mnt/backup",
  paths: [],
  schedule: "0 0 * * *" // diário à meia-noite
};

// Lê o config ou cria se não existir
function getConfig() {
  if (!fs.existsSync(configPath)) {
    saveConfig(defaultConfig);
    log("config.json não encontrado. Criado com valores padrão.");
    return defaultConfig;
  }

  const raw = fs.readFileSync(configPath);
  try {
    return JSON.parse(raw);
  } catch (err) {
    log("Erro ao ler config.json, usando valores padrão:", err.message);
    return defaultConfig;
  }
}

// Salva o config
function saveConfig(data) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

// Adiciona novo caminho
function addPath(newPath) {
  const config = getConfig();
  if (!config.paths.includes(newPath)) {
    config.paths.push(newPath);
    saveConfig(config);
    log("Caminho adicionado:", newPath);
  } else {
    log("Caminho já existe:", newPath);
  }
}

// Lista caminhos
function listPaths() {
  const config = getConfig();
  log("Caminhos configurados:");
  config.paths.forEach(p => console.log("-", p));
}

// Remove caminho
function removePath(removePath) {
  const config = getConfig();
  if (config.paths.includes(removePath)) {
    config.paths = config.paths.filter(p => p !== removePath);
    saveConfig(config);
    log("Caminho removido:", removePath);
  } else {
    log("Caminho não encontrado:", removePath);
  }
}

// Define destino base
function setDestination(dest) {
  const config = getConfig();
  config.destination = dest;
  saveConfig(config);
  log("Destino definido:", dest);
}

// Define agendamento (cron)
function setSchedule(cron) {
  const config = getConfig();
  config.schedule = cron;
  saveConfig(config);
  log("Agendamento definido:", cron);
}

module.exports = {
  getConfig,
  addPath,
  listPaths,
  removePath,
  setDestination,
  setSchedule
};
