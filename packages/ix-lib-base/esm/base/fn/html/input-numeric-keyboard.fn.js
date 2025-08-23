import { getBrowserVersion, getOSVersionMajor, getOSVersionMinor, isAndroid, isIOS } from '../env-info.fn';
import { isBlank } from '../validator/is-blank.fn';
/**
 * iOS與Android 顯示數字鍵盤與鍵盤上是否有小數點按鍵
 *
 * 使用type="number"來顯示數字鍵盤，取值常有非預期結果與maxlength限制失效，需避免input使用type=number
 */
export function inputNumericKeyboard(input, hasDeciamls = true) {
    if (input && input.tagName === 'INPUT') {
        // 已設定
        if (input.numericKeyboard)
            return;
        let inputType = input.getAttribute('type');
        // 沒有type屬性或type值為空白,預設給text
        if (isBlank(inputType))
            inputType = 'text';
        // number一律轉為text
        if (inputType === 'number') {
            input.setAttribute('type', 'text');
            inputType = 'text';
        }
        // 可能會使用的type
        const types = ['text', 'tel', 'password'];
        const isPxdType = inputType === 'password';
        if (types.indexOf(inputType) > -1) {
            // iOS與Android才處理，也含手機瀏覽器
            if (isIOS()) {
                // 要有小數點
                if (hasDeciamls) {
                    if (!useDecimalMode(input, isPxdType)) {
                        // 不支援inputmode 改為萬用的type="text"，勿用type="number"而type="tel"在iOS無小數點也不採用
                        if (!isPxdType)
                            input.setAttribute('type', 'text');
                        input.removeAttribute('inputmode');
                        input.removeAttribute('pattern');
                    }
                }
                else {
                    // 鍵盤只有數字,無小數點
                    if (!isPxdType)
                        input.setAttribute('type', 'text');
                    input.removeAttribute('inputmode');
                    input.setAttribute('pattern', '[0-9]*');
                }
            }
            else if (isAndroid()) {
                // android無法讓小數點不出現，目前無法控制，所以一律使用decimal模式
                // chorme66(含)以上才支援inputmode
                if (!useDecimalMode(input, isPxdType)) {
                    // 不支援decimal 改用type="tel"
                    // input tel模式在android有小數點但iOS沒有
                    // 非password type 改為萬用的type="text"
                    if (!isPxdType) {
                        input.setAttribute('type', 'tel');
                    }
                    input.removeAttribute('inputmode');
                    input.removeAttribute('pattern');
                }
            }
            else {
                // 其他忽略
            }
        }
        // 標記已設定
        input.numericKeyboard = true;
    }
}
/**
 * 數字+小數點 模式
 *
 * android chorme66(含)以上才支援inputmode屬性
 * iOS Safari 12.2以上才支援inputmode屬性
 */
function useDecimalMode(input, isPxdType) {
    let match = false;
    if (isIOS()) {
        // iOS Safari 12.2以上才支援inputmode屬性
        // 目前測試iOS12.4~15是OK
        const versionMajor = getOSVersionMajor();
        const versionMinor = getOSVersionMinor();
        if (versionMajor > 12 || (versionMajor === 12 && versionMinor >= 2)) {
            match = true;
        }
    }
    // chorme66(含)以上才支援inputmode
    else if (isAndroid() && getBrowserVersion() >= 66) {
        match = true;
    }
    // 設定
    if (match) {
        if (!isPxdType)
            input.setAttribute('type', 'text');
        input.setAttribute('inputmode', 'decimal');
        input.removeAttribute('pattern');
    }
    return match;
}
