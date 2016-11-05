var Botkit = require('botkit');
var messageHandlers = require('./messageHandlers.js');
var configure = function (config) {
    var mongoUri = config.get('mongoUri') || process.env.MONGODB_URI;
    var mongoStorage = require('botkit-storage-mongo')({
        mongoUri: mongoUri
    });
    var controller = Botkit.slackbot({
        debug: false,
        storage: mongoStorage
    });
    controller.configureSlackApp({
        clientId: config.get('clientId') || process.env.clientId,
        clientSecret: config.get('clientSecret') || process.env.clientSecret,
        redirectUri: config.get('redirectUri') || process.env.redirectUri,
        scopes: ['bot']
    })
        .setupWebserver(process.env.PORT || config.get('port'), function (err, webserver) {
        webserver.get('/', function (req, res) { return res.send('Howdy'); });
        webserver.post('/slap', function (req, res) { return console.log('Slap'); });
    })
        .createOauthEndpoints(controller.webserver, function (err, req, res) {
        err ?
            res.status(500).send('ERROR: ' + err) :
            res.send('Success!');
    })
        .createWebhookEndpoints(controller.webserver);
    messageHandlers.addHandlers(controller, config);
    return controller;
};
module.exports = {
    configure: configure
};
