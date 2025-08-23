/*****
 * 主要用在轉換URL的UTF-8編碼與解碼
 * encode使用情境，如網址參數?comment=def&g=hi，def&g=hi要encode成def%26g%3Dhi就不會被拆成兩個key(comment與g)
 *****/
/**
 * 主要用於網址UTF-8編碼 ex: encodeURI('http://test.com/abc/')
 *
 * encodeURI不編碼字元：!#$&'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~
 *
 * @example
 * ```
 * _encodeURI(undefined) // 'undefined'
 * _encodeURI(null) // 'null'
 * _encodeURI(123) // '123'
 * _encodeURI({}) // %5Bobject%20Object%5D 就是先轉字串再encode
 * _encodeURI(function(){}) // function()%7B%7D 就是先轉字串再encode
 * _encodeURI(' !"#$%&') // '%20!%22#$%25&'
 * _encodeURI("'()*+,-./0123456789:;<=>?@") // "'()*+,-./0123456789:;%3C=%3E?@"
 * _encodeURI('ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]') // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D' '\'前要加個\否則會被當跳脫字元
 * _encodeURI('^_`abcdefghijklmnopqrstuvwxyz{|}~') // '%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~'
 * _encodeURI('一') // '%E4%B8%80'
 * _encodeURI('𫝀') // '%F0%AB%9D%80' Unicode第二輔助平面文字
 * _encodeURI('\uD86D\uDF40') // '%F0%AB%9D%80' Unicode第二輔助平面文字'𫝀'
 * _encodeURI('\uD86D') // throw URIError: URI malformed
 * ```
 */
export declare function _encodeURI(val: string): string;
/**
 * 主要用於網址參數UTF-8編碼 ex: 網址?key=encodeURIComponent('value')
 *
 * encodeURIComponent不編碼字元：!'()*-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~
 *
 * @example
 * ```
 * _encodeURIComponent(undefined) // 'undefined'
 * _encodeURIComponent(null) // 'null'
 * _encodeURIComponent(123) // '123'
 * _encodeURIComponent({}) // '%5Bobject%20Object%5D' 就是先轉字串再encode
 * _encodeURIComponent(function(){}) // 'function()%7B%7D' 就是先轉字串再encode
 * _encodeURIComponent(' !"#$%&') // '%20!%22%23%24%25%26'
 * _encodeURIComponent("'()*+,-./0123456789:;<=>?@") // "'()*%2B%2C-.%2F0123456789%3A%3B%3C%3D%3E%3F%40"
 * _encodeURIComponent('ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]') // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D' '\'前要加個\否則會被當跳脫字元
 * _encodeURIComponent('^_`abcdefghijklmnopqrstuvwxyz{|}~') // '%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~'
 * _encodeURIComponent('一') // '%E4%B8%80'
 * _encodeURIComponent('𫝀') // '%F0%AB%9D%80' Unicode第二輔助平面文字
 * _encodeURIComponent('\uD86D\uDF40') // '%F0%AB%9D%80' Unicode第二輔助平面文字'𫝀'
 * _encodeURIComponent('\uD86D') // throw URIError: URI malformed
 * ```
 */
export declare function _encodeURIComponent(val: string): string;
/**
 * 主要用於網址UTF-8解碼 ex: decodeURI('http://test.com/abc/')
 *
 * @example
 * ```
 * _decodeURI(undefined) // 'undefined'
 * _decodeURI(null) // 'null'
 * _decodeURI(123) // '123'
 * _decodeURI({}) // '[object Object]' 就是一律先轉字串再decode
 * _decodeURI(function(){}) // 'function(){}'
 * _decodeURI('%') // throw URIError: URI malformed '%'會丟出錯誤
 * _decodeURI(' !"#$&') // ' !"#$&'
 * _decodeURI("'()*+,-./0123456789:;<=>?@") // "'()*+,-./0123456789:;<=>?@"
 * _decodeURI('ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]') // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]' '\'前要加個\否則會被當跳脫字元
 * _decodeURI('^_`abcdefghijklmnopqrstuvwxyz{|}~') // '^_`abcdefghijklmnopqrstuvwxyz{|}~'
 * _decodeURI('一') // '一'
 * _decodeURI('%E4%B8%80') // '一'
 * _decodeURI('𫝀') // '𫝀' Unicode第二輔助平面文字
 * _decodeURI('%F0%AB%9D%80') // '𫝀' Unicode第二輔助平面文字
 * _decodeURI('\uD86D\uDF40') // '𫝀' Unicode第二輔助平面文字
 * _decodeURI('\uD86D') // '\uD86D'
 * // encodeURI不編碼字元，decodeURI也不解碼
 * _decodeURI('%23%24%26%2F') // '%23%24%26%2F' %2F為/，屬於encodeURI不會轉換的關鍵字之一，這邊範例沒有全部列出
 * ```
 */
export declare function _decodeURI(val: string): string;
/**
 * 主要用於網址參數UTF-8解碼 ex: 網址?key=decodeURIComponent('value')
 *
 * @example
 * ```
 * _decodeURIComponent(undefined) // 'undefined'
 * _decodeURIComponent(null) // 'null'
 * _decodeURIComponent(123) // '123'
 * _decodeURIComponent({}) // '[object Object]' 就是一律先轉字串再decode
 * _decodeURIComponent(function(){}) // 'function(){}'
 * _decodeURIComponent('%') // throw URIError: URI malformed '%'會丟出錯誤
 * _decodeURIComponent(' !"#$&') // ' !"#$&'
 * _decodeURIComponent("'()*+,-./0123456789:;<=>?@") // "'()*+,-./0123456789:;<=>?@"
 * _decodeURIComponent('ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]') // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]' '\'前要加個\否則會被當跳脫字元
 * _decodeURIComponent('^_`abcdefghijklmnopqrstuvwxyz{|}~') // '^_`abcdefghijklmnopqrstuvwxyz{|}~'
 * _decodeURIComponent('一') // '一'
 * _decodeURIComponent('%E4%B8%80') // '一'
 * _decodeURIComponent('𫝀') // '𫝀' Unicode第二輔助平面文字
 * _decodeURIComponent('%F0%AB%9D%80') // '𫝀' Unicode第二輔助平面文字
 * _decodeURIComponent('\uD86D\uDF40') // '𫝀' Unicode第二輔助平面文字
 * _decodeURIComponent('\uD86D') // '\uD86D'
 * // encodeURIComponent不編碼字元，decodeURIComponent也不解碼
 * _decodeURIComponent('%23%24%26%2F') // '#$&/' 與decodeURI()結果不同，因為轉換關鍵字有差異
 * ```
 */
export declare function _decodeURIComponent(val: string): string;
