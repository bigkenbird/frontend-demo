/**
 * reload App
 */
export function reloadApp() {
    return new Promise((r) => {
        // 有/www/通常會是Native App
        const token = '/www/';
        if (location.href.indexOf(token) > -1) {
            location.href = location.href.substring(0, location.href.indexOf(token) + token.length) + 'index.html';
        }
        else {
            document.location.reload();
        }
        requestAnimationFrame(r);
    });
}
