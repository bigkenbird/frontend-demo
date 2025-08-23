import { baseConfig } from '../base-config';
import { UNKNOWN } from '../constants';
import { error, isError } from './logger/error.fn';
/**
 * 所有環境資訊
 */
let info = null;
/**
 * browser agnet
 */
const browserAgent = navigator.userAgent.toLowerCase();
/**
 * 判斷browser 的pattern
 */
const browserPattern = {
    edge: {
        id: 'edge',
        pattern: {
            include: ['edg'],
            exclude: ['iemobile']
        }
    },
    ie: {
        id: 'ie',
        pattern: {
            include: ['trident', 'msie'],
            exclude: ['iemobile']
        }
    },
    chrome: {
        id: 'chrome',
        pattern: {
            include: ['chrome', 'crios'],
            exclude: ['edg', 'msie', 'firefox', 'opr/', 'opera']
        }
    },
    // chrome_ios: {
    //   id: 'chrome_ios',
    //   pattern: {
    //     include: ['crios'],
    //     exclude: ['chrome', 'edg', 'iemobile', 'opr/', 'opera']
    //   }
    // },
    safari: {
        id: 'safari',
        pattern: {
            include: ['safari'],
            exclude: ['chrome', 'crios', 'edg', 'iemobile', 'opr/', 'opera']
        }
    },
    firefox: {
        id: 'firefox',
        pattern: {
            include: ['firefox'],
            exclude: []
        }
    }
};
/**
 * 判斷Browser Version的Pattern
 */
const browserVersionPattern = {
    edge: {
        // 舊版非chrome核心
        keyword: 'edge/',
        end: null
    },
    edg: {
        // chromium核心
        keyword: 'edg/',
        end: null
    },
    edge_android: {
        keyword: 'edga/',
        end: null
    },
    edge_ios: {
        keyword: 'edgios/',
        end: ' '
    },
    ie: {
        // ie10(含)以下
        keyword: 'msie ',
        end: ';'
    },
    chrome: {
        keyword: 'chrome/',
        end: ' '
    },
    chrome_ios: {
        keyword: 'crios/',
        end: ' '
    },
    firefox: {
        keyword: 'firefox/',
        end: null
    },
    safari: {
        keyword: 'version/',
        end: ' '
    },
    // 放最後"rv:"有其他瀏覽器使用
    ie11: {
        keyword: 'rv:',
        end: ')'
    }
};
/**
 * 判斷OS的Pattern
 */
const OSPattern = {
    windows: {
        id: 'windows',
        pattern: {
            include: ['windows nt'],
            exclude: ['']
        }
    },
    macos: {
        id: 'macos',
        pattern: {
            include: ['mac os'],
            exclude: ['iphone', 'ipad', 'ipod']
        }
    },
    ios: {
        id: 'ios',
        pattern: {
            include: ['ipad', 'iphone', 'ipod'],
            exclude: ['iemobile']
        }
    },
    android: {
        id: 'android',
        pattern: {
            include: ['android'],
            exclude: ['windows phone']
        }
    }
};
/**
 * 判斷OS Version的Pattern
 */
const OSVersionPattern = {
    windows: {
        keyword: 'windows nt ',
        len: 11,
        cut: /;|\)/,
        split: '.'
    },
    android: {
        keyword: 'android',
        len: 8,
        cut: /;|\)/,
        split: '.'
    },
    iphone: {
        keyword: 'iphone os ',
        len: 10,
        cut: / |\)/,
        split: '_'
    },
    ipad: {
        keyword: 'ipad; cpu os ',
        len: 13,
        cut: / |\)/,
        split: '_'
    },
    macos: {
        keyword: 'mac os x',
        len: 9,
        cut: / |\)|;/,
        split: /_|\./
    }
};
/**
 * 是否符合比對，任一符合即回傳true
 *
 * @param configs
 * @returns
 */
function isMatching(configs) {
    const len = configs.length;
    for (let i = 0; i < len; i++) {
        let value = configs[i];
        if (value == null)
            continue;
        value = value.trim().toLowerCase();
        if (value === '')
            continue;
        const match = browserAgent.indexOf(value) > -1;
        if (match)
            return true;
    }
    return false;
}
/**
 * 檢查pattern
 *
 * @param includes 包含
 * @param excludes 不包含
 * @returns
 */
function checkPattern(includes, excludes) {
    if (!isMatching(excludes)) {
        return isMatching(includes);
    }
    return false;
}
/**
 * 是否為NativeApp環境
 * <b>這邊只判斷是否存在cordova變數是否存在</b>
 */
