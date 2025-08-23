/**
 * 滑鼠滾輪 event
 * @param element
 * @param wheelToUp
 * @param wheelToDown
 */
export function bindMouseWheel(element, wheelToUp, wheelToDown) {
    element.addEventListener('wheel', (e) => {
        const ev = e;
        ev.preventDefault();
        if (ev.deltaY < 50) {
            wheelToUp(e);
        }
        else {
            wheelToDown(e);
        }
    });
}
