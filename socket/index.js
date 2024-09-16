const notificationSocketBuilder = require('../utils/sockets/notification');
const messageSocketBuilder = require('../utils/sockets/message');

const socketBuilder = (io) => {
    notificationSocketBuilder(io);
    messageSocketBuilder(io);
}

module.exports = socketBuilder;