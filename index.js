require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const socketBuilder = require('./socket');
const socketGatewayService = require('./services/socketGatewayService');
const activeSocketGatewayKafkaConsumer = require('./kafka/consumer');
const healthStatusRoute = require('./utils/eureka/healthStatusRoute');
const connectToDiscoveryServer = require('./utils/configs/discovery');
const router = new require('express').Router();

const PORT = process.env.PORT || 4567;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

activeSocketGatewayKafkaConsumer();
connectToDiscoveryServer();
socketBuilder(io);
socketGatewayService.setSocketIo(io);
healthStatusRoute(router);
app.use(process.env.APP_PATH,router);
server.listen(PORT, () => {
    console.log(`Socket.IO gateway running on port ${PORT}`);
});
