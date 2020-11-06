# docker_test

### Instructions:

(1) Run setup-docker.sh to get the mysql and nodejs container running
(2) Set up MySQL to allow incoming connections (namely, from node_app). Docker will take care of translating node_app to whatever the internal IP is.
(3) Run setup-docker.sh again after killing node_app. The new instance should connect to the database.
