const { runBackup } = require("./runner.js");
const { log } = require("./logger.js");

let intervalId = null;

exports.startInterval = (days = 1) => {
  const ms = days * 24 * 60 * 60 * 1000;

  console.log(`Backup agendado a cada ${days} dia(s).`);
  log(`Agendamento iniciado: backup a cada ${days} dia(s)`);

  // Executa imediatamente com log automático
  runBackup(true).catch(err => log(`Erro no backup agendado: ${err.message}`));

  // Executa no intervalo definido
  intervalId = setInterval(() => {
    runBackup(true).catch(err => log(`Erro no backup agendado: ${err.message}`));
  }, ms);
};

exports.stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Agendamento parado.");
    log("Agendamento parado.");
  }
};
