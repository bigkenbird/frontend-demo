/**
 * logger是否為error level
 *
 * @returns
 */
export declare function isError(): boolean;
/**
 * error log
 *
 * @example
 * ```
 * error(1) // print 1
 * error(1, 2) // print 1 2
 * error('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export declare function error(...logs: any[]): void;
