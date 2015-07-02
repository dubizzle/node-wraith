FROM node:0.12

MAINTAINER  Mahmoud <mahmoud.felfel@dubizzle.com>

ENV         USER                    dubizzle
ENV         GROUP                   $USER
ENV         USER_DIR                /home/$USER
ENV         SERVICE_NAME            node-wraith
ENV         REPO_DIR                $USER_DIR/$SERVICE_NAME
ENV         USER_LOGGING_DIR        /var/log/$USER

RUN \
  apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y  vim wget build-essential g++ flex bison gperf ruby perl \
  libsqlite3-dev libfontconfig1-dev libicu-dev libfreetype6 libssl-dev \
  libpng-dev libjpeg-dev python libx11-dev libxext-dev


# PhantomJS
RUN cd /tmp && \
    curl -L -O https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-linux-x86_64.tar.bz2 && \
    tar xjf /tmp/phantomjs-1.9.7-linux-x86_64.tar.bz2 -C /tmp && \
    mv /tmp/phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/local/bin && \
    rm -rf /tmp/phantomjs-1.9.7-linux-x86_64

RUN useradd -m -d $USER_DIR -p $USER -s /bin/bash $USER && \
    chown -R $USER:$USER $USER_DIR && \
    mkdir -p $USER_LOGGING_DIR && \
    chmod oug+rw -R $USER_LOGGING_DIR

ADD archive.tar.gz $REPO_DIR

WORKDIR $REPO_DIR

RUN chown $USER:$USER -R $REPO_DIR;\
    npm install;\
    npm update

EXPOSE 80 9090

CMD npm run wraith >> $USER_LOGGING_DIR/$SERVICE_NAME.log 2>&1
