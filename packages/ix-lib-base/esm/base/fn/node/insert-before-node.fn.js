/**
 * 在同階層節點前放入新節點
 * @param parentNode
 * @param node
 * @returns
 */
export function insertBeforeNode(newNode, existingNode) {
    return existingNode.parentNode.insertBefore(newNode, existingNode);
}
