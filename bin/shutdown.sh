#!/usr/bin/env bash

for proc in `ps -ef|egrep "(monitor_cli|server)\.py"|gawk '{print $2}'`
do
    `kill -9 ${proc}`
done
