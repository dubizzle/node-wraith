FROM node:0.12

MAINTAINER  Mahmoud <mahmoud.felfel@dubizzle.com>

ENV         USER                    dubizzle
ENV         GROUP                   $USER
ENV         USER_DIR                /home/$USER
ENV         SERVICE_NAME            node-wraith
ENV         REPO_DIR                $USER_DIR/$SERVICE_NAME
ENV         USER_LOGGING_DIR        /var/log/$USER
ENV         SERVICE_DIR             /etc/service/$SERVICE_NAME


RUN set -e && \
    useradd -m -d $USER_DIR -p $USER -s /bin/bash $USER && \
    chown -R $USER:$USER $USER_DIR && \
    mkdir -p $USER_LOGGING_DIR && \
    chmod oug+rw -R $USER_LOGGING_DIR

ADD         archive.tar.gz $REPO_DIR

WORKDIR $REPO_DIR

RUN mkdir -p /var/log/dubizzle;\
    chown $USER:$USER -R $REPO_DIR;\
    chown $USER:$USER -R /var/log/dubizzle;\
    npm install

EXPOSE 80 9090

CMD  node $REPO_DIR/cli.js --config $REPO_DIR/config/chrome.json $USER_LOGGING_DIR/$SERVICE_NAME.log 2>&1
