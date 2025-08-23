/**
 * Logger 基礎父類
 */
export declare abstract class BaseLogger {
    /**
     * log是否為Debug層級
     */
    protected isDebug(): boolean;
    /**
     * log是否為Info層級
     */
    protected isInfo(): boolean;
    /**
     * log是否為Warn層級
     */
    protected isWarning(): boolean;
    /**
     * log是否為Error層級
     */
    protected isError(): boolean;
    /**
     * log是否為Fatal層級
     */
    protected isFatal(): boolean;
    /**
     * log debug level
     */
    protected debug(...logs: readonly any[]): void;
    /**
     * log info level
     */
    protected info(...logs: readonly any[]): void;
    /**
     * log warning level
     */
    protected warning(...logs: readonly any[]): void;
    /**
     * log error level
     */
    protected error(...logs: readonly any[]): void;
    /**
     * log fatal level
     */
    protected fatal(...logs: readonly any[]): void;
}
