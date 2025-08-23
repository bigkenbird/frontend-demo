import { IBaseConfig } from '@twix/ix-lib-base';
export declare const vueConfig: IVueConfig;
export interface IVueConfig extends IBaseConfig {
    hideRealGlobalError: boolean;
    txnLogoutMs: number;
    txnLogoutWarnMs: number;
    requestTimeoutMs: number;
    idleReloadMs: number;
    refreshPageRoutePath: string;
    homeRoutePath: string;
    loginRoutePath: string;
    loginHomeRoutePath: string;
    logoutRoutePath: string;
    errorRoutePath: string;
    logoutResource: string;
    pingpongResource: string;
    XChannelId: string;
    XAuthTokenTimeoutMs: number;
    whiteListWhenOpenUrl: string[];
    clientSysCode: string;
    releaseVersion: string;
    ngSkipLocationChangeValue: boolean;
    ngReplaceUrl: boolean;
}
