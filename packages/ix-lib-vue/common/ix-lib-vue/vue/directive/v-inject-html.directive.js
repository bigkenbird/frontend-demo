import { isBlank } from '@twix/ix-lib-base';
export const vInjectHtml = {
    mounted(hostElement, binding) {
        injectHtml(hostElement, binding);
    },
    updated(hostElement, binding) {
        injectHtml(hostElement, binding);
    }
};
function injectHtml(hostElement, binding) {
    while (hostElement.firstChild) {
        hostElement.removeChild(hostElement.lastChild);
    }
    if (isBlank(binding.value))
        return;
    hostElement.insertAdjacentHTML('beforeend', binding.value);
}
