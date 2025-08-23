/**
 * 取得目前scrollLeft值
 *
 * @param scrollingElement 指定捲動元素
 * @returns scrollLeft值
 */
export function getScrollLeft(scrollingElement) {
    if (scrollingElement == null) {
        let value = 0;
        if (document.scrollingElement)
            value = document.scrollingElement.scrollLeft;
        return (value ||
            document.documentElement.scrollLeft ||
            document.body.parentNode.scrollLeft ||
            document.body.scrollLeft);
    }
    else {
        return scrollingElement.scrollLeft;
    }
}
/**
 * 取得距離左端的位置
 * @param element
 * @returns
 */
export function getElementLeftPosition(element) {
    let left = 0;
    if (element == null)
        return left;
    while (element) {
        left += element.offsetLeft + element.clientLeft;
        element = element.offsetParent;
    }
    return left;
}
/**
 * 左右捲動畫面
 *
 * @param to 前往位置
 * @param animate 是否平滑捲動
 * @param duration 指定平滑捲動到指定位置所需時間(ms)
 * @param element 指定捲動元素
 */
export function scrollLeftAnimate(to, animate = true, duration = 300, scrollingElement) {
    if (animate) {
        return new Promise((resolve) => {
            const start = getScrollLeft(scrollingElement);
            animateScrollLeft(resolve, 0, 20, start, to - start, duration, scrollingElement);
        });
    }
    else {
        moveLeftPosition(to, scrollingElement);
        return Promise.resolve();
    }
}
/**
 * 平滑捲動到最後位置
 *
 * @param resolve Promise resolve
 * @param currentTime 捲動起始時間
 * @param increment 捲動時間增量
 * @param start 開始捲動位置
 * @param change 開始與結束位置的移動距離
 * @param duration 捲動到指定位置所需時間(ms)
 * @param element 捲動元素
 */
function animateScrollLeft(resolve, currentTime, increment, start, change, duration, element) {
    currentTime += increment;
    const td = currentTime / duration;
    const val = start + change * td * td * td;
    moveLeftPosition(val, element);
    if (currentTime < duration) {
        window.requestAnimationFrame(() => {
            animateScrollLeft(resolve, currentTime, increment, start, change, duration, element);
        });
    }
    else {
        resolve();
    }
}
/**
 * 捲動到指定位置
 *
 * @param val 前往位置
 * @param element 捲動元素
 */
function moveLeftPosition(val, element) {
    if (element == null) {
        document.documentElement.scrollLeft = val;
        document.body.parentNode.scrollLeft = val;
        document.body.scrollLeft = val;
    }
    else {
        element.scrollLeft = val;
    }
}
