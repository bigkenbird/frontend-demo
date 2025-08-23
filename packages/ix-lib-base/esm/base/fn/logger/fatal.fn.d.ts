/**
 * logger是否為fatal level
 *
 * @returns
 */
export declare function isFatal(): boolean;
/**
 * fatal log
 *
 * @example
 * ```
 * fatal(1) // print 1
 * fatal(1, 2) // print 1 2
 * fatal('a', 'b', 'c') // print a b c
 * ```
 * @param logs 可傳入多個參數
 */
export declare function fatal(...logs: any[]): void;
