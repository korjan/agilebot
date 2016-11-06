"use strict";
var winston = require('winston');
var db_1 = require("../db");
var schedule = function (team, channel, scheduleText) {
    winston.info(team, channel, scheduleText);
    var question = 'What did you work on yesterday'; // todo : store whole conversation
    db_1.db.storeNextOccurence(team, channel, scheduleText, question);
};
module.exports = {
    schedule: schedule
};
