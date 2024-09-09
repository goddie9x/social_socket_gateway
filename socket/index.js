const authSocketMiddleware = require('../utils/middlewares/authSocketMiddleware');
const notificationSocketBuilder = require('../utils/sockets/notification');
const messageSocketBuilder = require('../utils/sockets/message');

const socketBuilder = (io) => {
    io.use(authSocketMiddleware);
    notificationSocketBuilder(io);
    messageSocketBuilder(io);
}

module.exports = socketBuilder;