export function isNativeApp() {
    if (baseConfig.replaceNativeAppValue != null) {
        return baseConfig.replaceNativeAppValue;
    }
    return window.cordova != null;
}
/**
 * 是否為行動裝置(只看Android與iOS)
 */
export function isMobile() {
    if (info != null && info.mobile != null)
        return info.mobile;
    return isIOS() || isAndroid();
    // || checkPattern(['mobile', 'tablet', 'phone', 'droid'], []);
}
/**
 * 是否為行動裝置Browser(iOS與Android)
 */
export function isMobileBrowser() {
    return !isNativeApp() && (isIOS() || isAndroid());
}
/**
 * 是否為桌面應用裝置
 */
export function isDesktop() {
    if (info != null && info.desktop != null)
        return info.desktop;
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
    return isWindows() || isMacOS() || isUnixLike();
}
/**
 * 是否為Safari瀏覽器
 */
function isSafari() {
    // Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602.1
    if (browserPattern.safari == null)
        return false;
    return checkPattern(browserPattern.safari.pattern.include, browserPattern.safari.pattern.exclude);
}
/**
 * 是否為行動版Safari瀏覽器
 */
export function isSafariMobile() {
    if (info != null && info.safari_mobile != null)
        return info.safari_mobile;
    return isIOS() && isSafari();
}
/**
 * 是否為桌面版Safari瀏覽器
 */
export function isSafariDesktop() {
    if (info != null && info.safari_desktop != null)
        return info.safari_desktop;
    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12
    return isMacOS() && isSafari();
}
/**
 * 是否為Chrome for iOS瀏覽器
 */
export function isChromeIOS() {
    if (info != null && info.chrome_ios != null)
        return info.chrome_ios;
    // Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1
    if (browserPattern.chrome == null)
        return false;
    return isIOS() && checkPattern(browserPattern.chrome.pattern.include, browserPattern.chrome.pattern.exclude);
}
/**
 * 是否為Chrome瀏覽器(含Chrome for iOS)
 */
export function isChrome() {
    if (info != null && info.chrome != null)
        return info.chrome;
    if (browserPattern.chrome == null)
        return false;
    return checkPattern(browserPattern.chrome.pattern.include, browserPattern.chrome.pattern.exclude);
}
/**
 * 是否為firefox瀏覽器
 */
export function isFirefox() {
    if (info != null && info.firefox != null)
        return info.firefox;
    if (browserPattern.firefox == null)
        return false;
    return checkPattern(browserPattern.firefox.pattern.include, browserPattern.firefox.pattern.exclude);
}
/**
 * 是否為IE瀏覽器
 */
export function isIE() {
    if (info != null && info.ie != null)
        return info.ie;
    // IE8: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)
    // IE9: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)
    // IE10: Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)
    // IE11: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko
    if (browserPattern.ie == null)
        return false;
    return checkPattern(browserPattern.ie.pattern.include, browserPattern.ie.pattern.exclude);
}
/**
 * 是否為Edge瀏覽器(含Edge for iOS)
 */
export function isEdge() {
    if (info != null && info.edge != null)
        return info.edge;
    // Windows Desktop: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Edg/83.0.478.64
    // Windows Desktop: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19041
    // MacOS: Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.60
    // Android: Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36 EdgA/45.11.2.5116
    // iOS: Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 EdgiOS/45.11.1 Mobile/15E148 Safari/605.1.15
    if (browserPattern.edge == null)
        return false;
    return checkPattern(browserPattern.edge.pattern.include, browserPattern.edge.pattern.exclude);
}
/**
 * 是否為Edge for iOS瀏覽器
 */
export function isEdgeIOS() {
    if (info != null && info.edge_ios != null)
        return info.edge_ios;
    return isIOS() && isEdge();
}
/**
 * 是否為iPad
 */
export function isIPad() {
    if (info != null && info.ipad != null)
        return info.ipad;
    return checkPattern(['ipad'], ['iemobile']);
}
/**
 * 是否為iPhone
 */
export function isIPhone() {
    if (info != null && info.iphone != null)
        return info.iphone;
    return checkPattern(['iphone'], ['iemobile']);
}
/**
 * 是否為Android
 */
export function isAndroid() {
    if (info != null && info.android != null)
        return info.android;
    return checkPattern(['android'], ['windows phone']);
}
/**
 * 是否為Android Browser
 * 在Android App 會 return false;
 * 在Android Browser 會 return true;
 */
export function isAndroidBrowser() {
    return !isNativeApp() && isAndroid();
}
/**
 * 是否為iOS
 */
export function isIOS() {
    if (info != null && info.ios != null)
        return info.ios;
    return checkPattern(['ipad', 'iphone', 'ipod'], ['iemobile']);
}
/**
 * 是否為iOS的Browser(含Chrome for iOS, Edge for iOS)
 * 在iOS App 會 return false;
 * 在iOS Browser 會 return true;
 */
