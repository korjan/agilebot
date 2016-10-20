const winston = require('winston')
const fs    = require('fs')
const nconf = require('nconf');

nconf.argv()
 .env()
 .file({ file: 'settings.json' });

const botcontroller = require('./botnet/botcontroller');
const notifier = require('./lib/notifier');

const skynet = [];
const controller = botcontroller.configure(nconf);

controller.on('create_bot', (bot) => {
  trackBot(bot);
});

const startBots = (controller) => {
  controller
    .storage
    .teams
    .all((err,teams) => err ?
      winston.warning('Error retrieving from storage',err) :
      teams.forEach(team => trackBot(controller.spawn(team)))
    );
}

const trackBot = (bot) => {
  bot.startRTM((err) => err ?
    winston.warning('Error starting RTM', err) :
    winston.info('Bot created')
  );
  skynet.push[bot];
}

startBots(controller);
notifier.startNotifying(skynet, nconf);
