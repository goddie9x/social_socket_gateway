const { activeServiceConsumer, createTopicIfNotExists } = require('../utils/kafka/consumer');
const { KAFKA_TOPICS } = require('../utils/constants/kafka');
const socketGatewayService = require('../services/socketGatewayService');

const activeSocketGatewayKafkaConsumer = async () => {
    await createTopicIfNotExists([{ topic: KAFKA_TOPICS.SOCKET_GATEWAY_TOPIC.REQUEST }]);
    activeServiceConsumer({
        topic: KAFKA_TOPICS.SOCKET_GATEWAY_TOPIC.REQUEST,
        serviceInstance: socketGatewayService
    });
}

module.exports = activeSocketGatewayKafkaConsumer;