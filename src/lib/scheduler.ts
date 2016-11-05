const winston = require('winston');

import {db} from "../db";

var schedule = (team: string, channel: string, scheduleText: string) => {
  winston.info(team, channel, scheduleText);
  const question = 'What did you work on yesterday'; // todo : store whole conversation

  db.storeNextOccurence(team, channel, scheduleText, question);
}

module.exports = {
  schedule,
}
