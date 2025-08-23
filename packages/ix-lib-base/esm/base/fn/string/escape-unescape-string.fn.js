/**
 * 目前不推薦使用escape對URI進行編碼或其他操作，請改用encodeURI或encodeURIComponent
 *
 * escape產出值為%uXXXX 是UTF-16編碼
 *
 * escape不編碼字元：*+-./@_0-9a-zA-Z
 *
 * @deprecated
 * @example
 * ```
 * _escape(undefined) // 'undefined'
 * _escape(null) // 'null'
 * _escape(123) // '123'
 * _escape({}) // '%5Bobject%20Object%5D' 就是一律先轉字串再escape
 * _escape(function(){}) // 'function%28%29%7B%7D'
 * _escape(' !"#$%&') // '%20%21%22%23%24%25%26'
 * _escape("'()*+,-./0123456789:;<=>?@") // '%27%28%29*+%2C-./0123456789%3A%3B%3C%3D%3E%3F@'
 * _escape('ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]') // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D' '\'前要加個\否則會被當跳脫字元
 * _escape('^_`abcdefghijklmnopqrstuvwxyz{|}~') // '%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D%7E'
 * _escape('一') // '%u4E00' 返回Unicode編碼值
 * _escape('𫝀') // '%uD86D%uDF40' Unicode第二輔助平面文字
 * ```
 */
export function _escape(val) {
    return escape(val);
}
/**
 * 目前不推薦使用unescape對URI進行解碼或其他操作，請改用decodeURI或decodeURIComponent
 *
 * @deprecated
 * @example
 * ```
 * _unescape(undefined) // 'undefined'
 * _unescape(null) // 'null'
 * _unescape(123) // '123'
 * _unescape({}) // '[object Object]' 就是一律先轉字串
 * _unescape(function(){}) // 'function(){}'
 * _unescape('%20%21%22%23%24%25%26') //  !"#$%&'
 * _unescape('%27%28%29*+%2C-./0123456789%3A%3B%3C%3D%3E%3F@') // "'()*+,-./0123456789:;<=>?@"
 * _unescape('ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D') // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]' '%5C'會解成'\\'
 * _unescape('%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D%7E') // '^_`abcdefghijklmnopqrstuvwxyz{|}~'
 * _unescape('%u4E00') // '一'
 * _unescape('%uD86D') // '\uD86D'
 * _unescape('%uD86D%uDF40') // '𫝀' Unicode第二輔助平面文字
 * _unescape('%FF') // 'ÿ' 解碼在\x00~\xFF範圍
 * _unescape('%u00FF') // 'ÿ' 解碼UTF-16
 * _unescape('%u01FF') // 'ǿ'
 * ```
 */
export function _unescape(val) {
    return unescape(val);
}
