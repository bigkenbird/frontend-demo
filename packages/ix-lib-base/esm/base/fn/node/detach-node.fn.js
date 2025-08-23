/**
 * detach 節點
 * @param node
 * @returns
 */
export function detachNode(node) {
    return node.parentNode.removeChild(node);
}
