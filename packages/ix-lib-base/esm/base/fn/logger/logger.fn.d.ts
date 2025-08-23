/**
 * logger等級enum
 */
export declare enum LoggerLevel {
    DEBUG = 0,
    INFO = 1,
    WARNING = 2,
    ERROR = 3,
    FATAL = 4
}
/**
 * client console can use color, not ie
 *
 * 判斷window是因為執行jasmine時為非瀏覽器環境會undefined錯誤
 */
export declare const canUseColor: boolean;
/**
 * 關閉console log
 */
export declare function disableConsoleLog(): void;
