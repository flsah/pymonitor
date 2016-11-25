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
        return "0.0 %";
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
