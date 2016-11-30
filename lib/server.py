#!/usr/local/bin/python
# coding: utf-8

import sys
import json
import re
import tornado.web
import globalv

from tornado.web import RequestHandler, stream_request_body
from tornado.ioloop import IOLoop
from globalv import FileUtil as fUtil


# Dashboard page handler
class MainHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        self.render("index.html")


# Dashboard page summany table handler
class SummaryHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        __send_json__(self, __read_report__())


# navigator bar items handler
class NavHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def post(self, *args, **kwargs):
        NavHandler.get(self, *args, **kwargs)

    def get(self, *args, **kwargs):
        nav = '['
        for rpt in __read_report__():
            if rpt['stat'] == 'error':
                nav += '["' + rpt['server'] + '", "error"],'
            else:
                nav += '"' + rpt['server'] + '",'

        nav += ']'

        __send_json__(self, re.sub(r'(?:^u\'|,(?=]\'$)|\'$)', '', repr(nav)))


# Remote server information, include cpu, memory and statistics from db
class ServerInfoHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def post(self, server_name):
        ServerInfoHandler.get(self, server_name)

    def get(self, server_name):
        for rpt in __read_report__():
            if rpt['server'] == server_name:
                __send_json__(self, rpt)
                break


@stream_request_body
class HistoryHandler(RequestHandler):
    svr_nm, start, direct = None, None, None

    def data_received(self, chunk):
        global svr_nm, start, direct
        json_re = json.loads(chunk)

        svr_nm = json_re['svr_nm']
        start = json_re['start']
        direct = json_re['direct']

    def post(self):
        __send_json__(self, fUtil.history(svr_nm, start, direct))

    def get(self, server):
        __send_json__(self, fUtil.read_all_history(server))


class IndexMapHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        __send_json__(self, '')


class SetHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def post(self):
        catalog = self.get_body_argument('type')

        if catalog == 'query':
            name, inet, conf = None, None, '['
            try:
                for line in fUtil.read(globalv.conf_path()).split('\n'):
                    if len(line.strip()) == 0:
                        continue

                    info = line.split("{", 2)
                    name = info[0].strip()

                    if name == 'local':
                        continue

                    inet = info[1].replace("}", "").split(',', 2)
                    conf += '{"server":"' + name +\
                            '","host":"' + inet[0].strip() +\
                            '","port":' + inet[1].strip() + '},'

                conf = re.sub(r',$', ']', conf)
            except file.errors as msg:
                print msg
                conf = '[]'

            __send_json__(self, conf)
        elif catalog == 'save':
            reload(sys)
            sys.setdefaultencoding('utf-8')

            try:
                data = json.loads(self.get_body_argument('data'))
                conf = fUtil.read(globalv.conf_path()).split('\n')[0] + '\n'
                for d in data:
                    conf += d['server'] + '{' + d['host'] + ', ' + repr(d['port']) + '}\n'

                fUtil.write(globalv.conf_path(), conf)
                __send_json__(self, '{"status":"ok"}')
            except Exception as error:
                print error
                __send_json__(self, '{"status":"error"}')


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/', MainHandler),
            (r'/summary', SummaryHandler),
            (r'/navlist', NavHandler),
            (r'/serverinfo/(.+)', ServerInfoHandler),
            (r'/history/(.+)', HistoryHandler),
            (r'/history', HistoryHandler),
            (r'/setter', SetHandler),
            (r'/index.js.map', IndexMapHandler),
        ]
        settings = {
            "debug": True,
            "static_path": globalv.web_path(),
            'template_path': globalv.web_path()
        }

        tornado.web.Application.__init__(self, handlers, **settings)


def __send_json__(resp, rpt):
    if not isinstance(rpt, str):
        rpt = json.dumps(rpt)

    resp.add_header("Content-Type", "application/json")
    resp.add_header("Encoding", "UTF-8")
    resp.write(rpt)


def __read_report__():
    try:
        svr_rpt = json.loads(fUtil.read(globalv.svr_rpt_path()))
        db_rpt = json.loads(fUtil.read(globalv.db_rpt_path()))

        for svr in svr_rpt:
            if svr['server'] not in db_rpt:
                svr['db'] = {}
            else:
                svr['db'] = db_rpt[svr['server']]

        return svr_rpt
    except file.errors as msg:
        print msg
        return '{"stat":"error"}'


if __name__ == "__main__":
    print "Start server on port 9601"
    application = Application()
    application.listen(9601)
    IOLoop.current().start()
