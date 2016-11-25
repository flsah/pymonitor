/**
 * Created by liushuang on 11/11/16.
 */

var MonitorChart = function() {
    return {
        version: 'MonitorChart 1.0.0',

        id: '',

        constructor: MonitorChart,

        // see https://google-developers.appspot.com/chart/interactive/docs/gallery/areachart#configuration-options
        googleChartOpt: null,

        // google.visualization.AreaChart instance
        _vchart: null,

        // chart display position, should be a DOM element
        dispEl: null,

        // chart move direction left-to-right ('l-r') or right-to-left ('r-l')
        direction: 'l-r',

        // chart data, stored by two-dimensional array
        data: null,

        // the index of source data, multi values can use array to indicate(like [2, 4, 6]),
        // or use range expression like '2..4' (2nd to 4th)
        index: 0,

        // x-axis start time
        start: 0,

        // current hour and minute
        ctime: [-1, -1],

        // the spaces between two datum point in the chart graph, unit is pixel
        space: 5,

        // data array length
        count: 240,

        // time cross, unit is hour
        cross: 4,

        // chart area illustrations
        illustration: [],

        // ajax request uri
        uri: '',

        // ajax request parameters
        ajaxParam: {},

        // ajax callback function
        callback: null,

        // chart load status
        loaded: false,

        // chart data after translated
        _chartData: null,

        // onLoadCallback function
        onLoadCallback: null,

        // data point's current position
        _curPos: 0,

        create: function (config) {
            for (var p in this) {
                if (!this.hasOwnProperty(p) || !config.hasOwnProperty(p))
                    continue;

                this[p] = config[p];
            }

            if (!this.googleChartOpt || !(this.googleChartOpt instanceof Object)) {
                throw new Error('googleChartOpt must be specified.');
            }

            this._load();

            google.charts.load('current', {'packages': ['corechart']});
            google.charts.setOnLoadCallback(this.onLoadCallback);
        },

        _reloadProp: ['data', 'start', 'ctime'],

        reload: function (config) {
            var prop = this._reloadProp;

            for (var i = 0; i < prop.length; i++) {
                if (config.hasOwnProperty(prop[i]))
                    this[prop[i]] = config[prop[i]];
            }

            this._load();
            this.draw();
        },

        _load: function() {
            var pref = 0;
            if (this.data.length > 0) {
                var last = this.data[this.data.length - 1];
                var ehour = last[last.length - 2],
                    emin = last[last.length - 1];
                pref = (ehour - this.start) * 60 + emin - this.data.length;
            }

            pref = pref > 0 ? pref : 0;

            var larr = [this.illustration], tarr = null, datarr = null;
            var ix = this._index(), size = this.illustration.length;

            if (this.direction === 'l-r') {
                larr = larr.concat(this._fillBlank(1, pref + 1));
                pref++;

                for (var i = 0; i < this.data.length; i++, pref++) {
                    tarr = new Array(size);
                    tarr[0] = this._haxis(pref);

                    datarr = this.data[i];
                    for (var j = 0; j < ix.length; j++) {
                        tarr[j + 1] = datarr[ix[j]];
                    }

                    larr.push(tarr);
                }
                this._curPos = pref;

                larr = larr.concat(this._fillBlank(pref, this.count + 1));

                // bug of google charts, when no valid data put
                // into DataTable, the charts will get an error.
                // So take a valid array into first of DataTable
                if (this.data.length === 0) {
                    for (i = 0; i < ix.length; i++) {
                        larr[1][i + 1] = 0;
                    }
                }
            }
            // TODO implements r-l

            this._chartData = larr;
        },

        draw: function () {
            var vdata = google.visualization.arrayToDataTable(this._chartData);

            if (this._vchart === null) {
                this._vchart = new google.visualization.AreaChart(this.dispEl);
            }

            this._vchart.draw(vdata, this.googleChartOpt);
            this.loaded = true;
        },

        fresh: function (data) {
            var arr = null;
            if (this._curPos > this.count) {
                arr = new Array(this.illustration.length);
                arr[0] = this._haxis(this._curPos);
            } else {
                arr = this._chartData[this._curPos];
            }

            if (data instanceof Array) {
                for (var i = 0; i < data.length; i++) {
                    arr[i + 1] = data[i];
                }
            } else {
                arr[1] = data;
            }

            if (this._curPos > this.count) {
                this._chartData.splice(1, 1);
                this._chartData.push(arr);
            }

            this.draw();
            this._curPos++;
        },

        _haxis: function (ix) {
            var s = this.start,
                m = (ix - 1) % 60,
                time_point = (s < 10 ? '0' + s : s) + ':' +
                             (m < 10 ? '0' + m : m);

            if (m == 59) {
                this.start++;
                if (this.start === 24)
                    this.start = 0;
            }

            return time_point;
        },

        _index: function () {
            var ix = this.index;
            if (typeof ix === 'string') {
                var ixa = [];
                if (ix.indexOf('..') > 0) {
                    var pa = ix.split('..');
                    for (var i = parseInt(pa[0]); i <= parseInt(pa[1]); i++)
                        ixa.push(i);

                    return ixa;
                }
            }

            if (typeof ix === 'number') {
                return [ix];
            }

            if (ix instanceof Array) {
                return ix;
            }

            return [];
        },

        _fillBlank: function(start, end) {
            var ix = this._index().length;
            var tarr = null, larr = [];

            for (var i = start; i < end; i++) {
                tarr = new Array(ix + 1);
                tarr[0] = this._haxis(i);

                for (var j = 0; j < ix; j++) {
                    tarr[j + 1] = null;
                }

                larr.push(tarr);
            }

            return larr;
        }
    };
};

// shortcut of MonitorChart
var mchart = function(config) {
    var chart = new MonitorChart();
    chart.create(config);

    return chart;
};
