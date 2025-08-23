/**
 * 轉字串
 *
 * @example
 * ```
 * toString(22222) // '22222'
 * toString('1111') // '1111'
 * toString(false) // 'false'
 * toString({'test': 'test'}) // '{"test":"test"}'
 * toString((test) => {return true;}) // '(test) => {return true;}'
 * toString(new Date()) // 'Fri Aug 13 2021 15:58:57 GMT+0800 (臺北標準時間)'
 * toString(null) // 'null'
 * toString(undefined) // 'undefined'
 * toString([1, '4', {}, () => {return true;}, new Date()]) // [1,"4",{},null,"2021-08-13T08:20:15.274Z"]
 * ```
 */
export declare function safeToString(val: any): string;
export declare function arrayToString(params: any[]): string;
