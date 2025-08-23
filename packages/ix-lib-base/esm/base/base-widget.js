import { BaseLogger } from './base-logger';
import { debug } from './fn/logger/debug.fn';
import { error } from './fn/logger/error.fn';
import { fatal } from './fn/logger/fatal.fn';
import { info } from './fn/logger/info.fn';
import { warning } from './fn/logger/warning.fn';
import { nextSeqNoStr } from './fn/next-seqno.fn';
import { isBlank } from './fn/validator/is-blank.fn';
/**
 * Widget基本父類別
 */
export class BaseWidget extends BaseLogger {
    /**
     * widgetId
     */
    widgetId = '-1';
    /**
     * 網址根路徑
     * <p>圖片：URL_ROOT + '/app/ib/inc/img/abc.jpg'</>
     */
    URL_ROOT = '.';
    /**
     * constructor
     */
    constructor() {
        super();
        this.widgetId = nextSeqNoStr();
    }
    /**
     * 取得 Widget內設定的i18n文字
     *
     * @param key
     * @returns
     */
    i18n(key, params) {
        if (isBlank(key))
            return 'unknown i18n key';
        if (this.i18nMessage[key]) {
            let txt = this.i18nMessage[key];
            if (params != null) {
                params.forEach((param, i) => {
                    txt = txt.replace(new RegExp('\\{' + i + '\\}', 'g'), param);
                });
            }
            return txt;
        }
        return key;
    }
    /**
     * log debug level
     */
    debug(...logs) {
        debug('[', this.widgetName, this.widgetId, ']', ...logs);
    }
    /**
     * log info level
     */
    info(...logs) {
        info('[', this.widgetName, this.widgetId, ']', ...logs);
    }
    /**
     * log warning level
     */
    warning(...logs) {
        warning('[', this.widgetName, this.widgetId, ']', ...logs);
    }
    /**
     * log error level
     */
    error(...logs) {
        error('[', this.widgetName, this.widgetId, ']', ...logs);
    }
    /**
     * log fatal level
     */
    fatal(...logs) {
        fatal('[', this.widgetName, this.widgetId, ']', ...logs);
    }
}
