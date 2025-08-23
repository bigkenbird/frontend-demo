/**
 * logger是否為debug level
 *
 * @returns
 */
export declare function isDebug(): boolean;
/**
 * debug log
 *
 * @example
 * ```
 * debug(1) // 1
 * debug(1, 2) // 1 2
 * debug('a', 'b', 'c') // "a" "b" "c"
 * ```
 * @param logs 可傳入多個參數
 */
export declare function debug(...logs: any[]): void;
