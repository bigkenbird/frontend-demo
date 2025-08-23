/**
 * base64編碼
 *
 * 使用base64編碼因為每3個byte會轉為4個ASCII字元，所以會比原來多出約33%
 *
 * 編碼內容含有中文時，因字元不在1byte範圍，會發生錯誤，所以需要先編碼成1byte範圍內文字再btoa，但大小會更大
 *
 * @example
 * ```
 * base64Encode('abc') // 'YWJj'
 * btoa('一') // DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
 * base64Encode('一') // 'JUU0JUI4JTgw'
 * ```
 */
export function base64Encode(val) {
    // sonarqube建議ASCII前32個碼為control or non-printing characters所以可以從x20開始
    // eslint-disable-next-line no-control-regex
    if (!/[\x00-\xff]/.test(val)) {
        // 若有超出x00~xff範圍，直接執行btoa會錯誤，所以先進行encodeURI
        val = encodeURI(val);
    }
    // blob to ascii
    return btoa(val);
}
