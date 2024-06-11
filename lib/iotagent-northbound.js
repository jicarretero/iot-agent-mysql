iot_agent_lib = undefined;
config = undefined;
southbound = undefined;

function activateIoTAgent(cfg, iotal, sb){
    config = cfg;
    southbound = sb;
    iot_agent_lib = iotal;

    iot_agent_lib.activate(config.iota, function (error) { 
        if (error) { 
            console.log("There was an error activating the IOTA"); 
            process.exit(1); 
        } else { 
            console.log("The IOTA started successfully!!"); 
            iot_agent_lib.setDataQueryHandler(queryContextHandler); 
            iot_agent_lib.setCommandHandler(commandHandler); 
            iot_agent_lib.setProvisioningHandler(deviceProvisioningHandler); // No need here to set another one. 
            iot_agent_lib.setDataUpdateHandler(updateHandler);
            // iot_agent_lib.setConfigurationHandler(configurationHandler); // No need here to set this one. 

            /* iot_agent_lib.addUpdateMiddleware(iot_agent_lib.dataPlugins.attributeAlias.update);
            iot_agent_lib.addUpdateMiddleware(iot_agent_lib.dataPlugins.addEvents.update);
            iot_agent_lib.addUpdateMiddleware(iot_agent_lib.dataPlugins.expressionTransformation.update);
            iot_agent_lib.addUpdateMiddleware(iot_agent_lib.dataPlugins.multiEntity.update);
            iot_agent_lib.addUpdateMiddleware(iot_agent_lib.dataPlugins.timestampProcess.update);
            
            iot_agent_lib.addDeviceProvisionMiddleware(iot_agent_lib.dataPlugins.bidirectionalData.deviceProvision);
            iot_agent_lib.addConfigurationProvisionMiddleware(iot_agent_lib.dataPlugins.bidirectionalData.groupProvision);
            iot_agent_lib.addNotificationMiddleware(iot_agent_lib.dataPlugins.bidirectionalData.notification); */
            
        }
    });
    return iot_agent_lib
}


function deviceProvisioningHandler(device, callback)
{
    console.log('There is a deviceID: ', device )
    southbound.provision_device(device);
    callback(null, device);
}


function updateHandler(id, type, attributes, service, subservice, callback) {
    console.log("updateHandler: ", attributes);
    callback();
}

function queryContextHandler(id, type, service, subservice, attributes, callback) {
    console.log("queryContextHandler:");
    callback(null, response);
}

function commandHandler(deviceId, type, service, subservice, attributes, callback) {
    console.log(deviceId);
    callback();
}

exports.activateIoTAgent = activateIoTAgent