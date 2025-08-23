/**
 * logger是否為info level
 *
 * @returns
 */
export declare function isInfo(): boolean;
/**
 * info log
 *
 * @example
 * ```
 * info(1) // print 1
 * info(1, 2) // print 1 2
 * info('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export declare function info(...logs: any[]): void;
