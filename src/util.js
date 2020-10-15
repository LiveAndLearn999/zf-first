/**
 * 扁平化变为树结构
 * @param list
 * @param id
 * @param parent_id
 */
function buildTree(list, id, parent_id) {
    if (typeof id == 'undefined') {
        id = 'uuid';
    }

    if (typeof parent_id == "undefined") {
        parent_id = 'parent_uuid';
    }

    let temp = {};
    let tree = [];
    for (let i in list) {
        temp[list[i][id]] = list[i];
    }
    for (let i in temp) {
        if (temp[i][parent_id]) {
            if (!temp[temp[i][parent_id]].children) {
                temp[temp[i][parent_id]].children = new Array();
            }
            temp[temp[i][parent_id]].children.push(temp[i]);
        } else {
            tree.push(temp[i]);
        }
    }
    return tree;
}


function toTree(data, parent_uuid = '') {
    let tree = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
        if (data[i].parent_uuid == parent_uuid) {
            let obj = data[i];
            temp = toTree(data, data[i].uuid);
            if (temp.length > 0) {
                obj.children = temp;
            }
            tree.push(obj);
        }
    }
    return tree;
}

function toTrees(data, parent_uuid = 0) {
    let tree = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
        if (data[i].parent_uuid == parent_uuid) {
            let obj = data[i];
            temp = toTrees(data, data[i].uuid);
            if (temp.length > 0) {
                obj.children = temp;
            }
            tree.push(obj);
        }
    }
    return tree;
}


function number_format(number, decimals, dec_point, thousands_sep) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/**
 * 获取页面的最大z-index的值
 * @return {[type]} [description]
 */
function getMaxZIndex() {
    let arr = [...document.all].map(e => +window.getComputedStyle(e).zIndex || 0);
    return arr.length ? Math.max(...arr) + 1 : 0
}


/**
 * 字符串转日期格式，strDate要转为日期格式的字符串
 * alert(getDate("2016-06-14"));
 * @param  {[type]} strDate [description]
 * @return {[type]}         [description]
 */
function getDate(strDate) {
    let date = new Date(strDate);
    return date;
}

/**
 * 日期根式转换为字符串
 * @param  {[type]} d   [description]
 * @param  {String} fmd [description]
 * @return {[type]}     [description]
 */
function dateString(d, fmd = 'yyyy-MM-dd') {

    Date.prototype.pattern = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份         
            "d+": this.getDate(), //日         
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
            "H+": this.getHours(), //小时         
            "m+": this.getMinutes(), //分         
            "s+": this.getSeconds(), //秒         
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
            "S": this.getMilliseconds() //毫秒         
        };

        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" :
                "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    let date = new Date(d);
    return date.pattern(fmd);
}




/**
 * 字符串转日期格式，strDate要转为日期格式的字符串
 * 测试 
 * alert(getDate("2016-6-14 11:20:00")); 
 * @param  {[type]} strDate [description]
 * @return {[type]}         [description]
 */
function getDateTime(strDate) {
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = a[1].split(":");
    var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
    return date;
}

/**
 * 虚拟加载的缓存处理数据
 * @param  Array  data  []
 * @param  Int    page_num = 1
 * @param  Int    page_len = 10
 * @return Array
 */
function dataSlice(data, page_num = 1, page_len = 10) {
    let start = page_num - 1;
    if (start <= 0) {
        start = 0;
    }
    start *= page_len; // 切割开始位置

    if (data.length <= start) {
        return [];
    } else {
        return data.slice(start, page_len);
    }
}

/**
 * 检测接口是否为授权接口
 * @param  {[type]} api_module [description]
 * @param  {Array}  menus      [description]
 * @param  {[type]} login_info [description]
 * @param  {String} api_ver    [description]
 * @return {[type]}            [description]
 */
function checkLevelMenu(api_module, menus = [], api_ver = "1.0.0") {
    let menu = {};
    for (let i = 0; i < menus.length; i++) {
        if (!menus[i].api_module && !menus[i].api_ver) {
            if (api_module == menus[i] && api_ver == menus[i].api_ver) {
                return true;
            }
        }
    }

    return false;
}

/**
 * 获取存储数据
 * @param {Object} key
 * @return mixed
 */
function storage_get(key, is_timeout = true){
    let _data = localStorage.getItem(key);
    if (!_data || _data == '' || _data == null || typeof _data == undefined) {
        return null;
    }
    
    _data = JSON.parse(_data);
    
    // 是否有时间限制 true:有时间限制,false:无时间限制
    if(is_timeout == true) {
        if (_data.timeout < get_timestamp()){
            return null;
        }
    }
    
    
    return _data.data;
}

/**
 * 存储数据
 */
function storage_set(key, value, timeout = 7200) {
    if (timeout <= 0){
        timeout = 0;
    }
    
    let _data = {
        timeout: get_timestamp() + timeout,
        data:value
    }
    localStorage.setItem(key, JSON.stringify(_data));
}

/**
 * 获取时间戳,单位秒
 */
function get_timestamp() {
    return parseInt(Date.parse(new Date())/ 1000);
}


function reg_mobile(m) {
    const reg = /^1[3-9]{1}[0-9]{9}$/;
    if (reg.test(m)) {
        return true;
    }
    return false;
}

function reg_pwd(p){
    if (!p) {
        return false;
    }

    if(p.length < 6 || p.length > 20) {
        return false;
    }
    return true;
}

/**
 * 子菜单点击
 * @param  {[type]} menu        [description]
 * @param  {[type]} _this       [description]
 * @param  {[type]} login_token [description]
 * @param  {[type]} local       [description]
 * @return {[type]}             [description]
 */
function submenu(menu, _this, login_token, local) {
    console.log(menu);
    if (login_token == null) {
        _this.$message.error('登录超时,请重新登录');
        _this.curr_row = {};
        _this.$router.push('/login');
        return false;
    }

    if (local === false) {
        if (menu.font_type == 0) {
            _this.$router.push(menu.font_url);
        } else if (menu.font_type == 1) {
            if (!_this[menu.font_url]) {
                _this.$message.error('功能还未开放,请稍后');
                return false;
            }
            _this[menu.font_url](menu);
        } else if (menu_font_type == 2) {
            window.open(menu.font_url);
        } else {
            _this.$router.push('/admin/');
        }
    } else {
        if (!_this[menu]) {
            _this.$message.error('功能还未开放,请稍后');
            return false;
        }

        _this[menu]();
    }
}

/**
 * 判断变量值是否为空 undefined null 都是为空
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
function empty(val) {
    if (typeof val == 'undefined' || val == null) {
        return true;
    }
    return false;
}

function eleDate(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}




export default {
    buildTree,
    toTree,
    toTrees,
    
    number_format,
    
    getMaxZIndex,
    
    getDate,
    getDateTime,
    dateString,
    
    dataSlice,
    checkLevelMenu,
    
    storage_get,
    storage_set,
    
    get_timestamp,

    reg_mobile,
    reg_pwd,

    submenu,

    empty,

    eleDate
}
