import { baseConfig } from '@twix/ix-lib-base';
export const vueConfig = {
    ...baseConfig,
    hideRealGlobalError: true,
    txnLogoutMs: 600000,
    txnLogoutWarnMs: 60000,
    requestTimeoutMs: 75000,
    idleReloadMs: 1500000,
    refreshPageRoutePath: '',
    homeRoutePath: '',
    loginRoutePath: '',
    loginHomeRoutePath: '',
    logoutRoutePath: '',
    errorRoutePath: '',
    logoutResource: '',
    pingpongResource: '',
    XChannelId: '',
    XAuthTokenTimeoutMs: 1800000,
    whiteListWhenOpenUrl: [],
    clientSysCode: '',
    releaseVersion: '',
    ngSkipLocationChangeValue: false,
    ngReplaceUrl: true
};
