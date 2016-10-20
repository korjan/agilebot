const winston = require('winston')
const later = require('later');

const notify = (botnet,schedules) => {
  winston.info('Starting notification')
  return schedules
    .find( { occurence: { $lte: new Date() } } )
    .then((occurences) => {
      occurences.forEach((occurence)=>{
        bots.get(occurence.team).send({channel : occurence.channel, message : occurence.message});
      })
    })
}

const startNotifying = (botnet, conf) => {
  const mongoUri = conf.get('mongoUri') || process.env.MONGODB_URI;
  const db = require('monk')(mongoUri);
  const schedules = db.get('schedules');

  setTimeout(()=>{
    notify(botnet, schedules).then(()=>{db.close()});
    startNotifying(botnet, conf)
  }, 5000);
}

module.exports = {
  startNotifying
}
