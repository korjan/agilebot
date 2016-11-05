"use strict";
var winston = require("winston");
var fs = require('fs');
var nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: 'settings.json' });
var botcontroller = require('./botnet/botcontroller');
var notifier = require('./lib/notifier');
var skynet = {};
var controller = botcontroller.configure(nconf);
controller.on('create_bot', function (bot) {
    trackBot(bot);
});
var startBots = function (controller) {
    controller
        .storage
        .teams
        .all(function (err, teams) { return err ?
        winston.warn('Error retrieving from storage', err) :
        teams.forEach(function (team) { return trackBot(controller.spawn(team)); }); });
    notifier.startNotifying(controller);
};
var trackBot = function (bot) {
    bot.startRTM(function (err, bot) { return err ?
        winston.warn('Error starting RTM', err) :
        winston.info('Bot created'); });
    skynet[bot.config._id] = bot;
};
startBots(controller);
