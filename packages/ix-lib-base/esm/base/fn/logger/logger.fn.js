/**
 * logger等級enum
 */
export var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel[LoggerLevel["DEBUG"] = 0] = "DEBUG";
    LoggerLevel[LoggerLevel["INFO"] = 1] = "INFO";
    LoggerLevel[LoggerLevel["WARNING"] = 2] = "WARNING";
    LoggerLevel[LoggerLevel["ERROR"] = 3] = "ERROR";
    LoggerLevel[LoggerLevel["FATAL"] = 4] = "FATAL";
})(LoggerLevel || (LoggerLevel = {}));
/**
 * client console can use color, not ie
 *
 * 判斷window是因為執行jasmine時為非瀏覽器環境會undefined錯誤
 */
export const canUseColor = typeof window === 'undefined' ? false : !/MSIE|Trident/.test(window.navigator.userAgent);
/**
 * 關閉console log
 */
export function disableConsoleLog() {
    console.log = console.debug = console.info = console.warn = console.error = console.dir = console.dirxml = console.trace = () => {
        // do nothing
    };
}
