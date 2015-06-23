FROM        phusion/baseimage:0.9.16

MAINTAINER  Mahmoud <mahmoud.felfel@dubizzle.com>

ENV         USER                    dubizzle
ENV         GROUP                   $USER
ENV         USER_DIR                /home/$USER
ENV         SERVICE_NAME            node-wraith
ENV         REPO_DIR                $USER_DIR/SERVICE_NAME
ENV         USER_LOGGING_DIR        /var/log/$USER
ENV         SERVICE_DIR             /etc/service/SERVICE_NAME


RUN set -e && \
    apt-get update -y && \
    apt-get install -y nodejs npm && \
    useradd -m -d $USER_DIR -p $USER -s /bin/bash $USER && \
    chown -R $USER:$USER $USER_DIR && \
    mkdir -p $USER_LOGGING_DIR && \
    chmod oug+rw -R $USER_LOGGING_DIR

ADD         archive.tar.gz $REPO_DIR

RUN set -e && \
    mkdir -p $SERVICE_DIR &&\
    mkdir -p /var/log/dubizzle &&\
    cp $REPO_DIR/docker/services/$SERVICE_NAME.sh $SERVICE_DIR/run && \
    chmod +x $SERVICE_DIR/run &&\
    chown $USER:$USER -R /var/log/dubizzle &&\
    chmod +x $SERVICE_DIR/run

EXPOSE 80 9090

CMD         ["/sbin/my_init"]
