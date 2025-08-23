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
export declare function useDataHelper(): {
    /**
     * 取得資料
     *
     * @param key Data鍵值
     * @returns Data鍵值對應資料
     */
    getData: <V>(key: string) => V;
    /**
     * 是否有資料
     *
     * @param key Data鍵值
     * @returns
     */
    hasData: (key: string) => boolean;
    /**
     * 設定資料
     *
     * @param key Data鍵值
     * @param val Data鍵值對應資料,設定值為null,undefined會直接移除項目
     */
    setData: (key: string, val: unknown) => boolean;
    /**
     * 移除資料
     * @returns map.delete時，當key存在才會回true，若delete不存在的key會是false
     */
    removeData: (key: string) => boolean;
    /**
     * 清除所有資料
     */
    clearData: () => void;
};
