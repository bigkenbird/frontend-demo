import { baseConfig } from '../../base-config';
/**
 * 開啟 mfp Server Logger
 */
export function enableServerLogger(isNativeApp) {
    if (baseConfig.serverLogger) {
        if (isNativeApp && typeof WL !== 'undefined') {
            WL.Logger.config({
                level: 'FATAL',
                capture: true,
                autoSendLogs: true,
                pretty: true
            });
        }
        else if (typeof ibmmfpfanalytics !== 'undefined') {
            ibmmfpfanalytics.logger.config({
                enabled: true,
                level: 'FATAL',
                capture: true,
                autoSendLogs: true,
                pretty: true,
                analyticsCapture: false
            });
        }
    }
}
