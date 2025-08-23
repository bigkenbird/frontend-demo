/**
 * logger等級enum
 */
export var MfpLoggerLevel;
(function (MfpLoggerLevel) {
    MfpLoggerLevel[MfpLoggerLevel["TRACE"] = 0] = "TRACE";
    MfpLoggerLevel[MfpLoggerLevel["DEBUG"] = 1] = "DEBUG";
    MfpLoggerLevel[MfpLoggerLevel["LOG"] = 2] = "LOG";
    MfpLoggerLevel[MfpLoggerLevel["INFO"] = 3] = "INFO";
    MfpLoggerLevel[MfpLoggerLevel["WARN"] = 4] = "WARN";
    MfpLoggerLevel[MfpLoggerLevel["ERROR"] = 5] = "ERROR";
    MfpLoggerLevel[MfpLoggerLevel["FATAL"] = 6] = "FATAL";
})(MfpLoggerLevel || (MfpLoggerLevel = {}));
let _level = MfpLoggerLevel.ERROR;
export function getMfpLoggerLevel() {
    return _level;
}
export function setMfpLoggerLevel(level) {
    _level = MfpLoggerLevel[level];
}
