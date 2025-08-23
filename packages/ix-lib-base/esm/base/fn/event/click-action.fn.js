/**
 * 紀錄IAction用,會在換頁時清除
 */
let clickActions = [];
/**
 * 紀錄clickAction
 *
 * @param action
 */
export function addClickAction(action) {
    if (clickActions == null)
        clickActions = [];
    clickActions.push(action);
}
/**
 * 清除clickAction
 */
export function clearAllClickAction() {
    if (clickActions != null && clickActions.length > 0) {
        const actions = clickActions;
        clickActions = null;
        // 重覆執行done不會再觸發
        actions.forEach((action) => {
            action.done();
        });
    }
}
