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
export declare function base64Encode(val: string): string;
