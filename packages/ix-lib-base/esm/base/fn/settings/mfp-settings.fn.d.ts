/**
 * logger等級enum
 */
export declare enum MfpLoggerLevel {
    'TRACE' = 0,
    'DEBUG' = 1,
    'LOG' = 2,
    'INFO' = 3,
    'WARN' = 4,
    'ERROR' = 5,
    'FATAL' = 6
}
export declare function getMfpLoggerLevel(): MfpLoggerLevel;
export declare function setMfpLoggerLevel(level: 'TRACE' | 'DEBUG' | 'LOG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'): void;
