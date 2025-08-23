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
export function getParentElement(node) {
    if (node == null)
        return null;
    // parentElement支援度較低，取得null時再取parentNode
    let parent = node.parentElement;
    if (parent) {
        return parent;
    }
    else {
        parent = node.parentNode;
        if (parent == null)
            return null;
        // <html>再上去會是document，這邊就直接傳回null
        if (parent.nodeType === Node.DOCUMENT_NODE)
            return null;
        return parent;
    }
}
