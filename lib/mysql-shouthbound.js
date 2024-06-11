/**
 * Node js library connecting to MySQL. It will retrieve data from the database
 * and will push it to IoTAgent.
 */
config = {}
entities = {};
values = {};
conn = undefined;
iotagent_lib = undefined;
let startQueryLoop = undefined;
var mysql = require('mysql');

function add_entity(data) {
    if (!entities[data.name]) {
        entities[data.name] = data;
    }
}

function mysql_connect(cfg, iotal) {
    iotagent_lib = iotal;
    config = cfg;
    conn = mysql.createConnection(config.mysql.conn);

    conn.connect(function(err) {
        if (err) throw(err);
        query_function(); 
        startQueryLoop = setInterval(() => {query_function();}, 20000);
    });
}

function update_cb_data(sql_result) {
    entities_keys = Object.keys(entities);
    n_entities = entities_keys.length;
    for  (var i=0; i < n_entities; i++) {
        o = sql_result.find(o => o.device_id === entities_keys[i]);
        if (o) {
            apiKey = '';
            devId = o.device_id;
            for (j=0;j<values[devId].length; j++) {
                v = values[devId][j];
                v.value = o[ v.name ];
            }
            device = entities[entities_keys[i]]
            v = values[o.device_id];
            console.log('*********** O **********:', v);
            iotagent_lib.update(device.name, device.type,
                apiKey, v, device, function (error) {
                    if (error) {
                        console.log('Something went wrong updating device');
                        console.log(error);
                    } else {
                        console.log(`communicated message:`);
                    }
                });
        }
    }
    console.log('update_cb_data');
}

function query_function() {
    if (conn) {
        conn.query(config.mysql.query, function (err, result) {
            if (err) throw err;
            // console.log("Result: " + JSON.stringify(result));
            update_cb_data(result);
        });
    }
}

function provision_device(device) {
    var devId = device.id;
    entities[devId] = device;
    values[devId] = [];

    try {
        for (att of device.active) {
            values[devId].push({type:att.type, name:att.name, value:''});
        }
    } catch(e) {
        console.log(e);
    }


    console.log("Entties: " + JSON.stringify(entities[devId]));
    console.log("Entties: " + JSON.stringify(values[devId]));
}

exports.mysql_connect = mysql_connect
exports.provision_device = provision_device