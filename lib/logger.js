const fs = require("fs");
const path = require("path");

const logFile = path.resolve(__dirname, "../log.txt");

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace("T", " ").substring(0, 19);
}

function log(message) {
  const line = `[${getTimestamp()}] ${message}\n`;
  fs.appendFileSync(logFile, line);
}

function getLogs() {
  if (!fs.existsSync(logFile)) {
    return "Nenhum log encontrado.";
  }
  return fs.readFileSync(logFile, "utf8");
}

function clearLogs() {
  if (fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, ""); // limpa o conteúdo
    return true;
  }
  return false;
}

module.exports = { log, getLogs, clearLogs };
