const winston = require('winston')
const later = require('later')
import {db} from "../db";

const nextOccurencesQuery = { nextOccurence: { $lte: new Date() } };

const sendMessageToTeam = (controller, team : string, message : string) => {
  winston.info('sending message to', team, message);
  controller.storage.teams.get(team, (err, bot) => {
    // start a conversation to handle this response.
    if (bot) {
      bot.startConversation(message,function(err,convo) {
        convo.ask('How are you?',function(response,convo) {
          convo.say('Cool, you said: ' + response.text);
          convo.next();
        });
      })
    } else {
      console.log('no bot')
    }
  });
}
// todo: db.close does not get called when there are no occurences
// todo: implementation by monk .each does not match typescript signature .succes
const notify = (controller) => {
  winston.info('Starting notification for bots')
  const schedules = db('schedules');
    schedules
    .find({ nextOccurence: { $lte: new Date() } })
    .each((occurence)=>{
      winston.info('Notifying ', occurence)
      sendMessageToTeam(controller, occurence.team, 'BOO');

      schedules.remove({team : occurence.team, nextOccurence : occurence.nextOccurence}, (err, doc)=>{
          console.log(err, doc, 'removed');
        })
    })
}

const startNotifying = (controller) => {

  notify(controller);

  setTimeout(()=>{
    startNotifying(controller)
  }, 10000)
}

module.exports = {
  startNotifying
}
