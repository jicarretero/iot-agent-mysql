# Query database

## Database connection
In some cases, we'd like to stablish a tunnel with the database (just for demo purposes) - 

```
ssh -N -f -o ServerAliveInterval=30 -L 3306:127.0.0.1:3306 ${whoever}@${wherever}
```


Now, after stablishing the tunnel, I can query the database. In demo purposes, this is the data I have:

```
mysql -h127.0.0.1 -u aerosdemo -paerosdemo aerosdemo -e 'select * from v_vms_info order by pct_cpu, pct_mem'
+-------+--------------------------------------+---------+---------+----------------------+---------------------+
| pid   | vm_name                              | pct_cpu | pct_mem | server               | observedAt          |
+-------+--------------------------------------+---------+---------+----------------------+---------------------+
| 25619 | 8a0ad0ef-1827-42a4-ae42-685a478e6dad |       0 |     1.3 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 22907 | 8f28f8bb-5204-4d2e-88cb-eb5408dd3ca2 |       0 |     1.4 | datacentr-compute-02 | 2024-06-11 10:04:19 |
| 25766 | 781b2f49-be8d-47f9-9976-cbbe6a541e30 |       0 |     1.5 | datacentr-compute-03 | 2024-06-11 10:04:28 |
| 24268 | 2a013d80-7139-479c-bd8b-56eb5075fe86 |       0 |     2.3 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 30948 | aabb2d79-479a-451f-b587-4839846b67d2 |       0 |     2.6 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 18524 | 2de30a97-ee9d-41e3-b925-24999f7b7962 |       0 |     2.6 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 25276 | 5c0ba023-3bda-4660-bb8e-7139e0e1ab81 |       0 |     3.6 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 10888 | fd29380e-36d0-4b85-a676-964f5d5e0025 |       0 |     5.1 | datacentr-compute-02 | 2024-06-11 10:04:19 |
| 46522 | 66ee364b-8d72-4d2a-a361-64dac7c82ed7 |       0 |     5.1 | datacentr-compute-02 | 2024-06-11 10:04:19 |
| 24957 | 0f6cfe35-281c-4eb0-a9ec-cfe19caf81ab |       0 |     5.1 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 17271 | 54725d35-17d5-42ed-a299-d58f000cb577 |       0 |     5.1 | datacentr-compute-01 | 2024-06-11 10:04:38 |
|  2809 | 97b845cf-fd28-4d73-8367-767f24cceb8d |     6.7 |     2.4 | datacentr-compute-02 | 2024-06-11 10:04:19 |
| 22276 | b683c200-63cd-43ec-ae54-94d6950cac89 |     6.7 |     2.6 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 10804 | 47182e97-e123-4d83-968e-5adda5836ca3 |     6.7 |     6.7 | datacentr-compute-02 | 2024-06-11 10:04:19 |
| 26308 | 61eab3ac-cae1-4f52-9fc1-842080854991 |      20 |     4.8 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 28560 | 0b8b3589-abf0-4134-ae20-83b89e511ea3 |    46.7 |    10.2 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 11951 | 7be3c82e-c7ae-4f1a-bd7f-9814a5eea04f |      80 |     2.6 | datacentr-compute-03 | 2024-06-11 10:04:28 |
| 45784 | 1b114412-85ce-4f3b-af6f-3ee388e8de27 |   166.7 |    10.2 | datacentr-compute-01 | 2024-06-11 10:04:38 |
|  8862 | dabce95d-f06e-4205-97a1-fdfbe11720fa |   166.7 |    10.2 | datacentr-compute-02 | 2024-06-11 10:04:19 |
| 28356 | 2e6a56bc-02c3-4ac1-a82f-8554ec0c1007 |     180 |    10.2 | datacentr-compute-02 | 2024-06-11 10:04:19 |
|  1340 | e8eb19ff-4240-4736-8045-f6c10d196650 |   206.7 |    10.2 | datacentr-compute-03 | 2024-06-11 10:04:28 |
| 31882 | 0c9c4016-817f-47be-a716-c412d82f263e |   233.3 |    10.2 | datacentr-compute-03 | 2024-06-11 10:04:28 |
| 45881 | f72dcd92-f5cc-43f6-b68c-003cf65e2df5 |   393.3 |     4.2 | datacentr-compute-03 | 2024-06-11 10:04:28 |
|  8109 | 1a7fcd2f-3529-4c0d-8e88-32cd2d71baa0 |   406.7 |     5.1 | datacentr-compute-01 | 2024-06-11 10:04:38 |
| 16437 | 2f2d68af-7101-459c-83ca-3914cf328c8f |   413.3 |     4.7 | datacentr-compute-01 | 2024-06-11 10:04:38 |
+-------+--------------------------------------+---------+---------+----------------------+---------------------+
```

# IoT Agent Service Group provision (optional)
We can start by creating a new service group, which will have some features common for all the IoT devices in the Agent. We can simply
run `source 01.provision.service.group.txt`. 

# Provision new Devices.
In this case, "devices" are not properly a device. In this case, devices correspond to row we have in the SQL result. In this case, in order
to provision a new device, we could run something like the following:

``` 
dev_id=2e6a56bc-02c3-4ac1-a82f-8554ec0c1007

source 02.provision.device.sh

```

This will simply run a `curl` command to provision the device with "vm_name" the one in variable ***device_id***. After a few seconds (1 minute
as maximum), we'll have some data in the Context Broker and we will be able to query it:

```
# Device info in IoT Agent:
curl -L -X GET 'http://192.168.3.253:4041/iot/devices' \
    -H 'fiware-service: openiot' \
    -H 'fiware-servicepath: /'
```

```
# Device data in CB
curl -v -H "NGSILD-Tenant: openiot" -H "NGSILD-Path: /" \
    "localhost:1026/ngsi-ld/v1/entities/urn:ngsi-ld:demosql:$dev_id?options=simplified"
```


