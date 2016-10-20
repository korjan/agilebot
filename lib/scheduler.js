const later = require('later');
const fs    = require('fs')
const nconf = require('nconf');

nconf.argv()
 .env()
 .file({ file: 'settings.json' });

const mongoUri = nconf.get('mongoUri') || process.env.mongoUri;

const schedule = (team, channel, schedule) => {
  const db = require('monk')(mongoUri)
  const schedules = db.get('schedules')

  const sched = later.parse.text('every 15 seconds');
  const occurrences = later.schedule(sched).next(1);
  const nextOccurence = occurrences[0];

  schedules.index('team channel');
  schedules.insert({ team: team, channel : channel, schedule: schedule, text : text, nextOccurence : nextOccurence});
  db.close();
}

module.exports = {
  schedule,
}
