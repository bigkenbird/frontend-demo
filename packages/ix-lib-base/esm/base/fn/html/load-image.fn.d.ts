/**
 * 讀取image與第二image
 *
 * @param src 圖檔url
 * @param secondSrc 第二圖檔url
 * @param success
 * @param failure
 * @param maxCount 最多取幾次, 2就是含初始取1次，失敗會再取1次
 * @param retryInterval 重試間隔(ms)
 * @param count 程式用 不須傳入參數
 */
export declare function loadImage(src: string, secondSrc?: string, success?: (imgElement: HTMLImageElement) => void, failure?: () => void, maxCount?: number, retryInterval?: number, count?: number): void;
