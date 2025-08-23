/**
 * 控制target元素以下(含target本身)的form防止瀏覽器出現未預期的原生行為(控制項)
 *
 * @param target
 * @returns
 * @author Clark Chen
 * @version 2021/03/10
 */
export function handleFormUnexpectedUI(target) {
    if (target == null)
        return;
    if (target.tagName === 'FORM') {
        handleForm(target);
        return;
    }
    const forms = target.querySelectorAll('form');
    const len = forms.length;
    for (let i = 0; i < len; i++) {
        handleForm(forms.item(i));
    }
}
function handleForm(form) {
    // 避免瀏覽器出現原生未預期的行為
    form.setAttribute('autocomplete', 'off');
    form.setAttribute('novalidate', 'novalidate');
}
