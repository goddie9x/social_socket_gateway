const CHANNELS = require('../utils/constants/socketChannel');

const listChannelInfo = Object.values(CHANNELS);
const getChannelInfo = (channel) => {
    return listChannelInfo.find(x => x.REDIS_SOCKET_CHANNEL == channel);
}

class SocketGateway {
    setSocketIo(io) {
        this.io = io;
    }
    handleRedisSocketMessage({ channel, roomId, receiverId, event, message }) {
        const channelPrefix = getChannelInfo(channel)?.PREFIX;
        if (!channelPrefix) {
            console.error(`[${new Date().toISOString()}] Error: Cannot get channelPrefix for ${channel}`);
            return;
        }

        const targetRoomId = roomId || receiverId;
        if (!targetRoomId) {
            console.error(`[${new Date().toISOString()}] Error: receiverId or roomId not provided`);
            return;
        }
        const targetEvent = event || 'new';
        this.io.of(channelPrefix).to(targetRoomId).emit(targetEvent, message);
    }
}

module.exports = new SocketGateway();