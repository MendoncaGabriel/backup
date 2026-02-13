const fs = require("fs");
const path = require("path");
const { log } = require("./logger.js");

const configPath = path.join(__dirname, "../config.json");

const defaultConfig = {
  destination: "/mnt/backup",
  paths: [], // agora cada item será { path, name }
  schedule: "0 0 * * *"
};

// Ler config ou criar se não existir
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

// Salvar config
function saveConfig(data) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

// Adicionar caminho com nome opcional
function addPath(newPath, name = "") {
  const config = getConfig();

  // Se já existir no formato antigo (string), converte para objeto
  config.paths = config.paths.map(p => typeof p === "string" ? { path: p, name: "" } : p);

  if (!config.paths.find(p => p.path === newPath)) {
    config.paths.push({ path: newPath, name });
    saveConfig(config);
    log("Caminho adicionado:", name ? `${name} (${newPath})` : newPath);
  } else {
    log("Caminho já existe:", newPath);
  }
}


// Listar caminhos
function listPaths() {
  const config = getConfig();
  log("Caminhos configurados:");

  config.paths.forEach(p => {
    let displayPath, displayName;

    // verifica se é objeto (novo formato)
    if (typeof p === "object") {
      displayPath = p.path;
      displayName = p.name || "";
    } else {
      // antigo formato: apenas string
      displayPath = p;
      displayName = "";
    }

    const namePart = displayName ? `(${displayName})` : "";
    console.log(`- ${namePart}: ${displayPath}`);
  });
}

// Remover caminho ou por path ou por name
function removePath(identifier) {
  const config = getConfig();

  // Converte entradas antigas (string) para objeto
  config.paths = config.paths.map(p => typeof p === "string" ? { path: p, name: "" } : p);

  const initialLength = config.paths.length;

  config.paths = config.paths.filter(p => p.path !== identifier && p.name !== identifier);

  if (config.paths.length < initialLength) {
    saveConfig(config);
    log("Caminho removido:", identifier);
  } else {
    log("Caminho ou nome não encontrado:", identifier);
  }
}


function setDestination(dest) {
  const config = getConfig();
  config.destination = dest;
  saveConfig(config);
  log("Destino definido:", dest);
}

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
