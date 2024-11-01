# Socket Gateway

The `socket_gateway` is a Node.js microservice that acts as a WebSocket gateway for real-time communication in a social media application. It registers with Eureka for service discovery and integrates with Kafka for messaging.

To view all services for this social media system, lets visit: `https://github.com/goddie9x?tab=repositories&q=social`

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

## Setup

### 1. Clone the Repository

Clone the `socket_gateway` repository and its required utilities:

```bash
git clone https://github.com/goddie9x/socket_gateway.git
cd socket_gateway
```

### 2. Clone Utility Package

Clone the required `social_utils` package as a subdirectory in the project root:

```bash
git clone https://github.com/goddie9x/social_utils.git utils
```

### 3. Configuration

Set up environment variables in a `.env` file in the root directory with the following configuration:

```dotenv
APP_NAME=socket-gateway
PORT=3005
KAFKA_CLIENT_HOST=localhost:9092
JWT_SECRET=<your-jwt-secret> # replace with your actual JWT secret
EUREKA_DISCOVERY_SERVER_HOST=localhost
EUREKA_DISCOVERY_SERVER_PORT=8761
IP_ADDRESS=socket-gateway
HOST_NAME=socket-gateway
APP_PATH=/api/v1/socket-gateway
```

Make sure to replace `<your-jwt-secret>` with your actual JWT secret.

## Package Installation

Ensure dependencies are installed by running:

```bash
npm install
```

## Running the Service Locally

To start the service locally:

```bash
npm start
```

The service will run on `http://localhost:3005` by default.

## Running with Docker

1. **Dockerfile**:

   Create a `Dockerfile` in the project root with the following content:

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /usr/src/app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 3005
   CMD ["npm", "start"]
   ```

2. **Build and Run the Docker Container**:

   Build and start the Docker container:

   ```bash
   docker build -t socket-gateway .
   docker run -p 3005:3005 --env-file .env socket-gateway
   ```

## Running with Docker Compose

To run `socket_gateway` within a Docker Compose setup, include the following service definition:

```yaml
socket-gateway:
  image: socket-gateway
  build:
    context: .
  ports:
    - 3005:3005
  environment:
    - APP_NAME=socket-gateway
    - PORT=3005
    - KAFKA_CLIENT_HOST=localhost:9092
    - JWT_SECRET=<your-jwt-secret> # replace with your actual JWT secret
    - EUREKA_DISCOVERY_SERVER_HOST=localhost
    - EUREKA_DISCOVERY_SERVER_PORT=8761
    - IP_ADDRESS=socket-gateway
    - HOST_NAME=socket-gateway
    - APP_PATH=/api/v1/socket-gateway
  networks:
    - social-media-network
```

Start all services with Docker Compose:

```bash
docker-compose up --build
```

## Accessing the Service

Once running, the `socket_gateway` will be available at `http://localhost:3005/api/v1/socket-gateway`.

---

This setup will help you start, configure, and deploy the `socket_gateway` service in both local and containerized environments.

### Useful Commands

- **Stop Containers**: Use `docker-compose down` to stop all services and remove the containers.
- **Restart Containers**: Run `docker-compose restart` to restart the services without rebuilding the images.

This setup enables seamless orchestration of the social media microservices with an API Gateway for managing external client requests.

## Contributing

Contributions are welcome. Please clone this repository and submit a pull request with your changes. Ensure that your changes are well-tested and documented.

## License

This project is licensed under the MIT License. See `LICENSE` for more details.