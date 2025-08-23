import { bindDoubleTap } from '../event/double-tap.fn';
import { bindMouseWheel } from '../event/mouse-wheel.fn';
import { bindPinchZoom } from '../event/pinch-zoom.fn';
let ratio = 1;
const MAX = 3;
const MIN = 1;
export function bindImagePinchZoom(element) {
    const scrollingElement = document.createElement('div');
    scrollingElement.style.overflow = 'scroll';
    scrollingElement.style.width = '100%';
    const clone = element.cloneNode(true);
    clone.style.transition = 'all linear 0.3s';
    scrollingElement.appendChild(clone);
    // 取代原來的element
    element.parentNode.insertBefore(scrollingElement, element);
    element.parentNode.removeChild(element);
    element = clone;
    // 兩指縮放
    bindPinchZoom(element, () => {
        // 放大
        zoomIn(0.7).then(() => {
            changeImageSize(element);
        });
    }, () => {
        // 縮小
        zoomOut(0.7).then(() => {
            changeImageSize(element);
        });
    });
    // 快速雙擊
    bindDoubleTap(element, () => {
        if (ratio < 1.5) {
            ratio = MAX;
        }
        else {
            ratio = MIN;
        }
        changeImageSize(element);
    });
    // 滑鼠滾輪
    bindMouseWheel(element, () => {
        zoomOut(0.4).then(() => {
            changeImageSize(element);
        });
    }, () => {
        zoomIn(0.4).then(() => {
            changeImageSize(element);
        });
    });
}
function changeImageSize(image) {
    image.style.width = 100 * ratio + '%';
}
// 放大
function zoomIn(increase) {
    return new Promise((r) => {
        if (ratio < MAX) {
            ratio = ratio + increase;
            if (ratio > MAX)
                ratio = MAX;
            r();
        }
    });
}
// 縮小
function zoomOut(decrease) {
    return new Promise((r) => {
        if (ratio > MIN) {
            ratio = ratio - decrease;
            if (ratio < MIN)
                ratio = MIN;
            r();
        }
    });
}
