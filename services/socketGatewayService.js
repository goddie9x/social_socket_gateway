const CHANNELS = require('../utils/constants/socketChannel');
const { TargetNotExistException } = require('../utils/exceptions/commonExceptions');

class SocketGateway {
    setSocketIo(io) {
        this.io = io;
    }
    async handleSocketMessage(payloads) {
        const { namespace, roomId, event, message } = payloads;

        if (!event) {
            const err = `[${new Date().toISOString()}] Error: roomId not provided`;
            throw new TargetNotExistException(err);
        }
        if (!roomId) {
            const err = `[${new Date().toISOString()}] Error: roomId not provided`;
            throw new TargetNotExistException(err);
        }

        if (!namespace) {
            const err = `[${new Date().toISOString()}] Error: Cannot get namespace for ${channel}`;
            throw new TargetNotExistException(err);
        }
        try {
            this.io.of(namespace).to(CHANNELS.NOTIFICATION_CHANNEL.EVENTS.NEW_NOTIFICATION + '-' + roomId).emit(event, message);
        } catch (error) {
            console.log(error);
        }
        return;
    }
}

module.exports = new SocketGateway();