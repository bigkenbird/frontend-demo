/**
 * 產生帶有千分號的數值字串，無法判別時回0
 *
 * @example
 * ```
 * commfy(undefined, 0) // 0
 * commfy(null, 3) // 0.000
 * commfy(null, 3, false) // 0
 * commfy({}) // 0
 * commfy(new Date()) // 0
 * commfy(5, 0) // 5
 * commfy(5, 2) // 5.00
 * commfy(5, 2, false) // 5
 * commfy(1234, 0) // 1,234
 * commfy(1234.567, 0) // 1,235
 * commfy(1234.567, 2) // 1,234.57
 * commfy(1234.567, 5) // 1,234.56700
 * commfy(1234.567, 5, false) // 1234.567
 * commfy(-1234.567, 2) // -1,234.57
 * commfy('.5', 0) // 1
 * commfy('1234', 2) // 1,234.00
 * commfy('1234.567', 2)) // 1,234.57
 * commfy('1,234', 2) // 1,234.00
 * commfy('1,234', 2, false) // 1,234
 * commfy('1,234.567', 2) // 1,234.57
 * commfy('-1234.567', 2) // -1,234.57
 * ```
 * @param val
 * @param scale 指定小數位數,預設0,位數不足不會補0
 * @returns 字串
 */
export declare function commafy(val: string | number, scale?: number, scalePadding?: boolean): string;
