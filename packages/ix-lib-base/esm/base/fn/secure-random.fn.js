/**
 * 整數範圍內 產生一個亂數
 * @example
 * ```
 * secureRandom(0, 100) // 隨機產生0~100的一個整數值
 * ```
 * @param min
 * @param max
 * @returns 會隨機產生指定範圍的一個整數值
 */
export function secureRandom(min, max) {
    const randomBuffer = new Uint32Array(1);
    // IE 11之後才有支援
    const crypto = window.crypto || window.msCrypto;
    crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
}
