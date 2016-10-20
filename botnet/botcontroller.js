const Botkit = require('botkit');
const messageHandlers = require('./messageHandlers.js');

const configure = (config) => {
  const mongoUri = config.get('mongoUri') || process.env.MONGODB_URI;
  const mongoStorage = require('botkit-storage-mongo')({
    mongoUri: mongoUri,
  });

  const controller = Botkit.slackbot({
    debug: false,
    storage : mongoStorage,
  });

  controller.configureSlackApp({
    clientId: config.get('clientId') || process.env.clientId,
    clientSecret: config.get('clientSecret') || process.env.clientSecret,
    scopes: ['bot']
  })
  .setupWebserver(config.get('port') || process.env.port, (err,webserver) => {
    webserver.get('/', (req, res) => res.send('Howdy'));
    webserver.post('/slap', (req, res) => console.log('Slap'));
  })
  .createOauthEndpoints(controller.webserver, (err,req,res) => {
    err ?
      res.status(500).send('ERROR: ' + err) :
      res.send('Success!')
  })
  .createWebhookEndpoints(controller.webserver);

  messageHandlers.addHandlers(controller);

  return controller;
}

module.exports = {
  configure,
}
