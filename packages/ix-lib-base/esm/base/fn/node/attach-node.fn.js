/**
 * attach - 把node放入parentNode下的最後位置
 *
 * @param parentNode
 * @param node
 * @returns
 */
export function attachNode(parentNode, node) {
    if (parentNode == null || node == null)
        return null;
    return parentNode.appendChild(node);
}
