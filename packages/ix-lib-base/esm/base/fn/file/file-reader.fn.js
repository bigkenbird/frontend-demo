/** 是否支援File API */
const isSupportFileAPI = window['File'] && window['FileReader'] && window['FileList'] && window['Blob'] ? true : false;
let reader;
/**
 * 取得FileReader
 */
function getFileReader() {
    if (reader != null)
        return reader;
    if (isSupportFileAPI && reader == null) {
        // FileReader可能會被zone.js覆寫，這邊要分別
        if (window.FileReader.__zone_symbol__OriginalDelegate != null) {
            reader = new window.FileReader.__zone_symbol__OriginalDelegate();
        }
        else {
            reader = new window['FileReader']();
        }
    }
    return reader;
}
/**
 * 讀取檔案
 * @param success
 * @param failure
 */
export function readFile(file, success, failure) {
    // 防呆
    if (success == null) {
        // TODO:
        // success = (e) => {};
    }
    // 防呆
    if (failure == null) {
        // TODO:
        // failure = (err) => {};
    }
    // TODO:還需驗證是否須清除FileReader或可以持續沿用相同Object對效能影響
    let reader = getFileReader();
    if (reader != null) {
        reader.onload = (e) => {
            // TODO:
            //e.target.result // base64
            //reader.readAsDataURL(blob);
            success(e);
            // 清除FileReader
            setTimeout(() => {
                reader = null;
            }, 0);
        };
        reader.onerror = (err) => {
            failure(err);
            // 清除FileReader
            setTimeout(() => {
                reader = null;
            }, 0);
        };
        // 讀取file為base64格式
        reader.readAsDataURL(file);
    }
    else {
        // TODO:
        // failure(new Error('NotSupport'));
    }
}
// function strEncodeUTF16(str) {
//   var buf = new ArrayBuffer(str.length*2);
//   var bufView = new Uint16Array(buf);
// new Uint8Array(buf);
//   for (var i=0, strLen=str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return bufView;
// }
// var arr = strEncodeUTF16('€13,56');
// function dec2hex(dec, padding) {
//   return parseInt(dec, 10).toString(16).padStart(padding, '0');
// }
// JavaScript如何實現UTF-16編碼轉換為UTF-8編碼——utfx.js原始碼解析
// https://codertw.com/ios/20896/
// 【JS迷你书】String类型与UTF-16
// https://juejin.cn/post/6844903841817690119
