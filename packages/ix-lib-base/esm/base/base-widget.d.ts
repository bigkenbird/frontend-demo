import { IEditableData } from './base-interface';
import { BaseLogger } from './base-logger';
/**
 * Widget基本父類別
 */
export declare abstract class BaseWidget extends BaseLogger {
    /**
     * widgetId
     */
    protected widgetId: string;
    /**
     * Widget Name
     * 使用constructor.name在production模式會被rename,所以固定寫
     */
    protected abstract widgetName: string;
    /**
     * Widget內i18n文字
     */
    protected abstract i18nMessage: IEditableData;
    /**
     * 網址根路徑
     * <p>圖片：URL_ROOT + '/app/ib/inc/img/abc.jpg'</>
     */
    URL_ROOT: string;
    /**
     * constructor
     */
    constructor();
    /**
     * 取得 Widget內設定的i18n文字
     *
     * @param key
     * @returns
     */
    i18n(key: string, params?: (string | number)[]): string;
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
}
