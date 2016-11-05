"use strict";
var later = require('later');
var db_1 = require("../db");
var schedule = function (team, channel, scheduleText) {
    console.log(team, channel, scheduleText);
    var schedule = later.parse.text('every 15 seconds');
    var nextOccurence = later.schedule(schedule).next(1);
    var question = 'What did you work on yesterday'; //
    console.log("inserting team " + team + " channel " + channel + " text " + scheduleText + " next " + nextOccurence + " q " + question);
    db_1.db('schedules')
        .insert({ team: team, channel: channel, schedule: schedule, scheduleText: scheduleText, nextOccurence: nextOccurence, question: question }, function (doc) { return console.log(doc); });
};
module.exports = {
    schedule: schedule
};
