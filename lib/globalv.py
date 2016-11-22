# coding: utf-8
import os
import datetime
import time
import json
import re

# interval is 60 seconds
INTERVAL = 60

# chart's time-axis length, the unit is hour
TIMEAXIS = 4

__home__ = os.path.dirname(os.path.abspath(__file__))
__svr_rpt__, __db_rpt__, __svr_arch__, __db_arch__ = 'server.rpt',\
                                                     'database.rpt',\
                                                     'svrarch.{0}{1}{2}',\
                                                     'dbarch.{0}{1}{2}'


def basepath():
    return '{0}/..'.format(__home__)


def conf_path():
    return '{0}/bin/conf'.format(basepath())


def __cday__(filename):
    now = datetime.datetime.now()
    return filename.format(now.year, now.month, now.day)


def svr_rpt_path():
    return '{0}/report/{1}'.format(basepath(), __svr_rpt__)


def svr_arch_path():
    return '{0}/report/{1}'.format(basepath(), __cday__(__svr_arch__))


def db_rpt_path():
    return '{0}/report/{1}'.format(basepath(), __db_rpt__)


def db_arch_path():
    return '{0}/report/{1}'.format(basepath(), __cday__(__db_arch__))


def web_path():
    return '{0}/web'.format(basepath())


def svr_his_arch(date):
    return '{0}/report/svrarch.{1}'.format(basepath(), date)


def db_his_arch(date):
    return '{0}/report/dbarch.{1}'.format(basepath(), date)


class FileUtil:
    def __init__(self):
        pass

    @staticmethod
    def write(name, content):
        FileUtil.__modify__(name, 'w+', content)

    @staticmethod
    def append(name, content):
        FileUtil.__modify__(name, 'a+', content)

    @staticmethod
    def __modify__(name, mode, content):
        f = None
        FileUtil.__ensure_dir__(name)

        try:
            f = open(name, mode)
            f.write(content)
            f.flush()
        finally:
            if f:
                f.close()

    @staticmethod
    def __ensure_dir__(d):
        d = re.sub(r'/[^/]+$', '', d, 1)
        d = os.path.dirname(d)
        if not os.path.exists(d):
            os.makedirs(d)

    @staticmethod
    def read(name):
        f = None
        if not os.path.isfile(name):
            return '{}'

        try:
            f = open(name, 'r')
            return f.read()
        finally:
            if f:
                f.close()

    @staticmethod
    def read_all_history(svr_nm):
        now = datetime.datetime.now()

        history = FileUtil.read_history('svr', svr_nm, now)
        return {
            'shour': history[0],
            'ehour': now.hour,
            'eminu': now.minute,
            'svr': history[1],
            'db': FileUtil.read_history('db', svr_nm, now)[1]
        }

    @staticmethod
    def read_history(ftype, svr_nm, now):
        year, month, day, hour, minute = now.year, now.month, now.day, now.hour, now.minute
        arch, p_arch = '{0}{1}{2}'.format(year, month, day), None

        start = None

        if TIMEAXIS == 1:
            s_hour = hour
        else:
            p_hour = TIMEAXIS / 2

            timestamp = time.mktime(now.timetuple())
            start = datetime.datetime.fromtimestamp(timestamp - (TIMEAXIS - p_hour) * 3.6e3)
            p_arch = '{0}{1}{2}'.format(start.year, start.month, start.day)

            if ftype == 'svr':
                arch = svr_his_arch(arch)
                p_arch = svr_his_arch(p_arch)
            elif ftype == 'db':
                arch = db_his_arch(arch)
                p_arch = db_his_arch(p_arch)
            else:
                raise IOError

            s_hour = start.hour

        if start.day < day:
            p_arch = FileUtil.__filter__(p_arch, svr_nm, s_hour)
        else:
            p_arch = None

        arch = FileUtil.__filter__(arch, svr_nm, s_hour, hour, minute)

        if p_arch:
            arch = p_arch.extend(arch)

        return s_hour, arch

    @staticmethod
    def __filter__(filename, servername, start, end_h, end_m):
        if not os.path.isfile(filename):
            return []

        f = FileUtil.read(filename)
        report = []

        for l in f.split('\n'):
            if l == '':
                break

            lj = json.loads(l)
            if lj['h'] < start:
                continue
            if end_h and lj['h'] == end_h and lj['m'] > end_m:
                break

            for d in lj['data']:
                if d['server'] == servername:
                    report.append(d['data'])
                    break

        return report
