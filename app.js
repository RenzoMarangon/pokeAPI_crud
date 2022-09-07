require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const Server = require("./models/server");
const server = new Server;
server.listen();