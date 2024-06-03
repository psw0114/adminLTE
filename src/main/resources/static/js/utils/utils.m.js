export default class Utils {
  /** @type {utils.Constructor} */
  constructor() {}

  /** @type {utils.Utils['empty']} */
  empty(arg) {
    let result = [undefined, null, 0, ''].includes(arg);

    if (!result) {
      if (Array.isArray(arg)) {
        result = (arg.length == 0);
      } else if (typeof arg == 'object') {
        result = ((Object.keys(arg).length == 0) && (Object.keys(Object.getPrototypeOf(arg)).length == 0));
      }4
    }

    return result;
  }

  /** @type {utils.Utils['isNumber']} */
  isNumber(arg, strict = false) {
    let result = (!Number.isNaN(Number(arg)) && ['number', 'string'].includes(typeof arg) && (!/^\s*$/.test(arg)));

    if (result && strict) {
      result = (typeof arg == 'number');
    }

    return result;
  }

  /** @type {utils.Utils['isObject']} */
  isObject(arg) {
    return ((typeof arg == 'object') && !Array.isArray(arg));
  }

  /** @type {utils.Utils['numberFormat']} */
  numberFormat(num, decimals = 0, decimal_separator = '.', thousands_separator = ',') {
    let result = String(num).split('.');

    result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_separator);

    if (!this.empty(result[1])) {
      result[1] = result[1].substring(0, decimals);
    }

    return (!this.empty(result[1])) ? result[0].concat(decimal_separator, result[1]) : result[0];
  }

  /** @type {utils.Utils['strftime']} */
  strftime(date, format) {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    format = format.replace(/(%{1})/g, '\\$1');
    format = format.replace(/(\\%) {2}/g, '%');
    format = format.replace(/\\%Y/g, String(date.getFullYear()));
    format = format.replace(/\\%y/g, String(date.getFullYear()).replace(/^\d+(\d{2})$/, '$1'));
    format = format.replace(/\\%B/g, month[date.getMonth()]);
    format = format.replace(/\\%b/g, month[date.getMonth()].replace(/^(\w{3})\w*$/, '$1'));
    format = format.replace(/\\%m/g, String(date.getMonth() + 1).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%d/g, String(date.getDate()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%A/g, week[date.getDay()]);
    format = format.replace(/\\%a/g, week[date.getDay()].replace(/^(\w{3})\w*$/, '$1'));
    format = format.replace(/\\%H/g, String(date.getHours()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%I/g, String((date.getHours() > 12) ? (date.getHours() - 12) : date.getHours()).replace(/^0$/, '12').replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%p/g, (date.getHours() < 12) ? 'AM' : 'PM');
    format = format.replace(/\\%M/g, String(date.getMinutes()).replace(/^(\d{1})$/, '0$1'));
    format = format.replace(/\\%S/g, String(date.getSeconds()).replace(/^(\d{1})$/, '0$1'));

    return format;
  }

  /** @type {utils.Utils['checkdate']} */
  checkdate(year, month, day) {
    const date = new Date(year, (month - 1), day);

    return ((date.getFullYear() == year) && ((date.getMonth() + 1) == month) && (date.getDate() == day));
  }

  /** @type {utils.Utils['equaldate']} */
  equaldate(date_1, date_2 = new Date()) {
    return (this.strftime(date_1, '%Y-%m-%d') == this.strftime(date_2, '%Y-%m-%d'));
  }

  /** @type {utils.Utils['getWeek']} */
  getWeek(date, flag = true) {
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    result = week[date.getDay()];

    return (flag) ? result : result.replace(/^([ㄱ-ㅎㅏ-ㅣ가-힣]{1})[ㄱ-ㅎㅏ-ㅣ가-힣]+$/, '$1');
  }

  /** @type {utils.Utils['addDate']} */
  addDate(date, interval) {
    return new Date(
      date.getFullYear() + (this.isNumber(interval.year, true) ? interval.year : 0),
      date.getMonth() + (this.isNumber(interval.month, true) ? interval.month : 0),
      date.getDate() + (this.isNumber(interval.day, true) ? interval.day : 0),
      date.getHours() + (this.isNumber(interval.hour, true) ? interval.hour : 0),
      date.getMinutes() + (this.isNumber(interval.minute, true) ? interval.minute : 0),
      date.getSeconds() + (this.isNumber(interval.second, true) ? interval.second : 0),
      date.getMilliseconds() + (this.isNumber(interval.millisecond, true) ? interval.millisecond : 0)
    );
  }

  /** @type {utils.Utils['subDate']} */
  subDate(date, interval) {
    return new Date(
      date.getFullYear() - (this.isNumber(interval.year, true) ? interval.year : 0),
      date.getMonth() - (this.isNumber(interval.month, true) ? interval.month : 0),
      date.getDate() - (this.isNumber(interval.day, true) ? interval.day : 0),
      date.getHours() - (this.isNumber(interval.hour, true) ? interval.hour : 0),
      date.getMinutes() - (this.isNumber(interval.minute, true) ? interval.minute : 0),
      date.getSeconds() - (this.isNumber(interval.second, true) ? interval.second : 0),
      date.getMilliseconds() - (this.isNumber(interval.millisecond, true) ? interval.millisecond : 0)
    );
  }

  /** @type {utils.Utils['checkAll']} */
  checkAll(node, name) {
    /** @type {NodeListOf<HTMLInputElement>} */
    const el_list = document.querySelectorAll(`input[type="checkbox"][data-name='${name}']`);

    el_list.forEach((el, i, arr) => {
      el.checked = node.checked;
    });
  }

  /** @type {utils.Utils['xor']} */
  xor(arg_1, arg_2) {
    return (!(arg_1 && arg_2) && (arg_1 || arg_2));
  }

  /** @type {utils.Utils['setCookie']} */
  setCookie(key, value, expire, path = '/', domain = location.hostname) {
    if (this.empty(expire)) {
      expire = new Date();

      expire.setDate(expire.getDate() + 1);
    }

    document.cookie = `${key}=${value}; expires=${expire.toUTCString()}; path=${path}; domain=${domain}`;
  }

  /** @type {utils.Utils['getCookie']} */
  getCookie(key) {
    let result = document.cookie.split('; ').find((val, i , arr) => {
      return val.startsWith(key);
    });

    if (!this.empty(result)) {
      result = result.split('=')[1];
    } else {
      result = null;
    }

    return result;
  }

  /** @type {utils.Utils['popCookie']} */
  popCookie(key, path = '/', domain = location.hostname) {
    const expire = new Date();

    expire.setDate(expire.getDate() - 1);

    document.cookie = `${key}=; expires=${expire.toUTCString()}; path=${path}; domain=${domain}`;
  }

  /** @type {utils.Utils['formDataToJson']} */
  formDataToJson(form_data) {
    return JSON.stringify(Object.fromEntries([...new Set(form_data.keys())].map((key) => [key, (form_data.getAll(key).length > 1) ? form_data.getAll(key) : form_data.get(key)])));
  }

  /** @type {utils.Utils['percentage']} */
  percentage(num, per) {
    return num * (per / 100);
  }

  /** @type {utils.Utils['ratio']} */
  ratio(ratio, num, flag = true) {
    const index = flag
      ? [1, 0]
      : [0, 1];

    return (num * ratio[index[0]]) / ratio[index[1]];
  }

  /** @type {utils.Utils['arithmeticSequence']} */
  arithmeticSequence(a, x, d, n) {
    return a + ((n - x) * d);
  }

  /** @type {utils.Utils['geometricSequence']} */
  geometricSequence(a, x, r, n) {
    return (a / (r ** (x - 1))) * (r ** (n - 1));
  }

  /** @type {utils.Utils['decimalAdjust']} */
  decimalAdjust(type, value, exp = 0) {
    const [m, n = 0] = value.toString().split('e'),
    adjust_value = Math[type](`${m}e${parseInt(n) + exp}`),
    [nm, nn = 0] = adjust_value.toString().split('e');

    return Number(`${nm}e${parseInt(nn) - exp}`);
  }

  /** @type {utils.Utils['decodeHtmlEntity']} */
  decodeHtmlEntity(arg) {
    const textarea = document.createElement('textarea');

    textarea.innerHTML = arg;

    return textarea.innerText;
  }


}