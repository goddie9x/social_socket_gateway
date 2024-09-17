const messageSocketBuilder = require('../utils/sockets/message');
const notificationSocketBuilder = require('../utils/sockets/notification');

const socketBuilder = (io) => {
    notificationSocketBuilder(io);
    messageSocketBuilder(io);
}

module.exports = socketBuilder;