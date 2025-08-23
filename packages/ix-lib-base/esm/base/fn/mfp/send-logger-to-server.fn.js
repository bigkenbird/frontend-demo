import { baseConfig } from '../../base-config';
import { isNativeApp } from '../env-info.fn';
/**
 * 發送本機已記錄log到Server
 */
export function sendLoggerToServer() {
    // 設定有開啟serverLogger & 不是使用mock json
    if (baseConfig.serverLogger && !baseConfig.dummyResponseJSON) {
        if (isNativeApp()) {
            WL.Logger.send();
        }
        else if (typeof ibmmfpfanalytics !== 'undefined') {
            ibmmfpfanalytics.send();
        }
    }
}
