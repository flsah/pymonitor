/**
 * Created by liushuang on 11/22/16.
 */

var _unit = [' B ', ' KB', ' MB', ' GB'];
function calc(orgi) {
    var scalar = 1024;
    var changed = parseFloat(orgi);

    var i = 0;
    for (; i < 4 && changed >= scalar; i++) {
        changed /= scalar;
    }

    return toPrec(changed, 2) + _unit[i];
}

function switchPrct(prct) {
    if (isNaN(prct)) {
        return "--";
    }

    prct = parseFloat(prct);
    if (prct === 0) {
        return "0.0 %";
    }

    return toPrec(prct) + ' %';
}

function toPrec(num, prec) {
    if (!prec) {
        prec = 1;
    }

    var fa = Math.pow(10, prec);
    num = (Math.round(num * fa) / fa).toString();
    // eval('num = (Math.round(num * 1e' + prec +
    //         ') / 1e' + prec + ').toString()');

    if (prec > 0) {
        if (num.indexOf('.') < 0) {
            num += '.';
        }

        var pos = num.substring(num.indexOf('.')).length - 1;
        if (pos < prec) {
            for (var i = 0; i < prec - pos; i++) {
                num += "0";
            }
        }
    }

    return num;
}

function switchUndef(val) {
    return val === undefined ? '--' : val;
}

function changeDate(date, delta) {
    var d = new Date(date).valueOf();
    d = new Date(d + delta * 8.64e7);
    var year = 1900 + d.getYear(),
        month = d.getMonth() + 1,
        day = d.getDate();

    return [year, (month < 10 ? '0' : '') + month,
        (day < 10 ? '0' : '') + day].join('-');
}

var _ipv4_regex = /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;

function verifyIPv4(val) {
    return val.match(_ipv4_regex);
}

function verifyPort(val) {
    val = parseInt(val);
    return (!isNaN(val) && val >= 0 && val < 65536);
}

/**
 * Created by liushuang on 11/17/16.
 */

