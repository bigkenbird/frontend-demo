import { ILogger } from '../use/use-logger';
export declare abstract class BaseService {
    protected abstract serviceName: string;
    get logger(): ILogger;
    isDebug(): boolean;
    isInfo(): boolean;
    isWarning(): boolean;
    isError(): boolean;
    isFatal(): boolean;
    debug(...logs: any[]): void;
    info(...logs: any[]): void;
    warning(...logs: any[]): void;
    error(...logs: any[]): void;
    fatal(...logs: any[]): void;
}
