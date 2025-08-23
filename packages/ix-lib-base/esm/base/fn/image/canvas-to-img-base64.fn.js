/**
 * 轉換canvas內容為圖片base64格式
 *
 * @param canvas
 * @param type 2: jpge 其他都為png
 * @param quality 0~1.0
 * @returns "data:image/png;base64,iVBO..."
 */
export function canvasToImageBase64(canvas, type = 1, quality = 0.8) {
    if (type === 2) {
        // jpeg才有quality
        return canvas.toDataURL('image/jpeg', quality);
    }
    return canvas.toDataURL('image/png');
}