export function isIOSBrowser() {
    return !isNativeApp() && (isIOS() || isChromeIOS() || isEdgeIOS());
}
/**
 * 是否為Apple Mac作業系統
 */
export function isMacOS() {
    if (info != null && info.macos != null)
        return info.macos;
    return checkPattern(['mac os'], ['iphone', 'ipad', 'ipod']);
}
/**
 * 是否為Windows作業系統
 */
export function isWindows() {
    if (info != null && info.windows != null)
        return info.windows;
    // windows8: Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
    return checkPattern(['windows nt'], []);
}
/**
 * 是否為unix類
 */
export function isUnixLike() {
    if (info != null && info.unixlike != null)
        return info.unixlike;
    return checkPattern(['linux', 'unix', 'sunos'], ['mobile', 'tablet', 'phone', 'droid']);
}
/**
 * 取得瀏覽器版本
 *
 * @example
 * ```
 * getBrowserVersionString() // '66.011.1', '38.1', '8', '0'...
 * ```
 * @returns 版本號數字，無法取得或異常為0
 */
export function getBrowserVersionString() {
    if (info != null && info.browser_ver_string != null)
        return info.browser_ver_string;
    try {
        for (const key in browserVersionPattern) {
            if (browserVersionPattern[key] != null) {
                const pattern = browserVersionPattern[key];
                if (pattern == null)
                    continue;
                const index = browserAgent.indexOf(pattern.keyword);
                if (index > -1) {
                    let ver = browserAgent.substring(index + pattern.keyword.length);
                    if (pattern.end != null && pattern.end != '') {
                        ver = ver.substring(0, ver.indexOf(pattern.end));
                    }
                    // 防呆
                    const index2 = ver.indexOf(' ');
                    if (index2 > -1) {
                        return ver.substring(0, index2);
                    }
                    return ver;
                }
            }
        }
    }
    catch (e) {
        logError('getBrowserVersion() Catch Error', e);
    }
    return '0';
}
/**
 * 取得瀏覽器版號
 *
 * @example
 * ```
 * getBrowserVersion() // 66.11, 38.1, 8, 0...
 * ```
 */
export function getBrowserVersion() {
    if (info != null && info.browser_ver != null)
        return info.browser_ver;
    const ver = parseFloat(getBrowserVersionString());
    return isNaN(ver) ? 0 : ver;
}
/**
 * 取得瀏覽器id
 *
 * @example
 * ```
 * getBrowserId() // edge, ie, chrome, safari, firefox, unknown
 * ```
 */
export function getBrowserId() {
    if (info != null && info.browser_id != null)
        return info.browser_id;
    for (const key in browserPattern) {
        if (browserPattern[key] != null) {
            const pattern = browserPattern[key];
            if (pattern == null)
                continue;
            if (checkPattern(pattern.pattern.include, pattern.pattern.exclude)) {
                return pattern.id;
            }
        }
    }
    return UNKNOWN;
}
/**
 * 取得作業系統版本
 *
 * @example
 * ```
 * getOSVersion() // { major:10, minor:0, bugfix:1 }
 * ```
 * @returns 主版號, 子版號, 修正版號
 */
