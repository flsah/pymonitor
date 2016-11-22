/**
 * Created by liushuang on 11/17/16.
 */

var MainBoard = function() {
    return {
        version: 'Main Board 1.0.0',

        _content: '<h1 class="page-header">监控面板</h1>\
            <h2 class="sub-header">POIN</h2>\
            <div class="table-responsive">\
                <table class="table table-striped svr-table">\
                    <thead>\
                        <tr>\
                            <th class="head_align" width="30%">远程服务器</th>\
                            <th class="head_align" width="12%">CPU使用率</th>\
                            <th class="head_align" width="12%">内存使用率</th>\
                            <th class="head_align" width="12%">TPS</th>\
                            <th class="head_align" width="12%">平均响应时间</th>\
                            <th class="head_align" width="12%">返回报文成功率</th>\
                            <th class="head_align" width="10%">状态</th>\
                        </tr>\
                    </thead>\
                    <tbody>${content}</tbody>\
                </table>\
            </div>',

        interval: 60000,

        navCallback: null,

        nav: null,

        summaryEle: null,

        summaryCallback: null,

        _timer: 0,

        init: function(config) {
            for (var p in this) {
                if (this.hasOwnProperty(p) && config[p]) {
                    this[p] = config[p];
                }
            }

            this.navigator();
            this.summary();

            this._timer = setInterval(function () {
                mboard.summary();
            }, this.interval);
        },

        navigator: function () {
            $.get("/navlist", {}, this.navCallback);
        },

        navHandler: function(data) {
            var nav = $.parseJSON(data);
            var html = '';
            for (var n in nav) {
                html += '<li><a href="javascript: void(0);" onclick="mboard.detail(\'' +
                            nav[n] + '\');">' + nav[n] + '</a></li>'
            }

            var navbar = this.nav;
            if (typeof navbar === 'string') {
                navbar = $(navbar);
            }
            navbar.html(html);
        },

        summary: function() {
            $.get('/summary', {'type':'poin'}, this.summaryCallback);
        },

        summaryHandler: function(data) {
            var info = $.parseJSON(data);
            var html = '', line, stat, db;
            for (var n in info) {
                line = info[n];
                stat = line['stat'];
                db = line['db'];
                html += '<tr><td class="cell_c">' + line['server']
                    + '</td><td class="cell_c">' + stat['cpuprct']
                    + '%</td><td class="cell_c">' + stat['vmem']['percent']
                    + '%</td><td class="cell_c">' + db['tps']
                    + '</td><td class="cell_c">' + db['avgresp']
                    + '</td><td class="cell_c">' + db['feedsuc']
                    + '%</td><td class="cell_c">正常</td></tr>';
            }
            html = this._content.replace(/\$\{content\}/, html);

            var tab = this.summaryEle;
            if (typeof tab === 'string') {
                tab = $(tab);
            }
            tab.html(html);
        },

        detail: function (serverName) {
            clearInterval(mboard._timer);

            // alert($(event.target).text());
            $('.nav.nav-sidebar > li').each(function(idx) {
                var li = $(this),
                    a = li.children('a');
                if (a.text() === serverName) {
                    if (li.hasClass('active'))
                        return;

                    li.addClass('active');
                } else {
                    li.removeClass('active');
                }
            });

            monitor.init({
                dispEle: 'div.main',
                freshCallback: function (data) {
                    monitor.express(data);
                },
                createCallback: function (data) {
                    monitor.create(data);
                },
                serverName: serverName
            });
        }
    };
};

var mboard = new MainBoard();
