#!/bin/bash
chmod a+r /etc/container_environment.sh
source /etc/container_environment.sh
cd $REPO_DIR
/sbin/setuser dubizzle npm install
exec /sbin/setuser dubizzle nodejs $REPO_DIR/cli.js --config $REPO_DIR/config/chrome.json  2>&1 $USER_LOGGING_DIR/$SERVICE_NAME.log
