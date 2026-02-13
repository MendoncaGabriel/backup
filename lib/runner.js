const { exec } = require("child_process");
const config = require("./config").getConfig;

exports.runBackup = async () => {
  const { paths, destination } = config();

  for (const path of paths) {
    const name = path.split("/").filter(Boolean).join("_");
    const cmd = `rsync -aAX --delete ${path}/ ${destination}/${name}/`;

    console.log("Executando:", cmd);

    await new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  console.log("Backup concluído.");
};
