/**
 * 移除所有Event Listener
 * 但無法移除屬性上的event, ex: <button onclick=""></button>
 * @param element
 */
export function removeAllEventListener(element) {
    if (element) {
        const clone = element.cloneNode(true);
        if (element.replaceWith) {
            element.replaceWith(clone);
        }
        else {
            element.parentNode.insertBefore(clone, element);
            element.parentNode.removeChild(element);
        }
    }
}
