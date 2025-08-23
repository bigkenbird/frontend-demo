/**
 * logger是否為fatal level
 *
 * @returns
 */
export declare function isMfpFatal(): boolean;
/**
 * mfp log fatal
 * used for unrecoverable crashes or hangs
 *
 * @returns
 */
export declare function mfpFatal(log: string): void;
