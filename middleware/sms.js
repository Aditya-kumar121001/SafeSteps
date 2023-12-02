const accountSid = process.env.accountSid
const authToken = process.env.authToken

const client = require('twilio')(accountSid, authToken);
 
const sms = client.messages
    .create({
        body: 'You are out of the safe zone!',
        from: '+15615134540',
        to: '+919113021175'
    }).then(message => console.log(message.sid))

module.exports = {sms}