import { canvasToImageBase64 } from './canvas-to-img-base64.fn';
/**
 * 圖片加上文字浮水印
 * @param canvas
 * @param text
 * @returns base64 string
 * // TODO: 未完 成1
 */
export function imageAddTextWatermark(canvas, text) {
    const ctx = canvas.getContext('2d');
    // 文字設定
    ctx.font = '50px Arial';
    ctx.fillStyle = 'red';
    // 置中
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    // 透明度
    ctx.globalAlpha = 0.2;
    // jpeg不支援透明背景需fill
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 轉base64
    return canvasToImageBase64(canvas);
}
// /**
//  * 圖片加上文字浮水印
//  * @param canvas
//  * @param text
//  * @returns BLOB
//  */
// export async function imageAddTextWatermark(canvas: HTMLCanvasElement, text: string): Promise<Blob> {
//   const ctx = canvas.getContext('2d');
//   // 文字設定
//   ctx.font = '50px Times New Roman';
//   ctx.fillStyle = 'red';
//   // 置中
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.fillText(text, canvas.width / 2, canvas.height / 2);
//   // 轉BLOB
//   return await canvasToBlob(canvas);
// }
