/**
 * Created by liushuang on 11/18/16.
 */

var MonitorBoard = function() {
    return {
        version: 'Monitor Board 1.0.0',

        _content: '<h1 class="page-header"></h1>\
            <div class="page-btn hide">\
                <input type="text" class="his-date" readonly>\
                <button type="button" class="btn btn-sm btn-primary forward">&lt;&lt; 前4小时</button>\
                <button type="button" class="btn btn-sm btn-primary backward">后4小时 &gt;&gt;</button>\
            </div>\
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
                            minValue: 0
                        },
                        legend: 'left',
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#FF7E40']
                    },
                    dispEl: document.getElementById('tps_chart'),
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
                            minValue: 0
                        },
                        legend: 'left',
                        lineWidth: 0.7,
                        areaOpacity: 0.5,
                        colors: ['#45C098']
                    },
                    dispEl: document.getElementById('avr_chart'),
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
                    dispEl: document.getElementById('suc_chart'),
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
            $('.cpu-percent').text(switchPrct(stat['cpuprct']));
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
            $('.mem-percent').text(switchPrct(vmem['percent']));
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
            $('.tps-val').text(switchUndef(qual['tps']));
            $('.avr-val').text(switchUndef(qual['avgresp']) + ' ms');
            $('.suc-val').text(switchPrct(qual['feedsuc']));
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

            this._historyStart = data['stime'];

            var stime = parseInt(this._historyStart.substring(8, 10));
            if (stime == 0)
                data['shour'] = 20;
            else
                data['shour'] = stime - 4;

            data['ehour'] = stime;
            data['eminu'] = 0;

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
