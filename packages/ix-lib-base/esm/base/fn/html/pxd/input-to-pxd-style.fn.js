import { addCSSClass } from '../../css/add-css-class.fn';
import { isBlank } from '../../validator/is-blank.fn';
import { blockPxdAutoComplete } from './block-pxd-autocomplete.fn';
import { blockPxdPasteCopyCut } from './block-pxd-paste-copy-cut.fn';
/**
 * 把input的type改為text並用style或css class隱碼
 */
export function inputToPxdStyle(input, cssClassName) {
    if (input == null || input.tagName !== 'INPUT')
        return;
    let inputType = input.getAttribute('type');
    // 沒有type屬性或type值為空白,預設給text
    if (isBlank(inputType))
        inputType = 'text';
    let ok = false;
    // 可能會隱碼的type
    const types = ['text', 'tel', 'number', 'password'];
    if (types.indexOf(inputType) > -1) {
        const style = window.getComputedStyle(input);
        // 有支援text-security
        if (style['webkitTextSecurity']) {
            // 都改為text
            if (inputType !== 'text')
                input.setAttribute('type', 'text');
            if (isBlank(cssClassName)) {
                input.style.cssText += ';text-security:disc;-webkit-text-security:disc;-moz-text-security:disc';
            }
            else {
                addCSSClass(input, cssClassName);
            }
            blockPxdAutoComplete(input, true);
            blockPxdPasteCopyCut(input, true);
            ok = true;
        }
    }
    // 不支援就單純轉password type
    if (!ok) {
        input.setAttribute('type', 'password');
        blockPxdAutoComplete(input, true);
        blockPxdPasteCopyCut(input, true);
    }
}
