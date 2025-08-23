/**
 * 控制target元素以下(含target本身)的圖片讀取錯誤
 */
export function handleImageError(target, callback) {
    if (target == null)
        return;
    if (target.tagName == 'IMG') {
        handleError(target, callback);
    }
    const imgs = target.querySelectorAll('img');
    imgs.forEach((img) => {
        handleError(img, callback);
    });
}
function handleError(target, callback) {
    target.addEventListener('error', (e) => {
        callback(e, target.getAttribute('src') || '');
    });
}
