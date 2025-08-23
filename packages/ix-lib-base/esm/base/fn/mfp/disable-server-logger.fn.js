/**
 * 關閉 mfp Server Logger
 */
export function disableServerLogger(isNativeApp) {
    if (isNativeApp && typeof WL !== 'undefined') {
        WL.Logger.config({
            enable: false,
            capture: false,
            autoSendLogs: false
        });
    }
    else if (typeof ibmmfpfanalytics !== 'undefined') {
        ibmmfpfanalytics.logger.enable(false);
        ibmmfpfanalytics.logger.capture(false);
        ibmmfpfanalytics.enableAutoSend(false);
    }
}
