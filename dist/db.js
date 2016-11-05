"use strict";
var fs = require('fs');
var nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: 'settings.json' });
var mongoUri = nconf.get('mongoUri') || process.env.mongoUri;
var monk = require("monk");
function db(collection) {
    return monk(mongoUri).get(collection);
}
exports.db = db;
;
