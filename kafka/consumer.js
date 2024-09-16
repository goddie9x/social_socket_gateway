const { activeServiceConsumer } = require('../utils/kafka/consumer');
const { KAFKA_TOPICS } = require('../utils/constants/kafka');
const socketGatewayService = require('../services/socketGatewayService');

const activeSocketGatewayKafkaConsumer = async ()=>{
    activeServiceConsumer({
        topic: KAFKA_TOPICS.SOCKET_GATEWAY_TOPIC.REQUEST,
        serviceInstance: socketGatewayService
    });
}

module.exports = activeSocketGatewayKafkaConsumer;