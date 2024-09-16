const CHANNELS = require('../utils/constants/socketChannel');
const {TargetNotExistException} = require('../utils/exceptions/commonExceptions');

const listChannelInfo = Object.values(CHANNELS);
const getChannelInfo = (namespace) => {
    return listChannelInfo.find(x => x.NAMESPACE == namespace);
}

class SocketGateway {
    setSocketIo(io) {
        this.io = io;
    }
    handleRedisSocketMessage(payloads) {
        console.log('14',payloads);

        const { namespace, roomId, event, message } = payloads;
        if(!event){
            const err = `[${new Date().toISOString()}] Error: roomId not provided`;
            console.error(err);

            throw new TargetNotExistException(err);
        }
        if (!roomId) {
            const err = `[${new Date().toISOString()}] Error: roomId not provided`;
            console.error(err);
            throw new TargetNotExistException(err);
        }
        const channelPrefix = getChannelInfo(namespace)?.PREFIX;
        
        if (!channelPrefix) {
            const err = `[${new Date().toISOString()}] Error: Cannot get channelPrefix for ${channel}`;
            console.error(err);
            throw new TargetNotExistException(err);
        }

        console.log(payloads);


        this.io.of(channelPrefix).to(roomId).emit(event, message);
    }
}

module.exports = new SocketGateway();