import { isBlank } from '../validator/is-blank.fn';
/**
 * 把url中的值轉出url與params
 *
 * @param href - 連結中href的值
 */
export function parseUrl(val) {
    let url = '';
    const params = {};
    if (isBlank(val)) {
        return [url, params];
    }
    const splitIndex = val.indexOf('?');
    if (splitIndex > -1) {
        // href有?
        url = val.substring(0, splitIndex);
        const paramString = val.substring(splitIndex + 1);
        const tokens = paramString.split('&');
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (!isBlank(token)) {
                const keyValue = token.split('=');
                // key不得為空
                if (keyValue.length >= 2 && !isBlank(keyValue[0])) {
                    // 取得首個等號後的字串
                    params[keyValue[0]] = token.substring(token.indexOf('=') + 1);
                }
            }
        }
    }
    else {
        url = val;
    }
    return [url, params];
}
