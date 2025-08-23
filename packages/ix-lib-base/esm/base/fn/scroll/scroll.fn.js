/**
 * 取得目前scrollTop值
 *
 * @param scrollingElement 指定捲動元素
 * @returns scrollTop值
 */
export function getScrollTop(scrollingElement) {
    // 捲動元素為window會無法從window取得scrollTop
    if (scrollingElement == null || scrollingElement === window) {
        let value = 0;
        if (document.scrollingElement)
            value = document.scrollingElement.scrollTop;
        return (value ||
            document.documentElement.scrollTop ||
            document.body.parentNode.scrollTop ||
            document.body.scrollTop);
    }
    else {
        return scrollingElement.scrollTop;
    }
}
/**
 * 取得預設的捲動元素
 *
 * @returns
 */
export function getDefaultScrollingElement() {
    if (document.scrollingElement)
        return document.scrollingElement;
    const html = document.body.parentElement;
    const screenHeight = window.screen.height;
    if (html.clientHeight > screenHeight && html.scrollHeight > screenHeight) {
        return html;
    }
    return document.body;
}
/**
 * 取得距離頂端的位置
 * @param element
 * @returns
 */
export function getElementTopPosition(element) {
    let top = 0;
    if (element == null)
        return top;
    while (element) {
        top += element.offsetTop + element.clientTop;
        element = element.offsetParent;
    }
    return top;
}
/**
 * 捲動畫面
 *
 * @param to 前往位置
 * @param animate 是否平滑捲動
 * @param duration 指定平滑捲動到指定位置所需時間(ms)
 * @param element 指定捲動元素
 */
export function scrollAnimate(to, animate = true, duration = 300, scrollingElement) {
    if (animate) {
        return new Promise((resolve) => {
            const start = getScrollTop(scrollingElement);
            animateScroll(resolve, 0, 20, start, to - start, duration, scrollingElement);
        });
    }
    else {
        movePosition(to, scrollingElement);
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
function animateScroll(resolve, currentTime, increment, start, change, duration, element) {
    currentTime += increment;
    const td = currentTime / duration;
    const val = start + change * td * td * td;
    movePosition(val, element);
    if (currentTime < duration) {
        window.requestAnimationFrame(() => {
            animateScroll(resolve, currentTime, increment, start, change, duration, element);
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
function movePosition(val, element) {
    if (element == null) {
        document.documentElement.scrollTop = val;
        document.body.parentNode.scrollTop = val;
        document.body.scrollTop = val;
    }
    else {
        element.scrollTop = val;
    }
}
