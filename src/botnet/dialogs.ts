var builder = require('botbuilder');
var intents = new builder.IntentDialog();

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

export function addDialogs(bot: bot) {
    bot.dialog('/', intents);
    bot.dialog('/profile', [
        function (session) {
            builder.Prompts.text(session, 'Hi! What is your name?');
        },
        function (session, results) {
            session.userData.name = results.response;
            session.endDialog();
        }
    ]);
}