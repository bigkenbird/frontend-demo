/**
 * 四捨五入至指定位數
 *
 * @example
 * ```
 * roundOff(null, 2) // null
 * roundOff(undefined, 2) // undefined
 * roundOff(1.234, null) // 1.234
 * roundOff(1.234, 0) // 1
 * roundOff(1.234, 1) // 1.2
 * roundOff(1.234, 2) // 1.23
 * roundOff(1.234, 3) // 1.234
 * roundOff(1.234, 4) // 1.234
 * roundOff(5, 0) // 5
 * roundOff(5, 1) // 5
 * roundOff(5.5, 0) // 6
 * roundOff(5.456, 0) // 5
 * roundOff(5.456, 1) // 5.5
 * roundOff(5.456, 2) // 5.46
 * roundOff(5.456, 3) // 5.456
 * roundOff(5.456, 4) // 5.456
 * roundOff(-3.4, 0) // -3
 * roundOff(-3.5, 0) // -4
 * roundOff(-3.456, 1) // -3.5
 * roundOff(-3.456, 2) // -.3.46
 * roundOff(-3.456, 3) // -3.456
 * ```
 * @param val 數值
 * @param pos 指定位數
 * @returns
 */
export declare function roundOff(val: number, scale: number): number;
