const fs = require("fs");
const pathModule = require("path");
const { getConfig } = require("./config.js");
const { log } = require("./logger.js");
const { execSync } = require("child_process");

exports.runBackup = () => {
  const config = getConfig();
  const destination = config.destination;

  if (!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive: true });

  config.paths.forEach(p => {
    // converte strings antigas para objeto
    const path = typeof p === "string" ? p : p.path;
    const name = typeof p === "object" ? (p.name || pathModule.basename(path)) : pathModule.basename(path);

    const destPath = pathModule.join(destination, name);

    try {
      log(`Iniciando backup: ${path} -> ${destPath}`);
      // comando rsync recursivo
      execSync(`rsync -aAX --delete "${path}" "${destPath}"`);
      log(`Backup concluído: ${path}`);
    } catch (err) {
      log(`Erro no backup de ${path}: ${err.message}`);
    }
  });
};
