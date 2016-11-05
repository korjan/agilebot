import * as winston from "winston";
const fs    = require('fs')
const nconf = require('nconf');

nconf.argv()
 .env()
 .file({ file: 'settings.json' });

const botcontroller = require('./botnet/botcontroller');
const notifier = require('./lib/notifier');

const skynet = {};
const controller = botcontroller.configure(nconf);

controller.on('create_bot', (bot) => {
  trackBot(bot);
});

const startBots = (controller) => {
  controller
    .storage
    .teams
    .all((err,teams) => err ?
      winston.warn('Error retrieving from storage',err) :
      teams.forEach(team => trackBot(controller.spawn(team)))
    );
  notifier.startNotifying(controller)
}

const trackBot = (bot) => {
  bot.startRTM((err, bot) => err ?
    winston.warn('Error starting RTM', err) :
    winston.info('Bot created')
  );
  skynet[bot.config._id] = bot;
}

startBots(controller);
