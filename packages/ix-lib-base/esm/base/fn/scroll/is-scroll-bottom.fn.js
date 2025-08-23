export function isScrollBottom(scrollingElement) {
    return scrollingElement.scrollTop + scrollingElement.clientHeight >= scrollingElement.scrollHeight - 1;
}
