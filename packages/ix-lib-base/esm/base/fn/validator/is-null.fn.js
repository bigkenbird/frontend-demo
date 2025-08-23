/**
 * undefined or null
 *
 * @param val
 */
export function isNull(val) {
    return undefined === val || null === val;
}
window.Null = undefined;
window.isNull = isNull;
