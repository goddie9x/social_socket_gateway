require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const socketBuilder = require('./socket');
const socketGatewayService = require('./services/socketGatewayService');
const activeSocketGatewayKafkaConsumer = require('./kafka/consumer');

const PORT = process.env.PORT || 4567;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

socketBuilder(io);
socketGatewayService.setSocketIo(io);
activeSocketGatewayKafkaConsumer();
server.listen(PORT, () => {
    console.log(`Socket.IO gateway running on port ${PORT}`);
});
