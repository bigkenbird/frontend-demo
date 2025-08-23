const chineseNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
/**
 * 單一數字轉換中文
 *
 * @example
 * ```
 * numberToChinese(0) // 零
 * numberToChinese(1) // 一
 * numberToChinese(9) // 九
 * numberToChinese(10) // ''
 * numberToChinese(-1) // ''
 * ```
 */
export function numberToChinese(val) {
    if (val > -1 && val < chineseNum.length)
        return chineseNum[val];
    return '';
}
