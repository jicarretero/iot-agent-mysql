#!/bin/bash

[ -z $dev_id ] && exit 1

set -x

curl -iX POST \
  'http://192.168.3.253:4041/iot/devices' \
  -H 'Content-Type: application/json' \
  -H 'fiware-service: openiot' \
  -H 'fiware-servicepath: /' \
  -d "{
    \"devices\": [
        {
            \"device_id\": \"$dev_id\",
            \"entity_name\": \"urn:ngsi-ld:demosql:$dev_id\",
            \"entity_type\": \"mysqldemo\",
            \"transport\": \"HTTP\",
	    \"apikey\": \"4jggokgpepnvsb2uv4s40d59ov\",
            \"attributes\": [
                  {
                    \"object_id\": \"device_id\", \"type\": \"Property\", \"name\": \"device_id\"
                  },
                  {
                    \"object_id\": \"pid\", \"name\": \"pid\", \"type\": \"Property\"
                  },
                  {
                   \"object_id\": \"pct_cpu\", \"name\": \"pct_cpu\", \"type\": \"Property\"
                  }, 
                  {
                   \"object_id\": \"pct_mem\", \"name\": \"pct_mem\", \"type\": \"Property\"
                  }, 
                  {
                   \"object_id\": \"server\", \"name\": \"server\", \"type\": \"Property\"
                  },
                  {
                   \"object_id\": \"timestamp\", \"name\": \"timestamp\", \"type\": \"timestamp\"
                  }
            ]
        }
    ]
}"

set +x 
