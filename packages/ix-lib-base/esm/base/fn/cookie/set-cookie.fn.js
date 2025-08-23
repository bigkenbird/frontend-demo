/**
 * 設定cookie
 *
 * @param cname - cookie名稱
 * @param cvalue - 值
 * @param exhours - 過多久逾時(hours)
 */
export function setCookie(cname, cvalue, exhours, secure = false) {
    let expires = '';
    if (exhours != null) {
        const d = new Date();
        d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
        expires = 'expires=' + d.toUTCString() + ';max-age=' + exhours * 60 * 60 + ';';
    }
    document.cookie = cname + '=' + cvalue + ';' + expires + 'path=/' + (secure ? ';secure' : '');
}
