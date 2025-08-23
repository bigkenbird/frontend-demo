/**
 * prepend - 把node放入parentNode下的第一個位置
 *
 * @param parentNode
 * @param node
 * @returns
 */
export function prependNode(parentNode, node) {
    if (parentNode == null || node == null)
        return null;
    return parentNode.insertBefore(node, parentNode.firstChild);
}
