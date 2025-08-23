import { LoggerLevel } from './fn/logger/logger.fn';
/**
 * 設定 baseConfig
 */
export declare let baseConfig: IBaseConfig;
/**
 * BaseConfig Interface
 */
export interface IBaseConfig {
    /**
     * log預設等級，預設為ERROR
     */
    loggerLevel: LoggerLevel;
    /**
     * 是否開啟Client的log紀錄器
     */
    clientLogger: boolean;
    /**
     * 是否開啟Server的log紀錄器
     */
    serverLogger: boolean;
    /**
     * 使用模擬的回應JSON資料
     */
    dummyResponseJSON: boolean;
    /**
     * 使用dummy模擬可以自行設置的UrlRoot ex: '' or 'ex: http://localhost:8080'
     */
    dummyUrlRoot: string;
    /**
     * 強制取代isNativeApp()的回傳值
     */
    replaceNativeAppValue: boolean;
    /**
     * 開發模式
     */
    devMode: boolean;
    /**
     * 網站的ContextRoot
     */
    contextRoot: string;
    /**
     * 微前端應用程式
     */
    MFApp: boolean;
}
/**
 * 更新baseConfig
 */
export declare function updateBaseConfig(config: IBaseConfig): void;
