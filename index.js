const log = require('logops')
const config = require('./config.js');
const mysql = require('./lib/mysql-shouthbound.js');
const iota = require('./lib/iotagent-northbound.js');
const iot_agent_lib = require('iotagent-node-lib');


function start() {
    console.log('Hola majo!');

    // Connect to MySQL
    mysql.mysql_connect(config, iot_agent_lib);

    // Create IoT Agent
    iota_lib = iota.activateIoTAgent(config, iot_agent_lib, mysql);
}

start();