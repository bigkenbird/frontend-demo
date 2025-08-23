import { isBlank } from '../validator/is-blank.fn';
/**
 * 大約計算base64檔案bytes大小
 *
 * @example
 * ```
 * base64CalculateSizeInBytes(null) // 0
 * base64CalculateSizeInBytes('testtesttest') // 9
 * ```
 * @param base64Str base64字串
 * @returns 單位bytes
 */
export function base64CalculateSizeInBytes(base64Str) {
    if (isBlank(base64Str))
        return 0;
    return Math.round(base64Str.length * (3 / 4));
}
