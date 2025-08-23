import { baseConfig } from '../../base-config';
import { setMfpLoggerLevel } from '../settings/mfp-settings.fn';
/**
 * 從Server更新logger設定
 *
 * @returns
 */
export function updateLoggerConfigFromServer(pkg, isNativeApp) {
    if (baseConfig.serverLogger) {
        if (isNativeApp) {
            return new Promise((resolve) => {
                WL.Logger.updateConfigFromServer().then((result) => {
                    if (result === 'OK') {
                        WL.Logger.status().then((status) => {
                            if (status.filters) {
                                Object.keys(status.filters).forEach((key) => {
                                    if (key === pkg) {
                                        setMfpLoggerLevel(status.filters[key]);
                                    }
                                });
                            }
                            resolve();
                        }, () => {
                            // do nothing
                            resolve();
                        });
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
        else if (typeof ibmmfpfanalytics !== 'undefined') {
            return ibmmfpfanalytics.logger
                .updateConfigFromServer()
                .then((configStr) => {
                if (configStr && configStr.indexOf('clientLogProfileConfig') > -1) {
                    const config = JSON.parse(configStr);
                    const profiles = config.clientLogProfileConfig.clientLogProfiles;
                    if (profiles && profiles.length > 0) {
                        profiles.forEach((data) => {
                            if (data.name === pkg) {
                                setMfpLoggerLevel(data.level);
                            }
                        });
                    }
                }
            })
                .catch(() => {
                // do nothing
            });
        }
    }
    return Promise.resolve();
}
