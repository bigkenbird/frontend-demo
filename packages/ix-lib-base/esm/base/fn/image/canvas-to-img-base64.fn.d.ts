/**
 * 轉換canvas內容為圖片base64格式
 *
 * @param canvas
 * @param type 2: jpge 其他都為png
 * @param quality 0~1.0
 * @returns "data:image/png;base64,iVBO..."
 */
export declare function canvasToImageBase64(canvas: HTMLCanvasElement, type?: number, quality?: number): string;
