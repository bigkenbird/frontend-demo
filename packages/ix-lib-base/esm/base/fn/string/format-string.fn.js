import { isBlank } from '../validator/is-blank.fn';
/**
 * 取代字串裡的{0},{1},依params['value1', 'value2']取代
 *
 * @example
 * ```
 * formatString('hello {0}', ['everyone']) // 'hello everyone'
 * ```
 */
export function formatString(str, params) {
    if (isBlank(str)) {
        return str;
    }
    for (let i = 0; i < params.length; i++) {
        str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), params[i]);
    }
    return str;
}
