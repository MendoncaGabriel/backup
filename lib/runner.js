const { exec } = require("child_process");
const { getConfig } = require("./config.js");
const { log } = require("./logger.js");

exports.runBackup = async (automatic = false) => {
  const { paths, destination } = getConfig();

  for (const path of paths) {
    const name = path.split("/").filter(Boolean).join("_");
    const cmd = `rsync -aAX --delete ${path}/ ${destination}/${name}/`;

    if (automatic) log(`Iniciando backup de ${path}`);

    await new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          if (automatic) log(`Erro ao fazer backup de ${path}: ${err.message}`);
          reject(err);
        } else {
          if (automatic) log(`Backup concluído de ${path}`);
          resolve();
        }
      });
    });
  }

  if (automatic) log("Backup finalizado com sucesso.");
};
