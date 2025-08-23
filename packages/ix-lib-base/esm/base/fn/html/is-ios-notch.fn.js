import { isIOS } from '../env-info.fn';
/**
 * 是否為有瀏海的iOS
 */
export function isIOSNotch() {
    if (isIOS()) {
        const aspect = window.screen.width / window.screen.height;
        if (aspect.toFixed(3) === '0.462') {
            return true;
        }
    }
    return false;
}
