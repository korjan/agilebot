"use strict";
var winston = require('winston');
var later = require('later');
var db_1 = require("../db");
var nextOccurencesQuery = { nextOccurence: { $lte: new Date() } };
var sendMessageToTeam = function (controller, team, message) {
    winston.info('sending message to', team, message);
    controller.storage.teams.get(team, function (err, bot) {
        if (bot) {
            bot.startConversation(message, function (err, convo) {
                convo.ask('How are you?', function (response, convo) {
                    convo.say('Cool, you said: ' + response.text);
                    convo.next();
                });
            });
        }
        else {
            console.log('no bot');
        }
    });
};
var notify = function (controller) {
    winston.info('Starting notification for bots');
    var schedules = db_1.db('schedules');
    schedules
        .find({ nextOccurence: { $lte: new Date() } })
        .each(function (occurence) {
        winston.info('Notifying ', occurence);
        sendMessageToTeam(controller, occurence.team, 'BOO');
        schedules.remove({ team: occurence.team, nextOccurence: occurence.nextOccurence }, function (err, doc) {
            console.log(err, doc, 'removed');
        });
    });
};
var startNotifying = function (controller) {
    notify(controller);
    setTimeout(function () {
        startNotifying(controller);
    }, 10000);
};
module.exports = {
    startNotifying: startNotifying
};
