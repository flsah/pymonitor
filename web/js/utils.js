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
