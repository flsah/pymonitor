#!/usr/local/bin/python
# coding: utf-8
import time
import datetime
import sys
import re
import json
import globalv

from globalv import FileUtil as futil


def __query__():
    return '{"10.193.131.11(北京)":{"tps":150,"avgresp":879,"feedsuc":100},' \
           '"10.193.131.12(北京)":{"tps":152,"avgresp":821,"feedsuc":99}}'


def __out_report__(report):
    rpt_f = None
    try:
        rpt_f = open(globalv.db_rpt_path(), 'w+')
        rpt_f.write(report)
    except file.errors as msg:
        print msg

    if rpt_f:
        rpt_f.close()


def __out_history__(report):
    reload(sys)
    sys.setdefaultencoding('utf-8')

    report = json.loads(report)
    data = '['
    for prop in report:
        attr = report[prop]
        data += '{' + '"server":"{0}","data":[{1},{2},{3}]'.format(
            prop, attr['tps'], attr['avgresp'], attr['feedsuc']) + '},'
    data = re.sub(r',$', ']', data)

    now = datetime.datetime.now()
    his = '{' + '"h":{0},"m":{1},"data":{2}'.format(now.hour, now.minute, data) + '}\n'

    futil.append(globalv.db_arch_path(), his)


if __name__ == "__main__":
    while 1:
        rpt = __query__()
        __out_report__(rpt)
        __out_history__(rpt)

        time.sleep(globalv.INTERVAL)
