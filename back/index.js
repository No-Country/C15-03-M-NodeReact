require('dotenv').config({path:'.env'})
const Server = require("./models/Server");

const server = new Server()

server.listen()