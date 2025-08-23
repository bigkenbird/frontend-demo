import { LoggerLevel } from './fn/logger/logger.fn';
/**
 * 設定 baseConfig
 */
export let baseConfig = {
    loggerLevel: LoggerLevel.ERROR,
    clientLogger: false,
    serverLogger: false,
    dummyResponseJSON: false,
    replaceNativeAppValue: undefined,
    dummyUrlRoot: '',
    devMode: false,
    contextRoot: '/',
    MFApp: false
};
/**
 * 更新baseConfig
 */
export function updateBaseConfig(config) {
    baseConfig = config;
}
