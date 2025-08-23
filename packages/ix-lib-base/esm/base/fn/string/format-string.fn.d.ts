/**
 * 取代字串裡的{0},{1},依params['value1', 'value2']取代
 *
 * @example
 * ```
 * formatString('hello {0}', ['everyone']) // 'hello everyone'
 * ```
 */
export declare function formatString(str: string, params: string[]): string;
