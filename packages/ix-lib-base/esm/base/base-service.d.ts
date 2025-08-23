import { BaseLogger } from './base-logger';
/**
 * Service基本父類別
 */
export declare abstract class BaseService extends BaseLogger {
    /**
     * Service名稱
     */
    protected abstract serviceName: string;
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
