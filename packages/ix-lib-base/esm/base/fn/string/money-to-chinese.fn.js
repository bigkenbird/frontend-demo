import { isBlank } from '../validator/is-blank.fn';
const chineseNum = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
const units = ['', '萬', '億', '兆'];
const dollars = ['', '拾', '佰', '仟'];
const max = 999999999999999; // 最大佰兆
/**
 * 金額轉換中文金額
 *
 * @example
 * ```
 * moneyToChinese(0) // 零
 * moneyToChinese(1) // 壹
 * moneyToChinese(10) // 壹拾
 * moneyToChinese(11) // 壹拾壹
 * moneyToChinese(1000.1234) // ''
 * moneyToChinese(1001) // 壹仟零壹
 * moneyToChinese(-1001) // 負壹仟零壹
 * moneyToChinese(10000001) // 壹仟萬零壹
 * moneyToChinese(999999999999999) // 玖佰玖拾玖兆玖仟玖佰玖拾玖億玖仟玖佰玖拾玖萬玖仟玖佰玖拾玖
 * moneyToChinese(900909090) // 玖億零玖拾萬零玖仟零玖拾
 * moneyToChinese(7007007007007) // 柒兆零柒拾億零柒佰萬零柒仟零柒
 * moneyToChinese(80000000008) // 捌佰億零捌
 * moneyToChinese(8000800080008) // 捌兆零捌億零捌萬零捌
 * ```
 */
export function moneyToChinese(val) {
    if (val == null || val > max)
        return '';
    if (val == 0) {
        return chineseNum[0];
    }
    let symbol = '';
    if (val < 0) {
        val = 0 - val;
        symbol = '負';
    }
    const valStr = val.toString();
    // 有小數不處理
    if (valStr.indexOf('.') > -1) {
        return '';
    }
    let result = '';
    // 整數
    const len = valStr.length;
    let count0 = 0;
    for (let i = 0; i < len; i++) {
        const n = valStr.charAt(i);
        const p = len - i - 1;
        const q = p / 4;
        const m = p % 4;
        if (n === '0') {
            count0++;
        }
        else {
            if (count0 > 0) {
                result += chineseNum[0];
            }
            count0 = 0;
            result += chineseNum[parseInt(n, 10)] + dollars[m];
        }
        if (m === 0 && count0 < 4) {
            result += units[q];
        }
    }
    if (isBlank(result)) {
        return chineseNum[0];
    }
    return symbol + result;
}
