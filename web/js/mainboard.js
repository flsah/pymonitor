/**
 * Created by liushuang on 11/17/16.
 */

var MainBoard = function() {
    return {
        version: 'Main Board 1.0.0',

        _content:
            '<div class="alert alert-danger hide" role="alert">\
            <strong>错误！</strong>检测到受控机状态异常，请联系管理员处理。</div>\
            <h1 class="page-header">监控面板</h1>\
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

        summaryEl: null,

        summaryCallback: null,

        historyEl: null,

        setEl: null,

        _timer: 0,

        init: function(config) {
            for (var p in this) {
                if (this.hasOwnProperty(p) && config.hasOwnProperty(p)) {
                    this[p] = config[p];
                }
            }

            this._loadScript();
            this.navigator();
            this.summary();
            this._initHistory();

            this._timer = setInterval(function () {
                mboard.summary();
            }, this.interval);
        },

        _scripts: [
            'charts/loader.js',
            'charts/monitorchart.js',
            'js/monitorboard.js',
            'js/setboard.js'
        ],

        // _scripts: [
        //     'charts/loader.js',
        //     'charts/monitorchart.min.js',
        //     'js/boards.min.js'
        // ],

        _loadScript: function() {
            var prefix = '/static/',
                spt = this._scripts,
                callback;

            for (var i = 0; i < spt.length; i++) {
                if (spt[i].indexOf('setboard') > 0) {
                    callback = function() {
                        mboard._initSet();
                    };
                } else {
                    callback = function() {};
                }
                $.getScript(prefix + spt[i], callback);
            }
        },

        navigator: function() {
            $.get("/navlist", {}, this.navCallback);
        },

        _serStatus: {},

        navHandler: function(data) {
            var nav = $.parseJSON(data);
            var html = '', name, status;
            for (var n in nav) {
                if (typeof nav[n] === 'string') {
                    name = nav[n];
                    status = true;
                } else {
                    name = nav[n][0];
                    status = false;
                }
                this._serStatus[name] = status;

                html += ['<li><a href="javascript: void(0);" onclick="mboard.detail(\'',
                            name, '\');">', name, '</a></li>'].join('');
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
            var html = '', line, stat, db, status, trStyle;
            for (var n in info) {
                line = info[n];
                stat = line['stat'];
                status = '正常';
                trStyle = '';

                mboard._serStatus[line['server']] = (stat !== 'error');
                if (stat === 'error') {
                    stat = {
                        cpuprct: '-',
                        vmem: {
                            percent: '-'
                        }
                    };
                    status = '错误';
                    trStyle = ' class="err-tr"';
                }

                db = line['db'];
                html += ['<tr', trStyle, '><td class="cell_c">', line['server'],
                    '</td><td class="cell_c">', switchPrct(stat['cpuprct']),
                    '</td><td class="cell_c">', switchPrct(stat['vmem']['percent']),
                    '</td><td class="cell_c">', switchUndef(db['tps']),
                    '</td><td class="cell_c">', switchUndef(db['avgresp']),
                    '</td><td class="cell_c">', switchPrct(db['feedsuc']),
                    '</td><td class="cell_c">', status, '</td></tr>'].join('');
            }
            html = this._content.replace(/\$\{content\}/, html);

            var tab = this.summaryEl;
            if (typeof tab === 'string') {
                tab = $(tab);
            }
            tab.html(html);
        },

        detail: function (serverName) {
            $('.nav.nav-sidebar > li').each(function() {
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

            if (!mboard._serStatus[serverName]) {
                $('.alert-danger').removeClass('hide');
                return;
            }

            clearInterval(mboard._timer);

            monitor.init({
                dispEl: 'div.main',
                freshCallback: function (data) {
                    monitor.express(data);
                },
                createCallback: function (data) {
                    monitor.create(data);
                },
                serverName: serverName
            });

            $(mboard.historyEl).removeClass('hide');
        },
        
        _initHistory: function () {
            if (typeof this.historyEl === 'string') {
                this.historyEl = $(this.historyEl);
            }
            this.historyEl.click(this.history);
        },

        history: function () {
            monitor.loadHistory();
        },

        _initSet: function() {
            setter.create({
                setEl: this.setEl
            });
        }
    };
};

var mboard = new MainBoard();
