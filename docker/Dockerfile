FROM        phusion/baseimage:0.9.16

MAINTAINER  Mahmoud <mahmoud.felfel@dubizzle.com>

ENV         USER                    dubizzle
ENV         GROUP                   $USER
ENV         USER_DIR                /home/$USER
ENV         SERVICE_NAME            node-wraith
ENV         REPO_DIR                $USER_DIR/$SERVICE_NAME
ENV         USER_LOGGING_DIR        /var/log/$USER
ENV         SERVICE_DIR             /etc/service/$SERVICE_NAME
ENV         NVM_DIR                 $USER_DIR/local/nvm
ENV         NODE_VERSION            0.12


RUN set -e && \
    apt-get update -y && \
    apt-get install -y git nodejs nodejs-legacy npm && \
    curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | bash && \
    rm /bin/sh && ln -s /bin/bash /bin/sh && \
    cat $NVM_DIR/nvm.sh >> installnode.sh && \
    echo "nvm install 0.12.0" >> installnode.sh && \
    apt-get install -y man && \
    sh installnode.sh    nvm install $NODE_VERSION &&\
    nvm alias default $NODE_VERSION &&\
    nvm use default && \
    useradd -m -d $USER_DIR -p $USER -s /bin/bash $USER && \
    chown -R $USER:$USER $USER_DIR && \
    mkdir -p $USER_LOGGING_DIR && \
    chmod oug+rw -R $USER_LOGGING_DIR

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

ADD         archive.tar.gz $REPO_DIR

RUN set -e; \
    mkdir -p $SERVICE_DIR;\
    mkdir -p /var/log/dubizzle;\
    cp $REPO_DIR/docker/services/$SERVICE_NAME.sh $SERVICE_DIR/run; \
    chmod +x $SERVICE_DIR/run;\
    chown $USER:$USER -R $REPO_DIR;\
    chown $USER:$USER -R /var/log/dubizzle;\
    chmod +x $SERVICE_DIR/run

EXPOSE 80 9090

CMD         ["/sbin/my_init"]