var MainBoard = function() {
    return {
        version: 'Main Board 1.0.0',

        _content: [
            '<div class="alert alert-danger hide" role="alert">',
            '<strong>错误！</strong>检测到受控机状态异常，请联系管理员处理。</div>',
            '<h1 class="page-header">监控面板</h1>',
            '<h2 class="sub-header">POIN</h2>',
            '<div class="table-responsive">',
                '<table class="table table-striped svr-table">',
                    '<thead>',
                        '<tr>',
                            '<th class="head_align" width="30%">远程服务器</th>',
                            '<th class="head_align" width="12%">CPU使用率</th>',
                            '<th class="head_align" width="12%">内存使用率</th>',
                            '<th class="head_align" width="12%">TPS</th>',
                            '<th class="head_align" width="12%">平均响应时间</th>',
                            '<th class="head_align" width="12%">返回报文成功率</th>',
                            '<th class="head_align" width="10%">状态</th>',
                        '</tr>',
                    '</thead>',
                    '<tbody>${content}</tbody>',
                '</table>',
            '</div>'].join(''),

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
                if (config.hasOwnProperty(p)) {
                    this[p] = config[p];
                }
            }

            this._loadScript();
            this.navigator();
            this.summary();
            this._initHistory();
            this._initSet();

            this._timer = setInterval(function () {
                mboard.summary();
            }, this.interval);
        },

        _scripts: [
            'charts/loader.js',
            'charts/monitorchart.min.js'
        ],

        _loadScript: function() {
            var prefix = '/static/',
                spt = this._scripts;

            for (var i = 0; i < spt.length; i++) {
                $.getScript(prefix + spt[i]);
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
                stat = line.stat;
                status = '正常';
                trStyle = '';

                mboard._serStatus[line.server] = (stat !== 'error');
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

                db = line.db;
                html += ['<tr', trStyle, '><td class="cell_c">', line.server,
                    '</td><td class="cell_c">', switchPrct(stat.cpuprct),
                    '</td><td class="cell_c">', switchPrct(stat.vmem.percent),
                    '</td><td class="cell_c">', switchUndef(db.tps),
                    '</td><td class="cell_c">', switchUndef(db.avgresp),
                    '</td><td class="cell_c">', switchPrct(db.feedsuc),
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

/**
 * Created by liushuang on 11/18/16.
 */

var MonitorBoard = function() {
    return {
        version: 'Monitor Board 1.0.0',

        _content: ['<h1 class="page-header"></h1>',
            '<div class="page-btn hide">',
                '<input type="text" class="his-date" readonly>',
                '<button type="button" class="btn btn-sm btn-primary forward">&lt;&lt; 前4小时</button>',
                '<button type="button" class="btn btn-sm btn-primary backward">后4小时 &gt;&gt;</button>',
            '</div>',
            '<div class="mon-info">',
                '<div class="mon-div cpu-info">',
                    '<h2 class="sub-header sub-header-p">',
                        '<div class="title-text">CPU</div>',
                        '<div class="humanized cpu-percent"></div>',
                        '<div class="title-text">内存</div>',
                        '<div class="humanized mem-percent"></div>',
                    '</h2>',
                    '<div id="sys_chart" class="normal-chart"></div>',
                '</div>',
                '<div class="mon-div tps-info">',
                    '<h2 class="sub-header sub-header-p">',
                        '<div class="title-text">TPS</div>',
                        '<div class="humanized tps-val"></div>',
                    '</h2>',
                    '<div id="tps_chart" class="normal-chart"></div>',
                '</div>',
                '<div class="mon-div avr-info">',
                    '<h2 class="sub-header sub-header-p">',
                        '<div class="title-text long-text">平均响应时间</div>',
                        '<div class="humanized avr-val"></div>',
                    '</h2>',
                    '<div id="avr_chart" class="normal-chart"></div>',
                '</div>',
                '<div class="mon-div suc-info">',
                    '<h2 class="sub-header sub-header-p">',
                        '<div class="title-text long-text">报文返回成功率</div>',
                        '<div class="humanized suc-val"></div>',
                    '</h2>',
                    '<div id="suc_chart" class="normal-chart"></div>',
                '</div>',
            '</div>',
            '<div class="detail-panel">',
                '<div class="cpu-info" style="display: none;">',
                    '<h4>CPU</h4>',
                    '<table class="mon-tab"></table>',
                '</div>',
                '<div class="mem-info" style="display: none;">',
                    '<h4>Memory</h4>',
                    '<table class="mon-tab"></table>',
                '</div>',
            '</div>'].join(''),

        dispEl: null,

        freshCallback: null,

        createCallback: null,

        serverName: null,

        interval: 60000,

        _timer: 0,

        init: function (config) {
            for (var p in this) {
                if (this.hasOwnProperty(p) && config.hasOwnProperty(p)) {
                    this[p] = config[p];
                }
            }

            if (!this._loaded) {
                if (this.dispEl && typeof this.dispEl === 'string') {
                    this.dispEl = $(this.dispEl);
                }
                this.dispEl.html(this._content);
                this.dispEl.addClass('chart-container');

                $('.btn-primary.forward').click(function() {
                    monitor.loadHistory('f');
                });
                $('.btn-primary.backward').click(function() {
                    monitor.loadHistory('b');
                });
            }

            this._initDisp();
            this.fresh();
            this._initChart();

            if (this._timer > 0) {
                clearInterval(this._timer);
            }

            this._timer = setInterval(function() {
                monitor.fresh();
            }, this.interval);
        },

        _initDisp: function() {
            $('h1.page-header').text(this.serverName);
            $('.humanized').each(function() {
                $(this).removeClass('hide');
            });
            $('.page-btn').addClass('hide');
        },

        _sysChart: null,
        _tpsChart: null,
        _avrChart: null,
        _sucChart: null,

        _loaded: false,

        create: function(data) {
            data = $.parseJSON(data);

            if (this._loaded) {
                this._reloadChart(data);
            } else {
                this._sysChart = mchart({
                    id: 'cpu&mem',
                    googleChartOpt: {
                        vAxis: {
                            minValue: 0,
                            maxValue: 100
                        },
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#418CD8', '#899F00']
                    },
                    dispEl: document.getElementById('sys_chart'),
                    data: data.svr,
                    index: [0, 1],
                    illustration: ['', 'CPU', '内存'],
                    start: data.shour,
                    ctime: [data.ehour, data.eminu],
                    onLoadCallback: function () {
                        monitor._sysChart.draw();
                    }
                });

                this._tpsChart = mchart({
                    id: 'tps',
                    googleChartOpt: {
                        vAxis: {
                            minValue: 0
                        },
                        legend: 'left',
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#FF7E40']
                    },
                    dispEl: document.getElementById('tps_chart'),
                    data: data.db,
                    illustration: ['', ''],
                    start: data.shour,
                    ctime: [data.ehour, data.eminu],
                    onLoadCallback: function () {
                        monitor._tpsChart.draw();
                    }
                });

                this._avrChart = mchart({
                    id: 'averagetime',
                    googleChartOpt: {
                        vAxis: {
                            minValue: 0
                        },
                        legend: 'left',
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#45C098']
                    },
                    dispEl: document.getElementById('avr_chart'),
                    data: data.db,
                    index: 1,
                    illustration: ['', ''],
                    start: data.shour,
                    ctime: [data.ehour, data.eminu],
                    onLoadCallback: function () {
                        monitor._avrChart.draw();
                    }
                });

                this._sucChart = mchart({
                    id: 'successrate',
                    googleChartOpt: {
                        vAxis: {
                            minValue: 0,
                            maxValue: 100
                        },
                        legend: 'left',
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#5500AA']
                    },
                    dispEl: document.getElementById('suc_chart'),
                    data: data.db,
                    index: 2,
                    illustration: ['', ''],
                    start: data.shour,
                    ctime: [data.ehour, data.eminu],
                    onLoadCallback: function () {
                        monitor._sucChart.draw();
                    }
                });

                this._loaded = true;
            }
        },

        _initChart: function() {
            $.get('/history/' + this.serverName, {}, this.createCallback);
        },

        _reloadChart: function(data) {
            this._sysChart.reload({
                data: data.svr,
                start: data.shour,
                ctime: [data.ehour, data.eminu]
            });

            var dbConfig = {
                data: data.db,
                start: data.shour,
                ctime: [data.ehour, data.eminu]
            };

            this._tpsChart.reload(dbConfig);
            this._avrChart.reload(dbConfig);
            this._sucChart.reload(dbConfig);
        },

        fresh: function() {
            $.get('/serverinfo/' + this.serverName, {}, this.freshCallback);
        },

        _cpu_prct: 0,
        _mem_prct: 0,

        express: function(data) {
            var monInfo = $.parseJSON(data);
            var stat = monInfo.stat, db = monInfo.db;

            this._switchCpu(stat);
            this._switchMem(stat.vmem);
            this._swichQualify(db);

            this._freshChart(this._sysChart, [this._cpu_prct, this._mem_prct]);
            this._freshChart(this._tpsChart, db.tps);
            this._freshChart(this._avrChart, db.avgresp);
            this._freshChart(this._sucChart, db.feedsuc);
        },

        _freshChart: function(chart, data) {
            if (chart && chart.loaded) {
                chart.fresh(data);
            }
        },

        _switchCpu: function(stat) {
            $('.cpu-percent').text(switchPrct(stat.cpuprct));
            this._cpu_prct = stat.cpuprct;

            var html = '';
            var cputimes = stat.cputimes;
            for (var p in cputimes) {
                html += '<tr><th width="100px">' + p +
                    '</th><td class="cell_r">' + toPrec(cputimes[p], 2) +
                    '</td></tr>';
            }

            $('.cpu-info > .mon-tab').html(html);
        },

        _mem_dict: ['total', 'used', 'free'],

        _switchMem: function(vmem) {
            $('.mem-percent').text(switchPrct(vmem.percent));
            this._mem_prct = vmem.percent;
            delete vmem.percent;

            var html = '', md = this._mem_dict;
            for (var i = 0; i < md.length && vmem[md[i]]; i++) {
                html += '<tr><th width="100px">' + md[i] +
                    '</th><td class="cell_r">' + calc(vmem[md[i]]) +
                    '</td></tr>';
                delete vmem[md[i]];
            }

            for (var p in vmem) {
                html += '<tr><th width="100px">' + p +
                    '</th><td class="cell_r">' + calc(vmem[p]) +
                    '</td></tr>';
            }

            $('.mem-info > .mon-tab').html(html);
        },

        _swichQualify: function(qual) {
            $('.tps-val').text(switchUndef(qual.tps));
            $('.avr-val').text(switchUndef(qual.avgresp) + ' ms');
            $('.suc-val').text(switchPrct(qual.feedsuc));
        },

        _historyStart: '',

        loadHistory: function(direct) {
            if (direct === undefined) {
                this._addHistoryTitle();
                this._historyStart = '';
                direct = '';
            }

            $.post('/history',
                [
                    '{"svr_nm":"',
                    this.serverName,
                    '","start":"',
                    this._historyStart,
                    '","direct":"',
                    direct,
                    '"}'
                ].join(''),
                function(data) {
                    monitor._historyCallback(data);
                }
            );
        },

        _historyCallback: function(data) {
            if (typeof data === 'string')
                data = $.parseJSON(data);

            this._historyStart = data.stime;

            var stime = parseInt(this._historyStart.substring(8, 10));
            if (stime === 0)
                data.shour = 20;
            else
                data.shour = stime - 4;

            data.ehour = stime;
            data.eminu = 0;

            this._reloadChart(data);

            var hisDate = $('.his-date');
            hisDate.datepicker();
            hisDate.datepicker('option', 'dateFormat', 'yy-mm-dd');

            var year = this._historyStart.substring(0, 4),
                month = this._historyStart.substring(4, 6),
                day = this._historyStart.substring(6, 8),
                hour = this._historyStart.substring(8),
                delta = 0;
            if (hour === '00') {
                delta = -1;
            }
            var d = changeDate([year, month, day].join('-'), delta)
            hisDate.val(d);
        },

        _addHistoryTitle: function() {
            clearInterval(this._timer);
            $('h1.page-header').text('历史记录 - ' + this.serverName);
            $('.humanized').each(function() {
                $(this).addClass('hide');
            });
            $('.page-btn').removeClass('hide');
            $('.his-date').change(function() {
                monitor._historyStart = this.value.replace(/-/g, '') + '08';
                monitor.loadHistory('f');
            });
        }
    };
};

var monitor = new MonitorBoard();

/**
 * Created by liushuang on 11/17/16.
 */

var SetBoard = function() {
    return {
        version: 'Set Board v1.0.0',
        _content: [
            '<div class="panel panel-primary set-board" style="display: none">',
                '<div class="panel-heading">',
                    '<h3 class="panel-title">设置</h3>',
                '</div>',
                '<h3 style="text-align: center;">受控机管理</h3>',
                '<div class="panel-body set-list"></div>',
                '<div class="set-panel-bottom">',
                    '<button type="button" class="btn btn-sm btn-info btn-save">保存</button>',
                    '<button type="button" class="btn btn-sm btn-info btn-add">新增</button>',
                    '<button type="button" class="btn btn-sm btn-default btn-cancle">关闭</button>',
                '</div>',
                '<div class="alert hide hint-bar" role="alert"></div>',
            '</div>'].join(''),

        setEl: null,

        create: function(config) {
            var self = this;

            for (var p in self) {
                if (config.hasOwnProperty(p)) {
                    self[p] = config[p];
                }
            }

            $('body').append(self._content);

            var setBoard = $('.set-board');
            var left = window.screen.width - setBoard.width() - 5;
            setBoard.offset({left: left});

            if (typeof self.setEl === 'string') {
                self.setEl = $(self.setEl);
            }
            self.setEl.click(function() {
                $('div.hint-bar').addClass('hide');
                setBoard.toggle("fast", function() {
                    self.setHandler();
                });
            });

            $('.btn-save').click(function() {
                setter._save();
            });
            $('.btn-add').click(function() {
                setter._add();
            });
            $('.btn-cancle').click(function() {
                setter._close();
            });
        },

        _opened: false,

        setHandler: function() {
            this._opened = !this._opened;

            if (this._opened === false) {
                $('.panel-body').html('');
                return;
            }

            $.post('/setter', {
                type: 'query'
            }, function (data) {
                if (typeof data === 'string') {
                    data = $.parseJSON(data);
                }

                var html = '<table class="table host-list" style="width: 90%; margin: auto;"><tbody>';
                for (var n in data) {
                    html += [
                        '<tr><td class="cell_c" width=""><input type="hidden" value="',
                        data[n].server,
                        '">', data[n].server,
                        '</td><td><input type="text" style="text-align: center;" size="13" value="',
                        data[n].host,
                        '"><strong> : </strong><input type="text" style="text-align: center;" size="4" value="',
                        data[n].port,
                        '"></td><td><strong class="btn-del" title="删除">X</strong>',
                        '</td></tr>'
                    ].join('');
                }
                html += "</tbody></table>";
                $('.panel-body').html(html);

                $('.btn-del').each(function() {
                    $(this).click(function () {
                        setter._del(this);
                    });
                });
            }, 'json');
        },

        _hint: function (content, type) {
            if (!type)
                type = 'f';

            var hint = '',
                hintDiv = $('div.hint-bar');
            if (type === 's') {
                hint = ['<strong>', content, '</strong>'].join('');
                hintDiv.removeClass('alert-danger hide').addClass('alert-success');
            } else {
                hint = ['<strong>错误！</strong>', content].join('');
                hintDiv.removeClass('alert-success hide').addClass('alert-danger');
            }

            hintDiv.html(hint);
        },

        _save: function() {
            var self = this,
                json = '[',
                result = true;

            $('.panel-body :text, .panel-body :hidden')
                .each(function (index) {
                    var val = this.value.trim();
                    if (val === '') {
                        self._hint('不能包含空值');
                        result = false;
                        return false;
                    }

                    if (index % 3 === 0) {
                        json += '{"server":"' + val + '",';
                    } else if (index % 3 === 1) {
                        if (!verifyIPv4(val)) {
                            self._hint('IP地址格式不正确');
                            result = false;
                            return false;
                        }
                        json += '"host":"' + val + '",';
                    } else {
                        if (!verifyPort(val)) {
                            self._hint('端口应为0-65535之间的数字');
                            result = false;
                            return false;
                        }
                        json += '"port":' + val + '},';
                    }
                });

            if (!result)
                return;

            json = json.replace(/,?$/, ']');

            $.post('/setter', {
                type: 'save',
                data: json
            }, function(data) {
                if (typeof data === 'string')
                    data = $.parseJSON(data);

                if (data.status === 'ok') {
                    self._hint('保存成功', 's');

                    $('.panel-body :text, .panel-body :hidden')
                        .each(function (index) {
                            if (index % 3 > 0 ||
                                    this.getAttribute('type') !== 'text')
                                return true;

                            var t = this.value;
                            $(this).parent().html(['<input type="hidden" value="',
                                t, '">', t].join(''));
                        });
                } else {
                    self._hint('保存失败');
                }
            }, 'json')
        },

        _add: function() {
            var html = ['<tr><td class="cell_c" width=""><input type="text" value=""></td>',
                '<td><input type="text" style="text-align: center;" size="13" value="">',
                '<strong> : </strong><input type="text" style="text-align: center;" size="4" value=""></td>',
                '<td><strong class="btn-del" title="删除">X</strong></td></tr>'].join('');

            $('table.host-list > tbody').append(html);
            $('table.host-list > tbody td:last > .btn-del')
                .click(function () {
                    setter._del(this);
                });
        },

        _del: function(el) {
            $(el).parent().parent().remove();
        },

        _close: function() {
            if (!this._opened) {
                return;
            }

            $('.set-board').css('display', 'none');
            $('.panel-body').html('');
            this._opened = false;
        }
    };
};

var setter = new SetBoard();
