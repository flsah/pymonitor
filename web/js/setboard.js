/**
 * Created by liushuang on 11/17/16.
 */

var SetBoard = function() {
    return {
        version: 'Set Board v1.0.0',
        _content:
            '<div class="panel panel-primary set-board" style="display: none">\
                <div class="panel-heading">\
                    <h3 class="panel-title">设置</h3>\
                </div>\
                <h3 style="text-align: center;">受控机管理</h3>\
                <div class="panel-body set-list"></div>\
                <div class="set-panel-bottom">\
                    <button type="button" class="btn btn-sm btn-info btn-save">保存</button>\
                    <button type="button" class="btn btn-sm btn-info btn-add">新增</button>\
                    <button type="button" class="btn btn-sm btn-default btn-cancle">关闭</button>\
                </div>\
                <div class="alert hide hint-bar" role="alert"></div>\
            </div>',

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
                        data[n]['server'],
                        '">', data[n]['server'],
                        '</td><td><input type="text" style="text-align: center;" size="13" value="',
                        data[n]['host'],
                        '"><strong> : </strong><input type="text" style="text-align: center;" size="4" value="',
                        data[n]['port'],
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

                if (data['status'] === 'ok') {
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
            var html = '<tr><td class="cell_c" width=""><input type="text" value=""></td>\
                <td><input type="text" style="text-align: center;" size="13" value="">\
                <strong> : </strong><input type="text" style="text-align: center;" size="4" value=""></td>\
                <td><strong class="btn-del" title="删除">X</strong></td></tr>';

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
