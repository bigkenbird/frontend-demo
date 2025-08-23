import { isBlank } from '../validator/is-blank.fn';
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
export function loadImage(src, secondSrc = '', success, failure, maxCount = 2, retryInterval = 3000, count = 0) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        if (success != null) {
            success(img);
        }
    };
    img.onerror = () => {
        count++;
        if (count < maxCount) {
            // 讀取失敗時,間隔再取一次
            setTimeout(() => {
                loadImage(src, secondSrc, success, failure, maxCount, retryInterval, count);
            }, retryInterval);
        }
        else {
            if (isBlank(secondSrc)) {
                if (failure != null)
                    failure();
            }
            else {
                // 改為讀取第二圖片
                loadImage(secondSrc, '', success, failure, maxCount, retryInterval, 0);
            }
        }
    };
}
