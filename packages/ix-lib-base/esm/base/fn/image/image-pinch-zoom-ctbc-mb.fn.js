import { bindDoubleTap } from '../event/double-tap.fn';
import { bindMouseWheel } from '../event/mouse-wheel.fn';
import { bindPinchZoom } from '../event/pinch-zoom.fn';
let ratio = 1;
const MAX = 2.5;
const MIN = 1;
export function bindImagePinchZoomCTBC(element, change) {
    bindPinchZoom(element, () => {
        // 放大
        zoomIn(0.5).then(() => {
            changeImageSize(change);
        });
    }, () => {
        // 縮小
        zoomOut(0.5).then(() => {
            changeImageSize(change);
        });
    });
    bindDoubleTap(element, () => {
        if (ratio < 1.5) {
            ratio = MAX;
        }
        else {
            ratio = MIN;
        }
        changeImageSize(change);
    });
    bindMouseWheel(element, () => {
        zoomOut(0.5).then(() => {
            changeImageSize(change);
        });
    }, () => {
        zoomIn(0.5).then(() => {
            changeImageSize(change);
        });
    });
}
function changeImageSize(change) {
    change(ratio);
}
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
