// import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
var later = require('later');
const fs    = require('fs')
const nconf = require('nconf');
const winston = require('winston');

nconf.argv()
 .env()
 .file({ file: 'settings.json' });

const mongoUri = nconf.get('mongoUri') || process.env.mongoUri;
import * as monk from "monk";

export function db(collection: string) : monk.Collection{
  return monk(mongoUri).get(collection);
}

export function storeNextOccurence(team : string, channel: string, scheduleText : string, question : string){
  winston.log(`inserting team ${team} channel ${channel} text ${scheduleText} q ${question}`);
  const schedule = later.parse.text(scheduleText); // example: every day at 10am
  const nextOccurence = later.schedule(schedule).next(1);

  return db('schedules')
    .insert({ team, channel, schedule, scheduleText, nextOccurence, question }, (err,doc)=>console.log(doc));
}
