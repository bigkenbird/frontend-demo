import { stopPropagation } from './click-prevent.fn';
/**
 * swipe手勢event
 *
 * @param hostElement
 * @param callback
 */
export function bindSwipeEvent(hostElement, callback) {
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoveDistanceX = 0;
    let touchMoveDistanceY = 0;
    hostElement.addEventListener('touchstart', (e) => {
        touchStartTime = new Date().getTime();
        // 只接受單指
        if (e.touches && e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
        stopPropagation(e);
    });
    hostElement.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length === 1) {
            touchMoveDistanceX = e.touches[0].clientX - touchStartX;
            touchMoveDistanceY = e.touches[0].clientY - touchStartY;
        }
    });
    hostElement.addEventListener('touchend', (e) => {
        if (e.touches) {
            if (new Date().getTime() - touchStartTime < 400) {
                if (Math.abs(touchMoveDistanceX) > 20 && Math.abs(touchMoveDistanceY) < 10) {
                    if (touchMoveDistanceX > 0) {
                        // left to right
                        callback('right');
                    }
                    else {
                        // right to left
                        callback('left');
                    }
                }
                else if (Math.abs(touchMoveDistanceY) > 10 && Math.abs(touchMoveDistanceX) < 10) {
                    if (touchMoveDistanceY > 0) {
                        // up to down
                        callback('down');
                    }
                    else {
                        // down to up
                        callback('up');
                    }
                }
            }
        }
        // reset
        touchStartX = touchStartY = touchMoveDistanceX = touchMoveDistanceY = 0;
    });
}
