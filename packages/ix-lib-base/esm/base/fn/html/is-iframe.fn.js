/**
 * 是否在iframe中
 */
export function isIFrame() {
    return window.self != window.top;
}
