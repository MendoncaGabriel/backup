#!/usr/bin/env node

const { program } = require("commander");
const { runBackup } = require("../lib/runner.js");
const { addPath, listPaths, removePath, setDestination, setSchedule } = require("../lib/config.js");
const { startScheduler } = require("../lib/scheduler.js");

program
  .command("run")
  .description("Executar backup manualmente")
  .action(runBackup);

program
  .command("add <path>")
  .description("Adicionar novo caminho para backup")
  .action(addPath);

program
  .command("remove <path>")
  .description("Remover caminho do backup")
  .action(removePath);

program
  .command("list")
  .description("Listar caminhos configurados")
  .action(listPaths);

program
  .command("dest <path>")
  .description("Definir destino base do backup")
  .action(setDestination);

program
  .command("schedule <cron>")
  .description("Definir agendamento (formato cron)")
  .action(setSchedule);

program
  .command("start")
  .description("Iniciar agendador")
  .action(startScheduler);

program
  .command("interval <days>")
  .description("Executar backup a cada X dias")
  .action((days) => {
    require("../lib/scheduler").startInterval(parseInt(days));
  });

program
  .command("logs")
  .description("Exibir todos os logs de backup")
  .action(() => {
    const { getLogs } = require("../lib/logger");
    console.log(getLogs());
  });

program
  .command("clear-logs")
  .description("Limpar o arquivo de logs de backup")
  .action(() => {
    const { clearLogs, log } = require("../lib/logger");
    if (clearLogs()) {
      console.log("Logs limpos com sucesso.");
      log("Logs limpos manualmente."); // opcional, registra que limpou
    } else {
      console.log("Nenhum log encontrado para limpar.");
    }
  });

program.parse();
