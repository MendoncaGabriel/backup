const { exec } = require("child_process");
const { getConfig } = require("./config.js");

exports.runBackup = async () => {
  const { paths, destination } = getConfig();

  if (!destination) {
    console.error("Destino não configurado.");
    return;
  }

  for (const path of paths) {
    const name = path.split("/").filter(Boolean).join("_");
    const cmd = `rsync -aAX --delete ${path}/ ${destination}/${name}/`;

    console.log("Executando:", cmd);

    await new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          console.error(stderr);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  console.log("Backup concluído.");
};
