#!/usr/local/bin/python
# coding:utf-8
# Monitoring server program
import socket
import sys
# import commands
import psutil
import re

HOST = ''  # Symbolic name meaning all available interfaces
PORT = 38700  # Arbitrary non-privileged port


def __json__(src, name):
    inf = re.sub(r'^[^(]+\(|\)$', '', src)
    inf = '"' + name + '":{' + re.sub(r',$', '', re.sub(r'([^=]+)=([0-9.]+)(?:, )?', r'"\1":\2,', inf)) + "}"
    return re.sub(r',(?=]})', '', inf)


def __cpu_times__():
    return __json__(repr(psutil.cpu_times()), 'cputimes')


def __cpu_percent__():
    return '"cpuprct":{0}'.format(psutil.cpu_percent())


def __mem__():
    return __json__(repr(psutil.virtual_memory()), 'vmem')


def __swap__():
    return __json__(repr(psutil.swap_memory()), 'swap')


def __monitor__():
    return "{" + "{0},{1},{2},{3}".format(__cpu_percent__(), __mem__(), __cpu_times__(), __swap__()) + "}"


if __name__ == "__main__":
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind((HOST, PORT))
        s.listen(1)
    except socket.error as msg:
        print msg
        s = None

    if s is None:
        print 'could not open socket'
        sys.exit(1)

    while 1:
        try:
            conn, addr = s.accept()
            # print 'Connected by', addr
        except socket.error as msg:
            print msg
            exit(1)

        while 1:
            data = conn.recv(128)
            if not data:
                break

            if data == "stat":
                '''
                (status, output) = commands.getstatusoutput("./monitor.sh")
                if status == 0:
                    conn.send(output)
                    output = ""
                else:
                    conn.send("Get monitoring infomation failed. code [$status]")
                '''
                conn.send(__monitor__())
            else:
                conn.send("Bad command.")

        conn.close()
