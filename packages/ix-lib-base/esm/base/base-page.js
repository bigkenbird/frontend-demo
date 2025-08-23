import { BaseLogger } from './base-logger';
import { debug } from './fn/logger/debug.fn';
import { error } from './fn/logger/error.fn';
import { fatal } from './fn/logger/fatal.fn';
import { info } from './fn/logger/info.fn';
import { warning } from './fn/logger/warning.fn';
/**
 * 頁面 基礎父類
 */
export class BasePage extends BaseLogger {
    /**
     * 網址根路徑
     * <p>圖片：URL_ROOT + '/app/ib/inc/img/abc.jpg'</>
     */
    URL_ROOT = '.';
    /**
     * 紀錄頁面目前捲動位置
     */
    scrollPosition = 0;
    /**
     * log debug level
     */
    debug(...logs) {
        debug('[', this.routeUrl, ']', ...logs);
    }
    /**
     * log info level
     */
    info(...logs) {
        info('[', this.routeUrl, ']', ...logs);
    }
    /**
     * log warning level
     */
    warning(...logs) {
        warning('[', this.routeUrl, ']', ...logs);
    }
    /**
     * log error level
     */
    error(...logs) {
        error('[', this.routeUrl, ']', ...logs);
    }
    /**
     * log fatal level
     */
    fatal(...logs) {
        fatal('[', this.routeUrl, ']', ...logs);
    }
    // /**
    //  * page init event
    //  */
    // protected _init(): void {
    //   this.debug('init()');
    // }
    // /**
    //  * page destroy event
    //  */
    // protected _destroy(): void {
    //   this.debug('destroy()');
    // }
    // /**
    //  * page reuse event
    //  *
    //  * @param data reuse使用的資料
    //  */
    // protected _reuse(data: IData): void {
    //   this.debug('reuse() data:', data);
    // }
    /**
     * 是否記錄捲動位置
     *
     * @returns
     */
    saveScrollPosition() {
        return false;
    }
}
