/**
 * 取得 parent HTML Element
 *
 * 最上層只取到<html>，再上去會回傳null (等同parentElement)
 *
 * @example
 * ```
 * getParentElement(document.documentElement) // null, document.documentElement為 html element
 * getParentElement(document.body) // html element
 * getParentElement(null) // null
 * getParentElement(document.querySelector('.test')) // .test的上一層element
 * ```
 */
export declare function getParentElement(node: Node | HTMLElement): Node | HTMLElement | null;
