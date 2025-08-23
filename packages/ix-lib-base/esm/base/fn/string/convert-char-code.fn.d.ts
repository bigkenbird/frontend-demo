/*****
 * 各種字碼字元轉換
 *
 * U+XXXX 為Unicode表示方式，javascript沒有這種處理，要自己轉
 * %27="'" %F0%AB%9D%80="𫝀" 為URI編碼，用於網址
 * %uD86D%uDF40同\uD86D\uDF40，使用escape() API會回傳，目前應該已經沒有在使用，可用unescape轉回字元
 * \uXXXX 應該是碼元code unit表示方式，在BMP範圍時，等於碼點code point表示方式
 * \uXXXX 只能表示BMP範圍文字，其它平面範圍文字就得以\uXXXX\uXXXX兩個來表示，此類字碼用.length取長度時不一定等於1
 * html的maxlength不知是判斷哪種???需要驗證
 * \u{...} es6新增的表示法，可以支援非BMP範圍表示，建議用來取代\uXXXX表示方式，'\uD860\uDD17' === '\u{28117}'結果會是true
 * 程式說明：
 * '𫝀'.charAt(0)或'𫝀'[0]都是指取得碼元的第一個元素'\uD86D'，非字元，完整是'\uD86D\uDF40'
 * '𫝀'.charCodeAt(0)=55405 String.fromCharCode(55450)='\uD86D'也是取得碼元的第一個元素
 * es6新增 => '𫝀'.codePointAt(0) 取得字元的碼點177984
 *        => String.fromCodePoint(177984)等於'𫝀' 要注意瀏覽器有沒有支援
 *
 * 用單引號的轉換範例
 * "'".charCodeAt(0) // 39
 * 39.toString(16) // '27'
 * parseInt('27', 16) // 39
 * String.fromCharCode(39)
 *
 * 以下function 都還未測過...........................
 *****/
/**
 * 取得字串碼點(字元)長度
 *
 * @param val
 * @returns
 */
export declare function getCodePointLength(val: string): number;
/**
 * 取字串中的指定位置字元
 *
 * @param val
 * @param idx
 * @returns
 */
export declare function charAt(val: string, idx: number): string;
/**
 * 是否 為常見的半形字
 *
 * @param val
 * @returns
 */
export declare function hasVisibleHalfWidth(val: string): boolean;
/**
  str="中文;；ａ"  alert(str.match(/[\u0000-\u00ff]/g))   //半形
  alert(str.match(/[\u4e00-\u9fa5]/g))   //中文
  alert(str.match(/[\uff00-\uffff]/g))   //全形
   */
/**
 * 半形轉化為全形
 * 其他字元半形(33-126)與全形(65281-65374)的對應關係是：均相差65248
 * @param val
 * @returns
 * @todo 未完成 未測
 */
export declare function ToDBC(val: string): string;
