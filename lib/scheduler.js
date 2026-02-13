const { runBackup } = require("./runner.js");

let intervalId = null;

exports.startInterval = (days = 1) => {
  const ms = days * 24 * 60 * 60 * 1000;

  console.log(`Backup a cada ${days} dia(s).`);

  runBackup();

  intervalId = setInterval(() => {
    runBackup();
  }, ms);
};

exports.stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("Agendamento parado.");
  }
};
