import { preventClick } from '../event/click-prevent.fn';
/**
 * 控制target元素以下(含target本身)的a.href點擊
 *
 * @param target - 要開始handle的父層元素
 */
export function handleAHrefClick(target, callback) {
    if (target == null)
        return;
    window.requestAnimationFrame(() => {
        const links = target.querySelectorAll('a');
        links.forEach((link) => {
            handleClick(link, callback);
        });
        handleClick(target, callback);
    });
}
function handleClick(link, callback) {
    const href = link.getAttribute('href');
    if (href == null)
        return;
    link.addEventListener('click', (e) => {
        preventClick(e, (action) => {
            callback(action, href);
        }, link);
    }, true // 用true確保執行順序較其他早
    );
}
