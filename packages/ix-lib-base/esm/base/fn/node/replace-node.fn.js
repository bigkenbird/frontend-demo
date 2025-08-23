/**
 * 新節點取代舊節點
 * @param parentNode
 * @param node
 * @returns
 */
export function replaceNode(newNode, existingNode) {
    return existingNode.parentNode.replaceChild(newNode, existingNode);
}
