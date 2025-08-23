import { BaseForm } from './base-form';
import { BaseLogger } from './base-logger';
/**
 * 頁面 基礎父類
 */
export declare abstract class BasePage extends BaseLogger {
    /**
     * 頁面PK
     */
    abstract pagePk: string;
    /**
     * 頁面描述
     */
    protected abstract pageDescription: string;
    /**
     * 網址根路徑
     * <p>圖片：URL_ROOT + '/app/ib/inc/img/abc.jpg'</>
     */
    URL_ROOT: string;
    /**
     * 頁面路由路徑
     */
    abstract routeUrl: string;
    /**
     * 前頁的頁面路由路徑
     */
    protected abstract previousRouteUrl: string;
    /**
     * 紀錄頁面目前捲動位置
     */
    scrollPosition: number;
    /**
     * 表單
     */
    abstract form: BaseForm;
    /**
     * log debug level
     */
    protected debug(...logs: any[]): void;
    /**
     * log info level
     */
    protected info(...logs: any[]): void;
    /**
     * log warning level
     */
    protected warning(...logs: any[]): void;
    /**
     * log error level
     */
    protected error(...logs: any[]): void;
    /**
     * log fatal level
     */
    protected fatal(...logs: any[]): void;
    /**
     * 是否記錄捲動位置
     *
     * @returns
     */
    protected saveScrollPosition(): boolean;
    /**
     * 取得 頁面的根元素
     */
    protected abstract getPageRootElement(): HTMLElement;
}
