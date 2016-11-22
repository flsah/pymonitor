#!/usr/bin/env bash

ORACLE_HOME=/oracle/app/oracle/product/11.2.0/db_1
LD_LIBRARY_PATH=${ORACLE_HOME}/lib:/usr/lib:/usr/local/lib

export ORACLE_HOME=${ORACLE_HOME}
export SID=pvmx
export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}
export PATH=$PATH:${ORACLE_HOME}/bin

LIB_PATH=../lib
LOG_PATH=../log
PY_HOME=/usr/local/bin

if [ ! -d ${LOG_PATH} ]; then
    mkdir -p ${LOG_PATH}
fi

echo `${PY_HOME}/python ${LIB_PATH}/monitor_cli.py` & >> ${LOG_PATH}/monitor_client.log
echo `${PY_HOME}/python ${LIB_PATH}/oracle.py` & >> ${LOG_PATH}/database.log
echo `${PY_HOME}/python ${LIB_PATH}/server.py` & >> ${LOG_PATH}/webserver.log
