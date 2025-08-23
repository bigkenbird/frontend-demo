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
export declare function moneyToChinese(val: number): string;
