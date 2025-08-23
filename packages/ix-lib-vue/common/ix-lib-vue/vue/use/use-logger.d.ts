export interface ILogger {
    addLoggerPrefix: (prefix?: string) => ILogger;
    isDebug: () => boolean;
    isInfo: () => boolean;
    isWarning: () => boolean;
    isError: () => boolean;
    isFatal: () => boolean;
    debug(...logs: readonly unknown[]): void;
    info(...logs: readonly unknown[]): void;
    warning(...logs: readonly unknown[]): void;
    error(...logs: readonly unknown[]): void;
    fatal(...logs: readonly unknown[]): void;
}
export declare const useLogger: (prefix?: string, stack?: boolean) => ILogger;
