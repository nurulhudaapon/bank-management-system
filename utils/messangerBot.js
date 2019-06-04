const request = require('request');
const config = require('config');
function sendFacebookMessage (id, messageText) {
    let message = {
    url: "https://graph.facebook.com/v2.6/me/messages?access_token="+ config.get('facebook.access_token'),
    body: {
        "recipient":{
            
          "id": id
        },
        "message":{
          "text": messageText
        }
      },
    headers: {
        'Content-Type': 'application/json'
      },
      json: true
};
function callback(error, response, body) {
    console.log(body);

}
request.post(message, callback);
}
exports.sendFacebookMessage = sendFacebookMessage;
// sendFacebookMessage("2207807745965356", "How are you?");

