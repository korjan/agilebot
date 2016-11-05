var R = require('ramda');
var winston = require('winston');
var scheduler = require('./../lib/scheduler');
var luis = require('botkit-middleware-luis');
var utils = function (bot, message) {
    var team = bot.identifyTeam(); // returns team id
    var identity = bot.identifyBot(); // returns object with {name, id, team_id}
};
var onMessageReceived = function (bot, message) {
    winston.info('Message received');
    winston.info(message);
};
// const onDMReceived = (bot, message) => {
//   winston.info('Direct Message received');
//   winston.info(message.channel);
//   scheduler.schedule(message.text, message.team, message.channel);
//   console.log('controller', controller, bot.controller);
//   bot.reply(message,'Hello yourself.');
// }
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
    // reply to any incoming message
    controller.on('message_received', onMessageReceived);
    // reply to a direct message
    controller.on('direct_message', function (bot, message) {
        winston.info('Direct Message received, scheduling');
        scheduler.schedule(bot.config._id, message.channel, message.text);
    });
    // reply to a direct mention - @bot hello
    controller.on('direct_mention', onDirectMentionReceived);
    controller.on('mention', function (bot, message) {
        winston.info("Mention received: " + message);
        bot.reply(message, 'I heard you mention me!');
    });
    // give the bot something to listen for.
    controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
        winston.info("Hello Message received: " + message);
        bot.reply(message, 'Hello yourself.');
    });
    // controller.on('ambient',function(bot,message) {
    // });
    controller.on('channel_joined', function (bot, message) {
        // message contains data sent by slack
        // in this case:
        // https://api.slack.com/events/channel_joined
    });
    controller.on('channel_leave', function (bot, message) {
        // message format matches this:
        // https://api.slack.com/events/message/channel_leave
    });
    // the bot has joined a channel
    controller.on('bot_channel_join', function (bot, message) {
    });
    // a user has joined a channel
    controller.on('user_channel_join', function (bot, message) {
    });
    // the bot has joined a group
    controller.on('bot_group_join', function (bot, message) {
    });
    // a user has joined a group
    controller.on('user_group_join', function (bot, message) {
    });
};
module.exports = {
    addHandlers: addHandlers
};
