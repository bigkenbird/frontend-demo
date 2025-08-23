/**
 * 無條件捨去到指定整數位數
 *
 * @example
 * ```
 * floorInteger(null, null); // null
 * floorInteger(undefined, null); // undefined
 * floorInteger(0, 6); // 0
 * floorInteger(1, 3); // 0
 * floorInteger(1234, 0); // 1234
 * floorInteger(1234.56, 0); // 1234
 * floorInteger(1234, 1); //1230
 * floorInteger(1234, 2); //1200
 * floorInteger(1234, 3); //1000
 * floorInteger(1234.56, 2); //1200
 * floorInteger(-1234, 0); // -1234
 * floorInteger(-1234, 1); // -1240
 * floorInteger(-1234, 2); // -1300
 * ```
 * @param val 數值
 * @param pos 指定位數
 * @returns
 */
export function floorInteger(val, scale) {
    if (val == null || scale == null)
        return val;
    const token = Math.pow(10, scale);
    return Math.floor(val / token) * token;
}
