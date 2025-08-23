import { useLoggerService } from '../use/use-injector';
export class BaseService {
    get logger() {
        return useLoggerService().addLoggerPrefix(this.serviceName);
    }
    isDebug() {
        return this.logger.isDebug();
    }
    isInfo() {
        return this.logger.isInfo();
    }
    isWarning() {
        return this.logger.isWarning();
    }
    isError() {
        return this.logger.isError();
    }
    isFatal() {
        return this.logger.isFatal();
    }
    debug(...logs) {
        this.logger.debug(...logs);
    }
    info(...logs) {
        this.logger.info(...logs);
    }
    warning(...logs) {
        this.logger.warning(...logs);
    }
    error(...logs) {
        this.logger.error(...logs);
    }
    fatal(...logs) {
        this.logger.fatal(...logs);
    }
}
