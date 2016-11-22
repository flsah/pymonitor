/**
 * Created by liushuang on 11/18/16.
 */

var MonitorBoard = function() {
    return {
        version: 'Monitor Board 1.0.0',

        _content: '<h1 class="page-header"></h1>\
            <div class="mon-info">\
                <div class="mon-div cpu-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text">CPU</div>\
                        <div class="humanized cpu-percent"></div>\
                        <div class="title-text">内存</div>\
                        <div class="humanized mem-percent"></div>\
                    </h2>\
                    <div id="sys_chart" class="normal-chart"></div>\
                </div>\
                <div class="mon-div tps-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text">TPS</div>\
                        <div class="humanized tps-val"></div>\
                    </h2>\
                    <div id="tps_chart" class="normal-chart"></div>\
                </div>\
                <div class="mon-div avr-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text long-text">平均响应时间</div>\
                        <div class="humanized avr-val"></div>\
                    </h2>\
                    <div id="avr_chart" class="normal-chart"></div>\
                </div>\
                <div class="mon-div suc-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text long-text">报文返回成功率</div>\
                        <div class="humanized suc-val"></div>\
                    </h2>\
                    <div id="suc_chart" class="normal-chart"></div>\
                </div>\
            </div>\
            <div class="detail-panel">\
                <div class="cpu-info" style="display: none;">\
                    <h4>CPU</h4>\
                    <table class="mon-tab"></table>\
                </div>\
                <div class="mem-info" style="display: none;">\
                    <h4>Memory</h4>\
                    <table class="mon-tab"></table>\
                </div>\
            </div>',

        dispEle: null,

        freshCallback: null,

        createCallback: null,

        serverName: null,

        interval: 60000,

        _timer: 0,

        init: function (config) {
            for (var p in this) {
                if (this.hasOwnProperty(p) && config[p]) {
                    this[p] = config[p];
                }
            }

            if (!this._loaded) {
                if (this.dispEle && typeof this.dispEle === 'string') {
                    this.dispEle = $(this.dispEle);
                }
                this.dispEle.html(this._content);
            }

            this._addTitle();
            this.fresh();
            this._initChart();

            if (this._timer > 0) {
                clearInterval(this._timer);
            }
            this._timer = setInterval(function() {
                monitor.fresh();
            }, this.interval);
        },

        _addTitle: function() {
            $('h1.page-header').text(this.serverName);
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
                        colors: ['#418CD8', '#80FF80']
                    },
                    dispEle: document.getElementById('sys_chart'),
                    data: data['svr'],
                    index: [0, 1],
                    illustration: ['', 'CPU', '内存'],
                    start: data['shour'],
                    ctime: [data['ehour'], data['eminu']],
                    onLoadCallback: function () {
                        monitor._sysChart.draw();
                    }
                });

                this._tpsChart = mchart({
                    id: 'tps',
                    googleChartOpt: {
                        vAxis: {
                            minValue: 0,
                        },
                        legend: 'left',
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#FF7E40']
                    },
                    dispEle: document.getElementById('tps_chart'),
                    data: data['db'],
                    illustration: ['', ''],
                    start: data['shour'],
                    ctime: [data['ehour'], data['eminu']],
                    onLoadCallback: function () {
                        monitor._tpsChart.draw();
                    }
                });

                this._avrChart = mchart({
                    id: 'averagetime',
                    googleChartOpt: {
                        vAxis: {
                            minValue: 0,
                        },
                        legend: 'left',
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#45C098']
                    },
                    dispEle: document.getElementById('avr_chart'),
                    data: data['db'],
                    index: 1,
                    illustration: ['', ''],
                    start: data['shour'],
                    ctime: [data['ehour'], data['eminu']],
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
                    dispEle: document.getElementById('suc_chart'),
                    data: data['db'],
                    index: 2,
                    illustration: ['', ''],
                    start: data['shour'],
                    ctime: [data['ehour'], data['eminu']],
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
                data: data['svr'],
                start: data['shour'],
                ctime: [data['ehour'], data['eminu']]
            });

            var dbConfig = {
                data: data['db'],
                start: data['shour'],
                ctime: [data['ehour'], data['eminu']]
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
            var stat = monInfo['stat'], db = monInfo['db'];

            this._switchCpu(stat);
            this._switchMem(stat['vmem']);
            this._swichQualify(db);

            this._freshChart(this._sysChart, [this._cpu_prct, this._mem_prct]);
            this._freshChart(this._tpsChart, db['tps']);
            this._freshChart(this._avrChart, db['avgresp']);
            this._freshChart(this._sucChart, db['feedsuc']);
        },

        _freshChart: function(chart, data) {
            if (chart && chart.loaded) {
                chart.fresh(data);
            }
        },

        _switchCpu: function(stat) {
            $('.cpu-percent').text(swichPrct(stat['cpuprct']));
            this._cpu_prct = stat['cpuprct'];

            var html = '';
            var cputimes = stat['cputimes'];
            for (var p in cputimes) {
                html += '<tr><th width="100px">' + p
                        + '</th><td class="cell_r">' + toPrec(cputimes[p], 2)
                        + '</td></tr>';
            }

            $('.cpu-info > .mon-tab').html(html);
        },

        _mem_dict: ['total', 'used', 'free'],

        _switchMem: function(vmem) {
            $('.mem-percent').text(swichPrct(vmem['percent']));
            this._mem_prct = vmem['percent'];
            delete vmem['percent'];

            var html = '', md = this._mem_dict;
            for (var i = 0; i < md.length && vmem[md[i]]; i++) {
                html += '<tr><th width="100px">' + md[i]
                        + '</th><td class="cell_r">' + calc(vmem[md[i]])
                        + '</td></tr>';
                delete vmem[md[i]];
            }

            for (var p in vmem) {
                html += '<tr><th width="100px">' + p
                        + '</th><td class="cell_r">' + calc(vmem[p])
                        + '</td></tr>';
            }

            $('.mem-info > .mon-tab').html(html);
        },

        _swichQualify: function(qual) {
            $('.tps-val').text(qual['tps']);
            $('.avr-val').text(qual['avgresp'] + ' ms');
            $('.suc-val').text(qual['feedsuc'] + ' %');
        }
    };
};

var monitor = new MonitorBoard();

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

function swichPrct(prct) {
    if (isNaN(prct)) {
        return "0.0%";
    }

    prct = parseFloat(prct);
    if (prct == 0) {
        return "0.0 %";
    }

    return toPrec(prct) + ' %';
}

function toPrec(num, prec) {
    if (!prec) {
        prec = 1;
    }

    eval('num = (Math.round(num * 1e' + prec
            + ') / 1e' + prec + ').toString()');

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