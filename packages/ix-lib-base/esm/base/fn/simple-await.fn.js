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
export function simpleAwait(promise, finallyCallback) {
    return promise
        .then((data) => {
        return [undefined, data];
    })
        .catch((e) => {
        return [e, undefined];
    })
        .finally(() => {
        if (finallyCallback)
            finallyCallback();
    });
}
