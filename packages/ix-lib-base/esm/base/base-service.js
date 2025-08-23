import { BaseLogger } from './base-logger';
import { debug } from './fn/logger/debug.fn';
import { error } from './fn/logger/error.fn';
import { fatal } from './fn/logger/fatal.fn';
import { info } from './fn/logger/info.fn';
import { warning } from './fn/logger/warning.fn';
/**
 * Service基本父類別
 */
export class BaseService extends BaseLogger {
    /**
     * log debug level
     */
    debug(...logs) {
        debug('<', this.serviceName, '>', ...logs);
    }
    /**
     * log info level
     */
    info(...logs) {
        info('<', this.serviceName, '>', ...logs);
    }
    /**
     * log warning level
     */
    warning(...logs) {
        warning('<', this.serviceName, '>', ...logs);
    }
    /**
     * log error level
     */
    error(...logs) {
        error('<', this.serviceName, '>', ...logs);
    }
    /**
     * log fatal level
     */
    fatal(...logs) {
        fatal('<', this.serviceName, '>', ...logs);
    }
}
