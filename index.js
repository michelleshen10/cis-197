const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const verifyWebhook = require('./verify-webhook');
app.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "EAANvEdnaMHQBAF7JMkzPT68GjwhlnbfZAO5VJM817YyQbqZBbvlL9giIhZCFB1MARH9yW0aiBeZApU3FcuP8w365VX9HcmwRMY08LUCNTCZCkZA8w8s6NFdoEUQS15ZBWxEH9digLu8006este05SGSZAAvik9yf7kaNSEVZBosSLTBH9beDaG0ZBTbxIhSxTbpTUZD"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  } else {
    res.sendStatus(403);
  }
});

const messageWebhook = require('./message-webhook');

app.post('/webhook', messageWebhook);

app.listen(5000, () => console.log('Express server is listening on port 5000'));