/**
 * logger是否為warning level
 *
 * @returns
 */
export declare function isWarning(): boolean;
/**
 * warning log
 *
 * @example
 * ```
 * warning(1) // print 1
 * warning(1, 2) // print 1 2
 * warning('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export declare function warning(...logs: any[]): void;
