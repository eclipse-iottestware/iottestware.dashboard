#https://www.eclipse.org/forums/index.php/t/1094222/
FROM eclipsetitan/titan-ubuntu:7.2.0
MAINTAINER Ferdinand Wolff
LABEL description="IoT-Testware Image"

USER root

## Prepare Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash


## PREPARE THE SYSTEM
RUN apt-get update && sudo apt-get install -y apt-utils build-essential default-jdk libsctp-dev nmap tcpdump curl nodejs python

# net-tools & iputils are only required for debugging and testing
RUN apt-get -yqq install net-tools iputils-ping

## CLONE AND PREPARE iottestware
WORKDIR /home/titan
RUN git clone https://github.com/eclipse/iottestware && /bin/bash -c "source /etc/bash.bashrc" && sudo chmod 777 /home/titan/iottestware/install.py

## EXECUTE install.py
RUN python /home/titan/iottestware/install.py -p mqtt -b --path /home/titan/Titan && python /home/titan/iottestware/install.py -p coap -b --path /home/titan/Titan

# PREPARE WEBSERVER
# has to be changed to pull from git-repo later
ADD . /home/titan/iottestware.webserver
RUN mkdir /home/titan/iottestware.webserver/backend/bin
RUN cd /home/titan/iottestware.webserver && mv /home/titan/Titan/IoT-Testware/iottestware.mqtt/bin/iottestware.mqtt /home/titan/iottestware.webserver/backend/bin && mv /home/titan/Titan/IoT-Testware/iottestware.coap/bin/iottestware.coap /home/titan/iottestware.webserver/backend/bin

## CREATE the version files with the latest commit for each test suite with git_log.py script
COPY git_log.py /home/titan/git_log.py
RUN chmod +x /home/titan/git_log.py
RUN /home/titan/git_log.py -p /home/titan/Titan/IoT-Testware/iottestware.mqtt -n mqtt -o /home/titan/iottestware.webserver/backend/resources/testsuites && \
    /home/titan/git_log.py -p /home/titan/Titan/IoT-Testware/iottestware.coap -n coap -o /home/titan/iottestware.webserver/backend/resources/testsuites

#NPM INSTALL AND START
WORKDIR /home/titan/iottestware.webserver
RUN rm -rf node_modules && npm install
CMD ["npm", "start", "--prefix", "/home/titan/iottestware.webserver"]

EXPOSE 3001
EXPOSE 8080
