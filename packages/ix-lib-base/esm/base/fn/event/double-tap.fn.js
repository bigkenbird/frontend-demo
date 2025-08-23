/**
 * 連點兩下 event
 *
 * @param element
 * @param callback
 */
export function bindDoubleTap(element, callback) {
    let lastTime = 0;
    let lastHypot = 0;
    element.addEventListener('touchend', (e) => {
        const now = new Date().getTime();
        const diff = now - lastTime;
        const hypot = Math.hypot(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        if (diff > 0 && diff < 600 && Math.abs(hypot - lastHypot) < 4) {
            callback(e);
            lastHypot = 0;
        } else {
            lastTime = now;
            lastHypot = hypot;
        }
        return false;
    });
}
