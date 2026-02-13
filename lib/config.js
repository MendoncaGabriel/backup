const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "../config.json");

function getConfig() {
  const raw = fs.readFileSync(configPath);
  return JSON.parse(raw);
}

function saveConfig(data) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

function addPath(newPath) {
  const config = getConfig();
  config.paths.push(newPath);
  saveConfig(config);
  console.log("Caminho adicionado:", newPath);
}

function listPaths() {
  const config = getConfig();
  console.log("Caminhos configurados:");
  config.paths.forEach(p => console.log("-", p));
}

function removePath(removePath) {
  const config = getConfig();
  config.paths = config.paths.filter(p => p !== removePath);
  saveConfig(config);
  console.log("Caminho removido:", removePath);
}

function setDestination(dest) {
  const config = getConfig();
  config.destination = dest;
  saveConfig(config);
  console.log("Destino definido:", dest);
}

function setSchedule(cron) {
  const config = getConfig();
  config.schedule = cron;
  saveConfig(config);
  console.log("Agendamento definido:", cron);
}

module.exports = {
  getConfig,
  addPath,
  listPaths,
  removePath,
  setDestination,
  setSchedule
};
