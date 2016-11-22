#!/usr/bin/local/python
# Monitoring client program
# coding:utf-8
import socket
import time
import datetime
import re
import json
import sys
import globalv

from globalv import FileUtil as futil


def __get_host__(net_info):
    net = net_info.split(",")
    return net[0].strip(), int(net[1].strip())


L_HOST, L_PORT = None, None  # The local host info
hosts = {}


# read configuration
def __read_conf__():
    try:
        for line in futil.read(globalv.conf_path()).split('\n'):
            if len(line.strip()) == 0:
                continue

            info = line.split("{", 2)
            name = info[0].strip()
            conf = info[1].replace("}", "").strip()

            if name == "local":
                global L_HOST, L_PORT
                (L_HOST, L_PORT) = __get_host__(conf)
            else:
                global hosts
                hosts[name] = conf
    except file.errors as msg:
        print msg


def __collect__(srv_nm, host, port):
    s = None
    try:
        # create socket obj
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # set socket release port after mission has done
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        # bind local addr and port
        s.bind((L_HOST, L_PORT))

        s.connect((host, port))
        # print "Connect to", host, "on port", port

        s.send('stat')
        data = '{"server":"' + srv_nm + '","stat":' + s.recv(4096) + '}'
        return data
    except socket.error as msg:
        print msg
        if s:
            s.close()

    return '{"server":"' + srv_nm + '","stat":"error"}'


def __out_report__(rpt):
    futil.write(globalv.svr_rpt_path(), rpt)


def __out_history__(rpt):
    reload(sys)
    sys.setdefaultencoding('utf-8')

    rpt = json.loads(rpt)
    data = '['
    for datum in rpt:
        data += '{' + '"server":"{0}","data":[{1},{2}]'.format(
            datum['server'],
            datum['stat']['cpuprct'],
            datum['stat']['vmem']['percent']) + '},'
    data = re.sub(r',$', ']', data)

    now = datetime.datetime.now()
    his = '{' + '"h":{0},"m":{1},"data":{2}'.format(now.hour, now.minute, data) + '}\n'

    futil.append(globalv.svr_arch_path(), his)


if __name__ == "__main__":
    while 1:
        '''
        fetch monitor hosts configuration.
          this step in the while circle that will not need restart
        this job when configuration will has been changed
        '''
        __read_conf__()

        # do collecting remote host info
        new_rpt = ''
        for item in hosts.items():
            inet = __get_host__(item[1])
            new_rpt += __collect__(item[0], inet[0], inet[1]) + ','

        new_rpt = '[{0}]'.format(re.sub(r',$', '', new_rpt))
        __out_report__(new_rpt)
        __out_history__(new_rpt)

        time.sleep(globalv.INTERVAL)
