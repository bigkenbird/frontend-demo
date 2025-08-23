let _click = false;
/**
 * 阻擋瀏覽器返回鈕
 */
export function blockBrowserBackButton(callback) {
    // 預設增加一筆阻擋使用者按返回就回前網站，但要注意沒有點擊過網頁內容，瀏覽器會完全忽略直接回前網站
    window.history.pushState(null, null, window.location.origin);
    window.onpopstate = () => {
        setBrowserBackButtonClick(true);
        // 後續使用者按下返回，就補一筆阻擋回前網站
        window.history.pushState(null, null, window.location.origin);
        if (callback)
            callback();
    };
}
export function isBrowserBackButtonClick() {
    return _click;
}
export function setBrowserBackButtonClick(click) {
    _click = click;
}
