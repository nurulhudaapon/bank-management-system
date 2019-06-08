const { sendFacebookMessage } = require('../utils/messangerBot');
const express = require('express');
const router = express.Router();

const { Account } = require('../models/account');
const { Customer } = require('../models/customer');


router.use(express.json());

router.get('/webhook/facebook', (req, res) => {
    let VERIFY_TOKEN = "bp"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            res.status(200).send(challenge);
        } else {
            res.status(404).send('Invalid request');
        }
    }
});

router.post('/webhook/facebook', (req, res) => {
    let body = req.body;
    if (body.object === 'page') {
        body.entry.forEach(function (entry) {
            let webhook_event = entry.messaging[0];
            // console.log(webhook_event);

            async function replayMessage() {
                if (webhook_event.message && !webhook_event.message.app_id) {
                    if (webhook_event.message.text && webhook_event.message.text.length == 6) {
                        const result = await Account.findOne({ acn: webhook_event.message.text });

                        sendFacebookMessage(webhook_event.sender.id, `Your account (ACN: ${result.acn}, Name: ${result.name}) balance is: ${result.current} Taka.`);
                        return;
                    }
                    // if (webhook_event.message.quick_reply) {}
                    if (webhook_event.message.text && webhook_event.message.text.split(' ')[0] == 'SPN') {
                        const customer = await Customer.updateOne({ id: webhook_event.message.text.split(' ')[1] }, {
                            $set: {
                                facebook: { psid: webhook_event.sender.id }
                            }
                        }, { new: true });
                        console.log(webhook_event.message.text.split(' ')[1], customer);
                        
                        sendFacebookMessage(webhook_event.sender.id, `You will be recieving notification for the account bellow:
                        Name: ${customer.name}, 
                        ID: ${customer.id},
                        FB PSID: ${customer.psid}`);
                        console.log('SPN REG');

                        return;
                    }
                    // if (webhook_event.message.quick_reply) {}
                    sendFacebookMessage(webhook_event.sender.id, "Thank you for messaging us. What do you want to know from us? If you want to know your account balance just send your account number.");
                }
            }
            replayMessage();
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.status(404).send('Invalid request');
    }
});

module.exports = router;