function getOSVersion() {
    if (info != null && info.os_ver != null)
        return info.os_ver;
    const version = {
        major: 0,
        minor: 0,
        bugfix: 0
    };
    try {
        for (const key in OSVersionPattern) {
            if (OSVersionPattern[key] != null) {
                const pattern = OSVersionPattern[key];
                if (pattern == null)
                    continue;
                const index = browserAgent.indexOf(pattern.keyword);
                if (index > -1) {
                    const token = browserAgent.substring(index + pattern.len).split(pattern.cut)[0] || '0.0.0';
                    const choped = token.split(pattern.split);
                    version.major = parseInt(choped[0] || '0');
                    version.minor = parseInt(choped[1] || '0');
                    version.bugfix = parseInt(choped[2] || '0');
                    if (key === 'windows') {
                        // 5.0 > XP
                        // 6.0 > Vista
                        // 6.1 > 7
                        // 6.2 > 8
                        // 6.3 > 8.1
                        // 10.0 > 10
                        const minor = version.minor;
                        version.minor = 0;
                        version.bugfix = 0;
                        if (version.major === 6) {
                            version.bugfix = 0;
                            if (minor == 1) {
                                version.major = 7;
                            }
                            else if (minor === 2) {
                                version.major = 8;
                            }
                            else if (minor === 3) {
                                version.major = 8;
                                version.minor = 1;
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
    catch (e) {
        logError('getOSVersion() Catch Error', e);
    }
    return version;
}
/**
 * 取得作業系統版本號字串
 *
 * @example
 * ```
 * getOSVersionString() // "8.1.0"
 * ```
 * @returns 作業系統版本號字串
 */
export function getOSVersionString() {
    if (info != null && info.os_ver_str != null)
        return info.os_ver_str;
    const version = getOSVersion();
    return `${version.major}.${version.minor}.${version.bugfix}`;
}
/**
 * 取得作業系統版本號類別
 *
 * @example
 * ```
 * getOSVersionCategories() // [3, 1, 10]
 * ```
 * @returns 作業系統版本號陣列，長度固定為3，依序是主版號,子版號,修正版號
 */
export function getOSVersionCategories() {
    if (info != null && info.os_ver_categories != null)
        return info.os_ver_categories;
    return [getOSVersionMajor(), getOSVersionMinor(), getOSVersionBugfix()];
}
/**
 * 取得作業系統主版號
 *
 * @example
 * ```
 * getOSVersionMajor() // 8
 * ```
 * @returns 主版號數字
 */
export function getOSVersionMajor() {
    return getOSVersion().major;
}
/**
 * 取得作業系統子版號
 *
 * @example
 * ```
 * getOSVersionMinor() // 1
 * ```
 * @returns 子版號數字
 */
export function getOSVersionMinor() {
    return getOSVersion().minor;
}
/**
 * 取得作業系統修正版號
 *
 * @example
 * ```
 * getOSVersionBugfix() // 0
 * ```
 * @returns 修正版號數字
 */
export function getOSVersionBugfix() {
    return getOSVersion().bugfix;
}
/**
 * 取得 作業系統id
 *
 * @example
 * ```
 * getOSId() // windows, macos, ios, android, unknown
 * ```
 * @returns 作業系統id字串
 */
export function getOSId() {
    if (info != null && info.os_id != null)
        return info.os_id;
    for (const key in OSPattern) {
        if (OSPattern[key] != null) {
            const pattern = OSPattern[key];
            if (pattern == null)
                continue;
            if (checkPattern(pattern.pattern.include, pattern.pattern.exclude)) {
                return pattern.id;
            }
        }
    }
    return UNKNOWN;
}
/**
 * 是否為InAppBrowser開啟(目前只判斷facebook, line, wechat, instagram)
 */
export function isInAppBrowser() {
    if (info != null && info.inappbrowser != null)
        return info.inappbrowser;
    return isInAppBrowser_facebook() || isInAppBrowser_line() || isInAppBrowser_wechat() || isInAppBrowser_instagram();
}
/**
 * 是否為line的InAppBrowser(url加上?openExternalBrowser=1可直接用系統瀏覽器開啟)
 */
export function isInAppBrowser_line() {
    return browserAgent.indexOf('line') > -1;
}
/**
 * 是否為facebook的InAppBrowser
 */
export function isInAppBrowser_facebook() {
    return browserAgent.indexOf('fb') > -1;
}
/**
 * 是否為wechat的InAppBrowser
 */
export function isInAppBrowser_wechat() {
    return browserAgent.indexOf('micromessenger') > -1;
}
/**
 * 是否為instagram的InAppBrowser
 */
export function isInAppBrowser_instagram() {
    return browserAgent.indexOf('instagram') > -1;
}
/**
 * 初始化環境資訊
 */
function initInfo() {
    info = {
        mobile: isMobile(),
        desktop: isDesktop(),
        safari_mobile: isSafariMobile(),
        safari_desktop: isSafariDesktop(),
        chrome_ios: isChromeIOS(),
        chrome: isChrome(),
        firefox: isFirefox(),
        ie: isIE(),
        edge: isEdge(),
        edge_ios: isEdgeIOS(),
        ipad: isIPad(),
        iphone: isIPhone(),
        android: isAndroid(),
        ios: isIOS(),
        macos: isMacOS(),
        windows: isWindows(),
        unixlike: isUnixLike(),
        browser_ver_string: getBrowserVersionString(),
        browser_ver: getBrowserVersion(),
        browser_id: getBrowserId(),
        os_ver: getOSVersion(),
        os_ver_categories: getOSVersionCategories(),
        os_ver_str: getOSVersionString(),
        os_id: getOSId(),
        inappbrowser: isInAppBrowser()
    };
}
/**
 * 取得全部環境資訊
 */
export function getEnvInfoAll() {
    return info;
}
function logError(...logs) {
    if (isError())
        error('[ env-info ]', ...logs);
}
// 執行initInfo()
initInfo();
