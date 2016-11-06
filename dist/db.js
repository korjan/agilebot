"use strict";
var later = require('later');
var fs = require('fs');
var nconf = require('nconf');
var winston = require('winston');
nconf.argv()
    .env()
    .file({ file: 'settings.json' });
var mongoUri = nconf.get('mongoUri') || process.env.mongoUri;
var monk = require("monk");
function db(collection) {
    return monk(mongoUri).get(collection);
}
exports.db = db;
function storeNextOccurence(team, channel, scheduleText, question) {
    winston.log("inserting team " + team + " channel " + channel + " text " + scheduleText + " q " + question);
    var schedule = later.parse.text(scheduleText); // example: every day at 10am
    var nextOccurence = later.schedule(schedule).next(1);
    return db('schedules')
        .insert({ team: team, channel: channel, schedule: schedule, scheduleText: scheduleText, nextOccurence: nextOccurence, question: question }, function (err, doc) { return console.log(doc); });
}
exports.storeNextOccurence = storeNextOccurence;
