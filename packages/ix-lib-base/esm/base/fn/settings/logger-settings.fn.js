import { LoggerLevel } from '../logger/logger.fn';
/**
 * Logger Level
 */
let _level = LoggerLevel.ERROR;
/**
 * Logger Enable
 */
let _enable = false;
/**
 * 追蹤鍵值
 */
let _traceId = '';
/**
 * 取得 logger Level
 *
 * @returns
 */
export function getLoggerLevel() {
    return _level;
}
/**
 * 設定Logger Level
 *
 * @param lv
 */
export function setLoggerLevel(level) {
    _level = level;
}
/**
 * 是否 Logger 開關
 *
 * @returns
 */
export function isLoggerEnable() {
    return _enable;
}
/**
 * 設定 Logger 開關
 *
 * @param enable
 */
export function setLoggerEnable(enable) {
    _enable = enable;
}
/**
 * 取得追蹤鍵值
 * @returns
 */
export function getLoggerTraceId() {
    return _traceId;
}
/**
 * 設定追蹤鍵值
 * @param id
 */
export function setLoggerTraceId(id) {
    _traceId = id;
}
