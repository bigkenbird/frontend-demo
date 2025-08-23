/**
 * 兩指縮放 event
 *
 * @param element
 * @param zoomIn
 * @param zoomOut
 */
export function bindPinchZoom(element, zoomIn, zoomOut) {
    let lastHypot;
    element.addEventListener('touchmove', (e) => {
        const event = e;
        if (event.touches.length === 2) {
            if (element.contains(event.touches[0].target) &&
                element.contains(event.touches[1].target)) {
                if (event.touches[0] == null || event.touches[1] == null)
                    return;
                const hypot = Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
                if (!lastHypot)
                    lastHypot = hypot;
                const ratio = hypot / lastHypot;
                if (ratio < 0.8) {
                    // 縮小
                    zoomOut(e, ratio);
                }
                else if (ratio > 1.2) {
                    // 放大
                    zoomIn(e, ratio);
                }
            }
        }
    });
    element.addEventListener('touchend', () => {
        lastHypot = null;
    });
}
