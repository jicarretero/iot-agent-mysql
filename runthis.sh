export IOTA_JSON_LD_CONTEXT="http://context/ngsi-context.jsonld"
export IOTA_CB_NGSI_VERSION="ld"

curl localhost:1026/version 2>&1 > /dev/null | ssh -N -f -o ServerAliveInterval=30 -L 3306:127.0.0.1:3306 ${whoever}@${wherever}

node index.js
