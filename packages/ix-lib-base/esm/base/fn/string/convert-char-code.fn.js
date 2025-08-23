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
export function getCodePointLength(val) {
    if (val == null)
        return 0;
    if (Array.from != null) {
        return Array.from(val).length;
    }
    // 不支援Array.from改用for of
    let len = 0;
    for (const char of val) {
        // TODO：
        console.log(char);
        len++;
    }
    return len;
}
/**
 * 取字串中的指定位置字元
 *
 * @param val
 * @param idx
 * @returns
 */
export function charAt(val, idx) {
    if (String.fromCodePoint != null && val.codePointAt != null) {
        return String.fromCodePoint(val.codePointAt(idx));
    }
    else if (Array.from != null) {
        return Array.from(val)[idx];
    }
    let index = -1;
    for (const char of val) {
        ++index;
        if (idx === index)
            return char;
    }
    return null;
}
/**
 * 是否 為常見的半形字
 *
 * @param val
 * @returns
 */
export function hasVisibleHalfWidth(val) {
    return /[\x20-\x7e]/u.test(val);
}
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
export function ToDBC(val) {
    if (hasVisibleHalfWidth(val)) {
        let txt = '';
        for (let i = 0; i < val.length; i++) {
            if (val.charCodeAt(i) === 32) {
                txt += String.fromCharCode(12288);
            }
            else if (val.charCodeAt(i) < 127) {
                txt += String.fromCharCode(val.charCodeAt(i) + 65248);
            }
            else {
                txt += val[i];
            }
        }
        return txt;
    }
    return val;
}
// 全形轉換為半形
// function ToCDB(str) {
//   var tmp = "";
//   for(var i=0;i<str.length;i  ){
//   if (str.charCodeAt(i) == 12288){
//   tmp  = String.fromCharCode(str.charCodeAt(i)-12256);
//   continue;
//   }
//   if(str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375){
//   tmp  = String.fromCharCode(str.charCodeAt(i)-65248);
//   }
//   else{
//   tmp  = String.fromCharCode(str.charCodeAt(i));
//   }
//   }
//   return tmp
//   }
// javascript &#x开头,&#开头,\x开头,%开头 转中文
// https://blog.csdn.net/hvang1988/article/details/119972639?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3.queryctrv4&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-3.queryctrv4&utm_relevant_index=6
