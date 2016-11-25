/**
 * Created by liushuang on 11/17/16.
 */

var HistoryBoard = function () {
    return {
        version: 'History Board 1.0.0',

        _content: '<h1 class="page-header"></h1>\
            <div class="mon-info">\
                <div class="mon-div cpu-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text long-text">CPU & 内存</div>\
                    </h2>\
                    <div id="sys_chart" class="normal-chart"></div>\
                </div>\
                <div class="mon-div tps-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text">TPS</div>\
                    </h2>\
                    <div id="tps_chart" class="normal-chart"></div>\
                </div>\
                <div class="mon-div avr-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text long-text">平均响应时间</div>\
                    </h2>\
                    <div id="avr_chart" class="normal-chart"></div>\
                </div>\
                <div class="mon-div suc-info">\
                    <h2 class="sub-header sub-header-p">\
                        <div class="title-text long-text">报文返回成功率</div>\
                    </h2>\
                    <div id="suc_chart" class="normal-chart"></div>\
                </div>\
            </div>',

        el: null,

        dispEl: null,

        serverName: null,

        init: function(config) {
            for (var p in this) {
                if (!this.hasOwnProperty(p))
                    continue;

                if (config[p])
                    this[p] = config[p];
            }

            if (typeof this.el === 'string') {
                this.el = $(this.el);
            }

            this.el.click(this._open);
        },

        _open: function() {
            if (typeof timer === 'number' && timer > 0) {
                clearInterval(timer);
            }

            if (hisBoard.dispEl && typeof hisBoard.dispEl === 'string') {
                hisBoard.dispEl = $(hisBoard.dispEl);
            }
            hisBoard.dispEl.html(hisBoard._content);

            $('h1.page-header').text('历史记录 - ' + currentServer);
        }
    };
};

var hisBoard = new HistoryBoard();
