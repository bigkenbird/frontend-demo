import { isIFrame } from './is-iframe.fn';
/**
 * 開啟其他瀏覽器頁籤
 * <p>透過產生a href的click達成效果</p>
 * <p>提醒在非同步內function或非使用者觸發function內直接執行可能會被browser阻擋</p>
 *
 * @param url - 網址
 */
export function openBrowserTab(url) {
    const doc = isIFrame() ? window.parent.document : window.document;
    const a = doc.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', url);
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
}
