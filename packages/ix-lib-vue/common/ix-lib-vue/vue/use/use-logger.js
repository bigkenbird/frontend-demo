import { debug, error, fatal, info, isBlank, isDebug, isError, isFatal, isInfo, isWarning, UNKNOWN, warning } from '@twix/ix-lib-base';
import { getComponentName } from '../fn/get-component-name';
export const useLogger = (prefix, stack = false) => {
    let prefixText = '';
    if (isBlank(prefix)) {
        prefixText = `[${getComponentName()}]`;
    }
    else {
        prefixText = stack ? prefix : `[${prefix}]`;
    }
    return {
        addLoggerPrefix(prefix) {
            return useLogger(prefixText + (isBlank(prefix) ? `[${UNKNOWN}]` : `[${prefix}]`), true);
        },
        isDebug() {
            return isDebug();
        },
        isInfo() {
            return isInfo();
        },
        isWarning() {
            return isWarning();
        },
        isError() {
            return isError();
        },
        isFatal() {
            return isFatal();
        },
        debug(...logs) {
            if (isDebug())
                prefixText ? debug(prefixText, ...logs) : debug(...logs);
        },
        info(...logs) {
            if (isInfo())
                prefixText ? info(prefixText, ...logs) : info(...logs);
        },
        warning(...logs) {
            if (isWarning())
                prefixText ? warning(prefixText, ...logs) : warning(...logs);
        },
        error(...logs) {
            if (isError())
                prefixText ? error(prefixText, ...logs) : error(...logs);
        },
        fatal(...logs) {
            if (isFatal())
                prefixText ? fatal(prefixText, ...logs) : fatal(...logs);
        }
    };
};
