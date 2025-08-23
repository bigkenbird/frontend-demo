import { disableConsoleLog, isNull, Locale, LoggerLevel, setDevMode, setLocale, setLoggerEnable, setLoggerLevel, updateBaseConfig } from '@twix/ix-lib-base';
import { getConfigToken } from '../use/use-injector';
import { VueInjector } from '../vue-injector';
export function defineRuntimeSettings() {
    window.Null = undefined;
    window.isNull = isNull;
    const config = VueInjector.get(getConfigToken());
    updateBaseConfig(config);
    if (config.clientLogger) {
        setLoggerEnable(true);
        setLoggerLevel(config.loggerLevel);
    }
    else {
        setLoggerEnable(false);
        setLoggerLevel(LoggerLevel.FATAL);
        disableConsoleLog();
    }
    setDevMode(config.devMode);
    setLocale(Locale['zh-TW']);
}
