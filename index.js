'use strict';

const ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');
const app = express();
const actionHandler = require('./lib/actions');

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

app.post('/', function (req, res) {

    // call the actions sdk assistant constructor
    const assistant = new ActionsSdkAssistant({request: req, response: res});
    actionHandler.init(req,res,assistant)

});

module.exports = app;

// [END app]
