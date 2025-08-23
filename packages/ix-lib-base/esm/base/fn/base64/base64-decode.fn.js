/**
 * base64解碼
 *
 * 用base64Encode()編碼，若內有中文會先encodeURI()，所以還需decodeURI()
 *
 * @param val
 * @param needDecodeURI 若val內decode後有中文或超過1byte範圍文字，要設定為true，可參考base64Encode()說明
 * @returns
 * @exmpale
 * ```
 * base64Decode('YWJj') // 'abc'
 * base64Decode('一') // DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
 * base64Decode('JUU0JUI4JTgw', true) // '一'
 * base64Decode('JUU0JUI4JTgw', false) // '%E4%B8%80',因為base64Encode()有先把中文encodeURI轉成'%E4%B8%80'再encode
 * ```
 */
export function base64Decode(val, needDecodeURI = false) {
    if (needDecodeURI)
        return decodeURI(atob(val));
    // ascii to blob
    return atob(val);
}
