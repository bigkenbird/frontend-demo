export function createHiddenCanvas(parentNode) {
    if (parentNode == null)
        parentNode = document.body;
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    return parentNode.appendChild(canvas);
}
