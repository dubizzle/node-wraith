#!/bin/bash

exec /sbin/setuser dubizzle node $REPO_DIR/cli.js --config $REPO_DIR/config/chrome.json  2&>1 $LOG_DIR/$SERVICE_NAME.log
