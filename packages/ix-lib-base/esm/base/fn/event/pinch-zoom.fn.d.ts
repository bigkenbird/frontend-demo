/**
 * 兩指縮放 event
 *
 * @param element
 * @param zoomIn
 * @param zoomOut
 */
export declare function bindPinchZoom(element: HTMLElement, zoomIn: (e: TouchEvent, ratio: number) => void, zoomOut: (e: TouchEvent, ratio: number) => void): void;
