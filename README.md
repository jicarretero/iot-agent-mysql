# Creating tunnel to connect the mysql database

ssh -N -f -o ServerAliveInterval=30 -L 3306:127.0.0.1:3306 fiware@admtools.lab.fiware.org
