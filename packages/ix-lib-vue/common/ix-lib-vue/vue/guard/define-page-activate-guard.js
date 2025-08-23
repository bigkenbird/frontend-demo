import { clearCustomTimeout, devWarning, isBrowserBackButtonClick, setBrowserBackButtonClick, waitReady } from '@twix/ix-lib-base';
import { getEventServiceToken, useNavigationService, useRouteService, useSharedDataService } from '../use/use-injector';
import { useKeepAliveCache } from '../use/use-keep-alive';
import { useLogger } from '../use/use-logger';
import { VueInjector } from '../vue-injector';
export function definePageActivateGuard(activate) {
    const logger = useLogger('define-page-activate-guard');
    const { debug, isDebug } = logger;
    let lock = false;
    return (to, from) => {
        debug('activate guard', to, from);
        const navigation = useNavigationService();
        const sharedData = useSharedDataService();
        const route = useRouteService();
        let hasModalShowing = false;
        if (isBrowserBackButtonClick()) {
            setBrowserBackButtonClick(false);
            return false;
        }
        const navigateData = navigation.getNavigateDataTemp();
        navigation.clearNavigateDataTemp();
        if (navigateData == null) {
            devWarning('ActivateGuard NavigateData is null');
            return false;
        }
        if (lock) {
            devWarning('PageActivateGurad重覆觸發');
            return false;
        }
        const pageActivatePromise = () => {
            if (isDebug()) {
                if (navigation.isNext()) {
                    debug('is next page');
                }
                else {
                    if (navigateData.previousTrack == null) {
                        debug('previous page but previousTrack is null');
                    }
                    else if (navigateData.previousTrack.inited) {
                        debug('is previous page');
                    }
                    else {
                        debug('is previous not inited page');
                    }
                }
            }
            debug('PageActivateGuard() to:', to, 'from:', from);
            navigation.nextPageByActivate(navigateData);
            debug('after nextPageByActivate()');
            if (!navigation.isNext() && navigateData.previousTrack != null && navigateData.previousTrack.inited) {
                return true;
            }
            if (sharedData.isPageActivateDone()) {
                devWarning('activate()尚未完成，卻再次被觸發');
            }
            if (activate) {
                return new Promise((resolve) => {
                    debug('before activate()', 'pageData:', getInputData(navigation));
                    sharedData.setPageActivatePromise((result) => {
                        resolve(result);
                    });
                    sharedData.setPageActivateDone(true);
                    activate({
                        pass: () => {
                            resolve(true);
                        },
                        reject: () => {
                            resolve(false);
                        },
                        getData: () => {
                            return getInputData(navigation);
                        },
                        updateData: (data) => {
                            return updateOutputData(navigation, data);
                        },
                        logger
                    });
                }).then((result) => {
                    debug('after activate()', 'result:', result);
                    sharedData.setPageActivateDone(false);
                    pageDataCopy = null;
                    return new Promise((ready) => {
                        if (result) {
                            if (hasModalShowing) {
                                devWarning('換頁前需關閉彈出視窗');
                            }
                            let hasWarning = false;
                            waitReady(() => {
                                hasModalShowing = sharedData.hasModalShowingWhenPageChanged();
                                if (hasModalShowing) {
                                    if (!hasWarning) {
                                        hasWarning = true;
                                        devWarning('關閉modal才能換頁');
                                    }
                                    return false;
                                }
                                else {
                                    ready(true);
                                    return true;
                                }
                            }, -1, 1000);
                        }
                        else {
                            ready(false);
                        }
                    }).then((result) => {
                        debug('final result:', result);
                        if (result) {
                            clearCustomTimeout();
                            sharedData.clearPageData();
                            sharedData.setPreviousRouteUrl(navigation.getPreviousRouteUrlTemp());
                            navigation.clearPreviousRouteUrlTemp();
                            VueInjector.get(getEventServiceToken()).emitPageWillChangeSubject();
                        }
                        else {
                            if (navigation.isNext()) {
                                navigation.getHistory().removeLastTrack();
                            }
                            else {
                                if (navigateData.previousTrack != null && !navigateData.previousTrack.inited) {
                                    navigation.getHistory().removeLastTrack();
                                    navigation.setWaitToDestoryComponentPath(route.getRoutePath());
                                }
                            }
                        }
                        if (navigateData.isChangeTxn) {
                            navigation.addTxnStack();
                        }
                        debug('finish');
                        lock = false;
                        return handleKeepAlive(debug, from, navigateData, result);
                    });
                });
            }
            else {
                return true;
            }
        };
        return pageActivatePromise();
    };
}
let pageDataCopy;
function getInputData(navigation) {
    if (pageDataCopy != null) {
        return pageDataCopy;
    }
    let data = {};
    if (navigation.getCurrentHistoryTrack() != null) {
        data = navigation.getCurrentHistoryTrack().data;
    }
    pageDataCopy = Object.assign({}, data);
    return pageDataCopy;
}
function updateOutputData(navigation, data) {
    if (navigation.getCurrentHistoryTrack() != null) {
        navigation.getCurrentHistoryTrack().rsData = data;
    }
}
async function handleKeepAlive(debug, from, navigateData, result) {
    const { addCache, getCaches, removeAllCaches } = useKeepAliveCache();
    if (result) {
        const pageName = from.meta.name;
        if (navigateData.isChangeTxn) {
            await removeAllCaches();
        }
        else if (navigateData.previousTrack) {
            if (useNavigationService().getPreviousPromise()) {
                useNavigationService().getPreviousPromise()();
            }
        }
        else if (navigateData.ignorePageHistory) {
        }
        else {
            addCache(pageName);
        }
    }
    debug('handleKeepAlive() KeepAlive Caches:', getCaches(), 'Result:', result);
    return result;
}
