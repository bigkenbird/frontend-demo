let observer;
// Infinite Scrolling
/**
 * 初始觀察者
 *
 * @param callback
 */
export function initElementVisibleObserver(callback, options) {
    if (window.IntersectionObserver) {
        disconnectElementVisibleObserver();
        observer = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback(entry);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: [0],
            ...options
        });
    }
}
/**
 * 中止觀察者
 */
export function disconnectElementVisibleObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}
/**
 * 加入element觀察
 * @param element
 */
export function observeElementVisible(element) {
    if (observer) {
        observer.observe(element);
    }
}
/**
 * 取消element觀察
 *
 * @param element
 */
export function unobserveElementVisible(element) {
    if (observer) {
        observer.unobserve(element);
    }
}
