#!/usr/local/bin/python
# coding: utf-8

import json
import re
import tornado.web
import globalv

from tornado.web import RequestHandler
from tornado.ioloop import IOLoop
from globalv import FileUtil as futil


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

    def get(self):
        rpt = __read_report__()
        nav = '['
        for rpt in json.loads(rpt):
            nav += '"' + rpt['server'] + '",'

        __send_json__(self, re.sub(r',$', ']', nav))


class DetailHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def post(self, svr_nm):
        self.get(self, svr_nm)

    def get(self, svr_nm):
        self.render('detail.html', svrname=svr_nm)


class ServerInfoHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def post(self, svr_nm):
        self.get(self, svr_nm)

    def get(self, svr_nm):
        rpt = __read_report__()
        for rpt in json.loads(rpt):
            if rpt['server'] == svr_nm:
                __send_json__(self, rpt)
                break


class HistoryHandler(RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self, svr_nm):
        __send_json__(self, futil.read_all_history(svr_nm))


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/', MainHandler),
            (r'/summary', SummaryHandler),
            (r'/navlist', NavHandler),
            (r'/detail/(.+)', DetailHandler),
            (r'/serverinfo/(.+)', ServerInfoHandler),
            (r'/history/(.+)', HistoryHandler),
        ]
        settings = {
            "debug": True,
            "static_path": globalv.web_path(),
            'template_path': globalv.web_path()
        }

        tornado.web.Application.__init__(self, handlers, **settings)


def __send_json__(resp, rpt):
    if isinstance(rpt, dict)\
            or isinstance(rpt, list)\
            or isinstance(rpt, tuple):
        rpt = json.dumps(rpt)

    resp.add_header("Content-Type", "application/json")
    resp.add_header("Encoding", "UTF-8")
    resp.write(rpt)


def __read_report__():
    try:
        svr_rpt = json.loads(futil.read(globalv.svr_rpt_path()))
        db_rpt = json.loads(futil.read(globalv.db_rpt_path()))

        for svr in svr_rpt:
            svr['db'] = db_rpt[svr['server']]

        return json.dumps(svr_rpt)
    except file.errors as msg:
        print msg
        return '{"error":true}'


if __name__ == "__main__":
    print "Start server on port 9601"
    application = Application()
    application.listen(9601)
    IOLoop.current().start()
