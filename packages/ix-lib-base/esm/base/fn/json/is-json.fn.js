/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 是否為JSON
 *
 * TODO:此判斷效能堪慮，應避免使用
 *
 * @param val
 * @returns
 */
export function isJSON(val) {
    if (val == null)
        return false;
    try {
        if (typeof val !== 'string')
            val = JSON.stringify(val);
        val = JSON.parse(val);
    }
    catch (e) {
        return false;
    }
    return typeof val === 'object' && val !== null;
}
