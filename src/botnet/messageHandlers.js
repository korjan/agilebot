var R = require('ramda');
var winston = require('winston');
var scheduler = require('./../lib/scheduler');
var luis = require('botkit-middleware-luis');
var utils = function (bot, message) {
    var team = bot.identifyTeam();
    var identity = bot.identifyBot();
};
var onMessageReceived = function (bot, message) {
    winston.info('Message received');
    winston.info(message);
};
var onDirectMessageReceived = function (bot, message) {
    winston.info('Direct Message received, scheduling');
    bot.startConversation(message, function (err, conversation) {
        var onTimeResponse = { pattern: 'string', callback: function () { } };
    });
    scheduler.schedule(bot.config._id, message.channel, message.text);
};
var onDirectMentionReceived = function (bot, message) {
    winston.info('Mention received');
    winston.info(message);
    bot.reply(message, 'Mention yourself.');
};
var addHandlers = function (controller, config) {
    var luisOptions = { serviceUri: config.get('luisServiceUri') || process.env.luisServiceUri };
    controller.middleware.receive.use(luis.middleware.receive(luisOptions));
    controller.hears(['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
        bot.reply(message, "Hello.");
    });
    controller.on('message_received', onMessageReceived);
    controller.on('direct_message', onDirectMessageReceived);
    controller.on('direct_mention', onDirectMentionReceived);
    controller.on('mention', function (bot, message) {
        winston.info("Mention received: " + message);
        bot.reply(message, 'I heard you mention me!');
    });
    controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
        winston.info("Hello Message received: " + message);
        bot.reply(message, 'Hello yourself.');
    });
    controller.on('channel_joined', function (bot, message) {
    });
    controller.on('channel_leave', function (bot, message) {
    });
    controller.on('bot_channel_join', function (bot, message) {
    });
    controller.on('user_channel_join', function (bot, message) {
    });
    controller.on('bot_group_join', function (bot, message) {
    });
    controller.on('user_group_join', function (bot, message) {
    });
};
module.exports = {
    addHandlers: addHandlers
};
