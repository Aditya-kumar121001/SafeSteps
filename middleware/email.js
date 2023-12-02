const { CourierClient } = require("@trycourier/courier");
const courier = new CourierClient({authorizationToken: process.env.EMAIL});

async function emailNoti() {
    // Example: send a message
    const { requestId } = await courier.send({
      message: {
        content: {
          title: "Welcome to SafeSteps",
          body: "Want to know your current status? {{status}}"
        },
        data: {
          status: "You are not safe"
         },
        to: {
          email: "sagaricagupta99@gmail.com"
        }
      },
    });
  }

module.exports = {emailNoti}