import { addClickAction } from './click-action.fn';
/**
 * 頁面層事件阻擋
 */
let pageEventBlock = false;
/**
 * radio類型事件阻擋
 */
let radioEventBlock = false;
/**
 * preventDefault
 *
 * @param e
 */
export function preventDefault(e) {
    if (e != null && e.preventDefault != null)
        e.preventDefault();
}
/**
 * stopPropagation
 *
 * @param e
 */
export function stopPropagation(e) {
    if (e != null) {
        if (e.stopImmediatePropagation != null) {
            e.stopImmediatePropagation();
        }
        else if (e.stopPropagation != null) {
            e.stopPropagation();
        }
    }
}
/**
 * 終止click預設行為
 *
 * <ul>
 * <li>預防Bubble事件</li>
 * <li>阻擋事件被連點</li>
 * </ul>
 *
 * @param e 事件
 * @param callback
 * @param bindClickElement 綁定click的元素,綁定與真正觸發會有差異,註記的位置會有差異
 * @param pageBlock
 * @returns
 */
export function preventClick(e, callback, bindClickElement, pageBlock = false, sendLog) {
    let eventTarget;
    if (e) {
        // 需注意若在非同步functoin才裡呼叫preventClick()，不會有currentTarget
        if (e.currentTarget) {
            // currentTarget為綁定事件element
            eventTarget = e.currentTarget;
        }
        else if (e.target) {
            // target可能為綁定事件element或其子元素
            eventTarget = e.target;
        }
    }
    if (bindClickElement == null) {
        bindClickElement = eventTarget;
    }
    if (pageEventBlock ||
        radioEventBlock ||
        (bindClickElement && bindClickElement.preventClick === true) ||
        (eventTarget != null && eventTarget.preventClick === true)) {
        stopPropagation(e);
        preventDefault(e);
        return false;
    }
    const isCheckboxOrRadio = eventTarget && (eventTarget.type === 'checkbox' || eventTarget.type === 'radio');
    new Promise((resolve) => {
        const action = { done: resolve, e: e };
        // 新增Action到SharedService, 供換頁時清除
        addClickAction(action);
        lock(eventTarget, bindClickElement, pageBlock);
        if (sendLog) {
            try {
                sendLog(e);
            }
            catch (error) {
                // do nothing
            }
        }
        stopPropagation(e);
        // checkbox與radio使用preventDefault會造成元件在畫面上點擊無效果
        if (!isCheckboxOrRadio) {
            preventDefault(e);
        }
        if (callback) {
            requestAnimationFrame(() => {
                callback(action);
            });
        }
        else {
            setTimeout(() => {
                action.done();
            }, 500);
        }
    })
        .then(() => {
        release(eventTarget, bindClickElement, pageBlock);
    })
        .catch(() => {
        release(eventTarget, bindClickElement, pageBlock);
    });
    if (isCheckboxOrRadio) {
        return true;
    }
    return false;
}
function lock(eventTarget, bindClickElement, pageBlock) {
    if (pageBlock === true) {
        pageEventBlock = true;
    }
    else if (bindClickElement) {
        if (bindClickElement.type === 'radio') {
            radioEventBlock = true;
        }
        else {
            bindClickElement.preventClick = true;
        }
    }
    else if (eventTarget) {
        if (eventTarget.type === 'radio') {
            radioEventBlock = true;
        }
        else {
            eventTarget.preventClick = true;
        }
    }
    else {
        pageEventBlock = true;
    }
}
function release(eventTarget, bindClickElement, pageBlock) {
    if (pageBlock === true) {
        pageEventBlock = false;
    }
    else if (bindClickElement) {
        if (bindClickElement.type === 'radio') {
            radioEventBlock = false;
        }
        else if (bindClickElement.type === 'checkbox') {
            bindClickElement.preventClick = false;
        }
        else {
            setTimeout(() => {
                bindClickElement.preventClick = false;
            }, 600);
        }
    }
    else if (eventTarget) {
        if (eventTarget.type === 'radio') {
            radioEventBlock = false;
        }
        else if (eventTarget.type === 'checkbox') {
            eventTarget.preventClick = false;
        }
        else {
            setTimeout(() => {
                eventTarget.preventClick = false;
            }, 600);
        }
    }
    else {
        pageEventBlock = false;
    }
}
