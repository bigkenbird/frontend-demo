import { IEnvInfo } from '../base-interface';
/**
 * 是否為NativeApp環境
 * <b>這邊只判斷是否存在cordova變數是否存在</b>
 */
export declare function isNativeApp(): boolean;
/**
 * 是否為行動裝置(只看Android與iOS)
 */
export declare function isMobile(): boolean;
/**
 * 是否為行動裝置Browser(iOS與Android)
 */
export declare function isMobileBrowser(): boolean;
/**
 * 是否為桌面應用裝置
 */
export declare function isDesktop(): boolean;
/**
 * 是否為行動版Safari瀏覽器
 */
export declare function isSafariMobile(): boolean;
/**
 * 是否為桌面版Safari瀏覽器
 */
export declare function isSafariDesktop(): boolean;
/**
 * 是否為Chrome for iOS瀏覽器
 */
export declare function isChromeIOS(): boolean;
/**
 * 是否為Chrome瀏覽器(含Chrome for iOS)
 */
export declare function isChrome(): boolean;
/**
 * 是否為firefox瀏覽器
 */
export declare function isFirefox(): boolean;
/**
 * 是否為IE瀏覽器
 */
export declare function isIE(): boolean;
/**
 * 是否為Edge瀏覽器(含Edge for iOS)
 */
export declare function isEdge(): boolean;
/**
 * 是否為Edge for iOS瀏覽器
 */
export declare function isEdgeIOS(): boolean;
/**
 * 是否為iPad
 */
export declare function isIPad(): boolean;
/**
 * 是否為iPhone
 */
export declare function isIPhone(): boolean;
/**
 * 是否為Android
 */
export declare function isAndroid(): boolean;
/**
 * 是否為Android Browser
 * 在Android App 會 return false;
 * 在Android Browser 會 return true;
 */
export declare function isAndroidBrowser(): boolean;
/**
 * 是否為iOS
 */
export declare function isIOS(): boolean;
/**
 * 是否為iOS的Browser(含Chrome for iOS, Edge for iOS)
 * 在iOS App 會 return false;
 * 在iOS Browser 會 return true;
 */
export declare function isIOSBrowser(): boolean;
/**
 * 是否為Apple Mac作業系統
 */
export declare function isMacOS(): boolean;
/**
 * 是否為Windows作業系統
 */
export declare function isWindows(): boolean;
/**
 * 是否為unix類
 */
export declare function isUnixLike(): boolean;
/**
 * 取得瀏覽器版本
 *
 * @example
 * ```
 * getBrowserVersionString() // '66.011.1', '38.1', '8', '0'...
 * ```
 * @returns 版本號數字，無法取得或異常為0
 */
export declare function getBrowserVersionString(): string;
/**
 * 取得瀏覽器版號
 *
 * @example
 * ```
 * getBrowserVersion() // 66.11, 38.1, 8, 0...
 * ```
 */
export declare function getBrowserVersion(): number;
/**
 * 取得瀏覽器id
 *
 * @example
 * ```
 * getBrowserId() // edge, ie, chrome, safari, firefox, unknown
 * ```
 */
export declare function getBrowserId(): string;
/**
 * 取得作業系統版本號字串
 *
 * @example
 * ```
 * getOSVersionString() // "8.1.0"
 * ```
 * @returns 作業系統版本號字串
 */
export declare function getOSVersionString(): string;
/**
 * 取得作業系統版本號類別
 *
 * @example
 * ```
 * getOSVersionCategories() // [3, 1, 10]
 * ```
 * @returns 作業系統版本號陣列，長度固定為3，依序是主版號,子版號,修正版號
 */
export declare function getOSVersionCategories(): number[];
/**
 * 取得作業系統主版號
 *
 * @example
 * ```
 * getOSVersionMajor() // 8
 * ```
 * @returns 主版號數字
 */
export declare function getOSVersionMajor(): number;
/**
 * 取得作業系統子版號
 *
 * @example
 * ```
 * getOSVersionMinor() // 1
 * ```
 * @returns 子版號數字
 */
export declare function getOSVersionMinor(): number;
/**
 * 取得作業系統修正版號
 *
 * @example
 * ```
 * getOSVersionBugfix() // 0
 * ```
 * @returns 修正版號數字
 */
export declare function getOSVersionBugfix(): number;
/**
 * 取得 作業系統id
 *
 * @example
 * ```
 * getOSId() // windows, macos, ios, android, unknown
 * ```
 * @returns 作業系統id字串
 */
export declare function getOSId(): string;
/**
 * 是否為InAppBrowser開啟(目前只判斷facebook, line, wechat, instagram)
 */
export declare function isInAppBrowser(): boolean;
/**
 * 是否為line的InAppBrowser(url加上?openExternalBrowser=1可直接用系統瀏覽器開啟)
 */
export declare function isInAppBrowser_line(): boolean;
/**
 * 是否為facebook的InAppBrowser
 */
export declare function isInAppBrowser_facebook(): boolean;
/**
 * 是否為wechat的InAppBrowser
 */
export declare function isInAppBrowser_wechat(): boolean;
/**
 * 是否為instagram的InAppBrowser
 */
export declare function isInAppBrowser_instagram(): boolean;
/**
 * 取得全部環境資訊
 */
export declare function getEnvInfoAll(): IEnvInfo;
