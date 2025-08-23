/**
 * 綁定元素出現在螢幕上 event
 * 透過scroll event實作有效能考量，新做法可用element-visible-oberver.fn.ts
 *
 * @param scrollingElement
 * @param element
 * @param callback
 */
export declare function bindElementVisibleEvent(scrollingElement: HTMLElement, element: HTMLElement, callback: (element: HTMLElement) => void): void;
