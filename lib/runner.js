const fs = require("fs");
const pathModule = require("path");
const { getConfig } = require("./config.js");
const { log } = require("./logger.js");
const { spawn } = require("child_process");

exports.runBackup = async () => {
  const config = getConfig();
  const destination = config.destination;

  if (!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive: true });

  for (const p of config.paths) {
    // converte strings antigas para objeto
    const path = typeof p === "string" ? p : p.path;
    const name = typeof p === "object" ? (p.name || pathModule.basename(path)) : pathModule.basename(path);

    const destPath = pathModule.join(destination, name);

    try {
      log(`Iniciando backup: ${path} -> ${destPath}`);

      // Usar spawn para mostrar progresso em tempo real
      await runRsync(path, destPath);

      log(`Backup concluído: ${path}`);
    } catch (err) {
      log(`Erro no backup de ${path}: ${err.message}`);
    }
  }
};

// Função para executar o rsync com progresso
function runRsync(source, dest) {
  return new Promise((resolve, reject) => {
    const rsync = spawn("rsync", ["-aAX", "--delete", "--info=progress2", source, dest]);

    // Captura o progresso e exibe no terminal
    rsync.stdout.on("data", data => process.stdout.write(data.toString()));
    rsync.stderr.on("data", data => process.stderr.write(data.toString()));

    rsync.on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`rsync exited with code ${code}`));
      }
    });
  });
}
