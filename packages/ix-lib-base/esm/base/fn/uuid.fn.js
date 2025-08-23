import { secureRandom } from './secure-random.fn';
/**
 * 產生uuid
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
        const r = secureRandom(0, 15);
        // x=0~F, y=8,9,A,B
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    })
        .toUpperCase();
}
