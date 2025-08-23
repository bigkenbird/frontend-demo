import { isBlank } from '../fn/validator/is-blank.fn';
/**
 * Data Helper 存放資料的集合
 *
 * 與map區別
 * - key皆為string
 * - key不接受null,undefined,空字串
 * - 設定值為null,undefined會直接移除項目
 *
 * @author Clark Chen
 * @version 2022/08/01
 */
export function useDataHelper() {
    /**
     * Data Map
     */
    let data = new Map();
    return {
        getData(key) {
            return data.get(key);
        },
        hasData(key) {
            // key排除null,undefined,空字串
            if (!isBlank(key))
                return data.has(key);
            return false;
        },
        setData(key, val) {
            // key排除null,undefined,空字串
            if (!isBlank(key)) {
                // val為null,undefined直接刪除item
                if (val == null) {
                    return this.removeData(key);
                }
                data.set(key, val);
                return true;
            }
            return false;
        },
        removeData(key) {
            // 須注意map.delete時，當key存在才會回true，若delete不存在的key會是false
            return data.delete(key);
        },
        clearData() {
            data = new Map();
        }
    };
}
