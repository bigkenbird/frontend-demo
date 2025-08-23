import { isScrollBottom } from './is-scroll-bottom.fn';
import { getElementTopPosition, getScrollTop } from './scroll.fn';
/**
 * 綁定元素出現在螢幕上 event
 * 透過scroll event實作有效能考量，新做法可用element-visible-oberver.fn.ts
 *
 * @param scrollingElement
 * @param element
 * @param callback
 */
export function bindElementVisibleEvent(scrollingElement, element, callback) {
    let initScrollHeight = 0;
    let initPosition = 0;
    // 第一幀數畫面還在初始，所以第二幀數再取得position
    // requestAnimationFrame(() => {
    //   requestAnimationFrame(() => {
    //     initScrollHeight = scrollingElement.scrollHeight;
    //     initPosition = this.getInitPosition();
    //   });
    // });
    setTimeout(() => {
        initScrollHeight = scrollingElement.scrollHeight;
        initPosition = getInitPosition(element);
    }, 100);
    const screenHeightQuarter = window.screen.height / 4;
    // 捲動過標記
    let scrollFlag = false;
    // emit的位置, 0:未發送 1:頂端 2:中段 3:末段
    let emitPosition = 0;
    const event = (e) => {
        // element位置發生改變
        const currentScrollHeight = scrollingElement.scrollHeight;
        if (initScrollHeight && initScrollHeight != currentScrollHeight) {
            initScrollHeight = currentScrollHeight;
            initPosition = getInitPosition(element);
        }
        const scrollTop = getScrollTop(e.target);
        const top = scrollTop + screenHeightQuarter;
        const bottom = top + screenHeightQuarter * 2;
        // 元素在最頂的1/4位置, 要捲到頂端才觸發, 但不要在初始就觸發
        if (scrollFlag && scrollTop === 0 && initPosition <= screenHeightQuarter) {
            // 不要在初始就觸發
            triggerEmitter(1);
        }
        // 元素捲動到螢幕1/4~3/4的區間
        else if (initPosition > top && initPosition < bottom) {
            // 當頁面不夠高emitPosition永遠為2,會造成無法再次發送
            if (emitPosition === 2) {
                if (scrollTop === 0 || isScrollBottom(e.target)) {
                    emitPosition = 0;
                }
                else {
                    // do nothing
                }
            }
            else {
                triggerEmitter(2);
            }
        }
        // 已捲動到最底部,因最後的4/4不能再捲上去,所以也要當作已觸發
        else if (isScrollBottom(e.target) && initPosition >= bottom) {
            triggerEmitter(3);
        }
        else {
            emitPosition = 0;
        }
        // 元素在最頂的1/4位置
        if (!scrollFlag && initPosition <= screenHeightQuarter) {
            // 不要在初始就觸發,開始捲動後才觸發
            triggerEmitter(1);
        }
        scrollFlag = true;
    };
    // 最大觸發次數
    const max = 1;
    // 已觸發次數
    let count = 0;
    // 觸發
    const triggerEmitter = (position) => {
        // 前次與本次為同位置不發送,防止連續觸發
        if (emitPosition === position)
            return;
        emitPosition = position;
        count++;
        // 觸發達到max即可取消訂閱,不再觸發
        if (count > max) {
            scrollingElement.removeEventListener('scroll', event);
        }
        else {
            callback(element);
        }
    };
    scrollingElement.addEventListener('scroll', event);
}
/**
 * 取得觸發基準位置
 * @returns
 */
function getInitPosition(element) {
    // 元素一出現
    return getElementTopPosition(element);
    // 元素一半出現
    // return getElementTopPosition(element) + element.clientHeight / 2;
}
