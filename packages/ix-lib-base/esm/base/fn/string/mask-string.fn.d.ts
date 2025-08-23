/**
 * 字串隱碼
 *
 * @example
 * ```
 * maskString('', 2, 5) // ''
 * maskString(null, 2, 5) // null
 * maskString('0123456789', 2, 5) // 0****56789
 * maskString('0123', 2, 5) // 0***
 * maskString('01234', 2, 5) // 0****
 * maskString('0123456', 0, 5) // *****56
 * // 反向
 * maskString('0123456789', 2, 5, true) // 01234****9
 * maskString('0123', 2, 5, true) // ***3
 * maskString('01234', 2, 5, true) // ****4
 * maskString('0123456', 0, 5, true) // 01*****
 * ```
 * @param value
 * @param start 第幾碼開始隱碼,非index
 * @param end 隱碼到第幾碼,非index
 * @param reverse 預設false, true: 倒數第幾碼開始到第幾碼結束隱碼
 * @returns
 */
export declare function maskString(value: string, start: number, end: number, reverse?: boolean): string;
