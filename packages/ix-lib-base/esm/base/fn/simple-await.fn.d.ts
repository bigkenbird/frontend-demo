/**
 * 簡化promise搭配async await使用
 *
 * 並未如原作者處理Native Error，就不用safeAwait改為simpleAwait
 *
 * @param promise
 * @param finallyCallback
 * @see https://davidwells.io/blog/cleaner-async-await-code-without-try-catch
 * @returns
 */
export declare function simpleAwait(promise: Promise<any>, finallyCallback?: () => void): Promise<any[]>;
