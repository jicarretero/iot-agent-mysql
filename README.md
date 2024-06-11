# Prerequisites
## Orion-ld
We need an Orion-ld server running in order to use this agent. The configuration data for this agent must be in file `config.js` which is pretty self documented.

## MySQL / MariaDB database
The agent will connect to a database to extract data and communicate it with the Orion-ld, so it needs also a database up and running.  Configuration to the database must be set up in `config.js`. For demo purposes we'll use the following configuration:

```
.....
config.mysql = {
      conn: {
         host: '127.0.0.1',
         user: 'aerosdemo',
         password: 'aerosdemo',
         database: 'aerosdemo'
      },
      port: '3306',
      query: 'select pid, vm_name as device_id, pct_cpu, pct_mem, server, observedAt as timestamp from v_vms_info order by pct_cpu, pct_mem'
....
}
```

# Start the Agent

In order to start the Agent we only need to run the command `runthis.sh`. This will start the IoT Agent


