import { getCookie } from './get-cookie.fn';
/**
 * 檢查cookie是否存在
 */
export function hasCookie(cname) {
    const value = getCookie(cname);
    return value != null;
}
