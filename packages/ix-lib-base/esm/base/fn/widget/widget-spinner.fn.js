import { isBlank } from '../validator/is-blank.fn';
const map = new Map();
export function showSpinner(element, spinnerName) {
    if (isBlank(spinnerName))
        return;
    const handle = new Date().getTime();
    element.addEventListener('inited', () => {
        hideWidgetSpinner(handle);
    });
    const spinner = createSpinner(element, spinnerName);
    map.set(handle, {
        element: element,
        spinner: spinner
    });
}
export function showSpinners(elements, spinnerName) {
    elements.forEach((element) => {
        showSpinner(element, spinnerName);
    });
}
function hideWidgetSpinner(handle) {
    if (handle != null) {
        const data = map.get(handle);
        if (data != null) {
            if (data.element != null && data.spinner != null) {
                data.spinner.remove();
                data.element.style.display = '';
            }
            map.delete(handle);
        }
    }
}
function createSpinner(element, spinnerTagName) {
    element.style.display = 'none';
    const spinner = document.createElement(spinnerTagName);
    spinner.setAttribute('show', '1');
    const node = element.parentNode;
    if (node != null)
        node.insertBefore(spinner, element.nextSibling);
    return spinner;
}
