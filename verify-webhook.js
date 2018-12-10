const verifyWebhook = (req, res) => {
    let VERIFY_TOKEN = 'EAANvEdnaMHQBAF7JMkzPT68GjwhlnbfZAO5VJM817YyQbqZBbvlL9giIhZCFB1MARH9yW0aiBeZApU3FcuP8w365VX9HcmwRMY08LUCNTCZCkZA8w8s6NFdoEUQS15ZBWxEH9digLu8006este05SGSZAAvik9yf7kaNSEVZBosSLTBH9beDaG0ZBTbxIhSxTbpTUZD';

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode == 'subscribe' && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
};

module.exports = verifyWebhook;