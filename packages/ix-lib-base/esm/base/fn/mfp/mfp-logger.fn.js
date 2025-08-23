import { baseConfig } from '../../base-config';
import { getMfpLoggerLevel, MfpLoggerLevel } from '../settings/mfp-settings.fn';
import { disableServerLogger } from './disable-server-logger.fn';
import { enableServerLogger } from './enable-server-logger.fn';
import { updateLoggerConfigFromServer } from './update-logger-from-server.fn';
export let mfpLogger;
/**
 * 初始化 mfp logger
 *
 * @param pkg
 */
export async function initMfpLogger(pkg, isNativeApp) {
    // 設定有開啟serverLogger & 不是使用mock json
    if (baseConfig.serverLogger && !baseConfig.dummyResponseJSON) {
        enableServerLogger(isNativeApp);
        await updateLoggerConfigFromServer(pkg, isNativeApp);
        mfpLogger = WL.Logger.create({
            pkg: pkg,
            level: MfpLoggerLevel[getMfpLoggerLevel()]
        });
    }
    else {
        disableServerLogger(isNativeApp);
    }
}
