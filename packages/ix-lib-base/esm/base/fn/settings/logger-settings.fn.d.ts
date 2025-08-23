import { LoggerLevel } from '../logger/logger.fn';
/**
 * 取得 logger Level
 *
 * @returns
 */
export declare function getLoggerLevel(): LoggerLevel;
/**
 * 設定Logger Level
 *
 * @param lv
 */
export declare function setLoggerLevel(level: LoggerLevel): void;
/**
 * 是否 Logger 開關
 *
 * @returns
 */
export declare function isLoggerEnable(): boolean;
/**
 * 設定 Logger 開關
 *
 * @param enable
 */
export declare function setLoggerEnable(enable: boolean): void;
/**
 * 取得追蹤鍵值
 * @returns
 */
export declare function getLoggerTraceId(): string;
/**
 * 設定追蹤鍵值
 * @param id
 */
export declare function setLoggerTraceId(id: string): void;
