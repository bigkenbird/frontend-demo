import {isBlank} from '../validator/is-blank.fn';
const halfwidthTable =
    ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const fullwidthTable =
    '%u3000%uFF01%u201D%uFF03%uFF04%uFF05%uFF06%u2019%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%u2018%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A%uFF5B%uFF5C%uFF5D%uFF5E';
/**
 * 半形字轉全形字
 *
 * @param text
 * @returns
 */
export function halfwidthToFullwidth(text) {
    // 判斷是否有半形字元
    // TODO: sonarqube建議ASCII前32個碼為control or non-printing characters所以可以從x20開始
    // eslint-disable-next-line no-control-regex
    if (!isBlank(text) && /[\x00-\xff]/.test(text)) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const val = text.charAt(i);
            const index = halfwidthTable.indexOf(val) * 6;
            result += index > -1 ? unescape(fullwidthTable.substring(index, index + 6)) : val;
        }
        return result;
    }
    return text;
}
/*
 * 全形字轉半形字
 *
 * @param text
 * @returns
 */
export function fullwidthToHalfwidth(text) {
    // 判斷是否有全形字元
    if (!isBlank(text)) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const val = text.charAt(i);
            // 檢查是否為半型
            // TODO: sonarqube建議ASCII前32個碼為control or non-printing characters所以可以從x20開始
            // eslint-disable-next-line no-control-regex
            if (/[\x00-\xff]/.test(val)) {
                result += val;
            } else {
                const fullwidth = escape(val);
                const halfIdx = Math.floor(fullwidthTable.indexOf(fullwidth) / 6);
                if (halfIdx == -1) {
                    result += val;
                } else {
                    result += halfwidthTable[halfIdx];
                }
            }
        }
        return result;
    }
    return text;
}
