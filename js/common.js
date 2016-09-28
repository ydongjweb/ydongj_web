var App = {
    testHost: 'http://data.ydongj.com/ydj/',//'http://106.75.138.89:9100/ydj/',
    host: 'http://data.ydongj.com/ydj/',
}

function initCommon() {
    var now = new Date();
    var str = now.Format('yyyy-MM-dd');
    $('.date-input').datepicker({
        'dateFormat': 'yy-mm-dd',
        'monthNames': ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        'dayNamesMin': ['日', '一', '二', '三', '四', '五', '六'],
        'dayNames': ['日', '一', '二', '三', '四', '五', '六'],
    }).val(str);
}




function getByAjax(obj) {
    var ajaxUrl = '';

    if (/localhost|192.168/i.test(location.href)) {
        ajaxUrl = App.testHost + obj.url;
    } else {
        ajaxUrl = App.host + obj.url;
    }
    $.ajax({
    	url: ajaxUrl,
    	contentType: 'application/json',
    	type: 'POST',
    	data: obj.data,
    	dataType: 'json',
    	success: function(data) {
    		obj.success && obj.success(data);
    	},
    	error: function(err) {
    		obj.error && obj.error(err);
    	}
    })
}

function addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.Format('yyyy-MM-dd');
}

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
