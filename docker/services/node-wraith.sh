#!/bin/bash
chmod a+r /etc/container_environment.sh
source /etc/container_environment.sh

exec /sbin/setuser dubizzle nodejs $REPO_DIR/cli.js --config $REPO_DIR/config/chrome.json  2>&1 $LOG_DIR/$SERVICE_NAME.log
