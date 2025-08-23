import { defaultString, getDefaultScrollingElement, isBlank, nextSeqNoStr, setLoggerTraceId, useDataHelper } from '@twix/ix-lib-base';
import { BaseService } from './base-service';
export class SharedDataService extends BaseService {
    serviceName = 'SharedDataService';
    global = useDataHelper();
    session = useDataHelper();
    txn = useDataHelper();
    page = useDataHelper();
    clearGlobalData() {
        this.global.clearData();
    }
    clearSessionData() {
        this.session.clearData();
    }
    clearTxnData() {
        this.txn.clearData();
    }
    clearPageData() {
        this.page.clearData();
    }
    clearAll() {
        this.global = useDataHelper();
        this.session = useDataHelper();
        this.txn = useDataHelper();
        this.page = useDataHelper();
    }
    startUrl = nextSeqNoStr();
    getStartUrl() {
        return defaultString(this.global.getData(this.startUrl));
    }
    setStartUrl(url) {
        this.global.setData(this.startUrl, url);
    }
    urlRoot = nextSeqNoStr();
    getUrlRoot() {
        return this.global.getData(this.urlRoot);
    }
    setUrlRoot(urlRoot) {
        this.global.setData(this.urlRoot, urlRoot);
    }
    XAuthToken = nextSeqNoStr();
    XAuthTokenTime = nextSeqNoStr();
    getXAuthToken() {
        return this.global.getData(this.XAuthToken);
    }
    getXAuthTokenTime() {
        return this.global.getData(this.XAuthTokenTime);
    }
    setXAuthToken(token) {
        if (isBlank(token))
            return false;
        this.global.setData(this.XAuthToken, token);
        setLoggerTraceId(token);
        this.global.setData(this.XAuthTokenTime, new Date().getTime());
        return true;
    }
    clearXAuthToken() {
        this.global.setData(this.XAuthToken, null);
        this.global.setData(this.XAuthTokenTime, null);
    }
    login = nextSeqNoStr();
    isLogin() {
        return this.session.getData(this.login) || false;
    }
    setLogin(login) {
        this.session.setData(this.login, login);
    }
    checkDupTxnToken = nextSeqNoStr();
    getCheckDupTxnToken() {
        return defaultString(this.global.getData(this.checkDupTxnToken));
    }
    setCheckDupTxnToken(token) {
        this.global.setData(this.checkDupTxnToken, token);
    }
    pageRootElement = nextSeqNoStr();
    getPageRootElement() {
        return this.global.getData(this.pageRootElement);
    }
    setPageRootElement(element) {
        this.global.setData(this.pageRootElement, element);
    }
    scrollingElement = nextSeqNoStr();
    getScrollingElement() {
        const element = this.global.getData(this.scrollingElement);
        if (element)
            return element;
        return getDefaultScrollingElement();
    }
    setScrollingElement(element) {
        this.global.setData(this.scrollingElement, element);
    }
    pageComponent = nextSeqNoStr();
    getPageComponent() {
        return this.global.getData(this.pageComponent);
    }
    setPageComponent(page) {
        this.global.setData(this.pageComponent, page);
    }
    txnUUID = nextSeqNoStr();
    getTxnUUID() {
        return this.txn.getData(this.txnUUID);
    }
    setTxnUUID(val) {
        this.txn.setData(this.txnUUID, val);
    }
    rqDataForCheckList = nextSeqNoStr();
    getRqDataForCheckList() {
        let list = this.page.getData(this.rqDataForCheckList);
        if (list == null) {
            list = [];
            this.page.setData(this.rqDataForCheckList, list);
        }
        return list;
    }
    txnTaskList = nextSeqNoStr();
    getTxnTask(key) {
        const taskList = this.session.getData(this.txnTaskList);
        if (taskList != null)
            return taskList[key];
        return null;
    }
    setTxnTaskList(list) {
        this.session.setData(this.txnTaskList, list);
    }
    clearTxnTaskList() {
        this.session.setData(this.txnTaskList, null);
    }
    WCMBaseUrl = nextSeqNoStr();
    getWCMBaseUrl() {
        return defaultString(this.global.getData(this.WCMBaseUrl));
    }
    setWCMBaseUrl(url) {
        this.global.setData(this.WCMBaseUrl, url);
    }
    routeConfig = nextSeqNoStr();
    getRouteConfig() {
        return this.session.getData(this.routeConfig);
    }
    setRouteConfig(config) {
        this.session.setData(this.routeConfig, config);
    }
    getTxnData(pk) {
        return this.txn.getData(pk);
    }
    setTxnData(pk, data) {
        this.txn.setData(pk, data);
    }
    triggerLoginNavigateData = nextSeqNoStr();
    getTriggerLoginNavigateData() {
        return this.global.getData(this.triggerLoginNavigateData);
    }
    setTriggerLoginNavigateData(data) {
        this.global.setData(this.triggerLoginNavigateData, data);
    }
    pageActivateDone = nextSeqNoStr();
    isPageActivateDone() {
        return !!this.page.getData(this.pageActivateDone);
    }
    setPageActivateDone(done) {
        this.page.setData(this.pageActivateDone, done);
    }
    pageActivatePromise = nextSeqNoStr();
    getPageActivatePromise() {
        return this.page.getData(this.pageActivatePromise);
    }
    setPageActivatePromise(promise) {
        this.page.setData(this.pageActivatePromise, promise);
    }
    previousRouteUrl = nextSeqNoStr();
    getPreviousRouteUrl() {
        return this.page.getData(this.previousRouteUrl);
    }
    setPreviousRouteUrl(url) {
        this.page.setData(this.previousRouteUrl, url);
    }
    currentPagePK = nextSeqNoStr();
    getCurrentPagePK() {
        return this.page.getData(this.currentPagePK);
    }
    setCurrentPagePK(pk) {
        this.page.setData(this.currentPagePK, pk);
    }
    previousReuseData = nextSeqNoStr();
    getPreviousReuseData() {
        return this.txn.getData(this.previousReuseData);
    }
    setPreviousReuseData(data) {
        this.txn.setData(this.previousReuseData, data);
    }
    windowFocusAction = nextSeqNoStr();
    getWindowFocusAction() {
        return this.global.getData(this.windowFocusAction);
    }
    setWindowFocusAction(action) {
        this.global.setData(this.windowFocusAction, action);
    }
    txnWidgetUrls = nextSeqNoStr();
    getTxnWidgetUrls() {
        let urls = this.txn.getData(this.txnWidgetUrls);
        if (urls == null) {
            urls = [];
            this.setTxnWidgetUrls(urls);
        }
        return urls;
    }
    setTxnWidgetUrls(urls) {
        this.txn.setData(this.txnWidgetUrls, urls);
    }
    modalShowing = nextSeqNoStr();
    getModalShowing() {
        let modalShowing = this.global.getData(this.modalShowing);
        if (modalShowing == null) {
            modalShowing = [];
            this.global.setData(this.modalShowing, modalShowing);
        }
        return modalShowing;
    }
    hasModalShowing() {
        return this.getModalShowing().length > 0;
    }
    hasModalShowingWhenPageChanged() {
        for (const modal of this.getModalShowing()) {
            if (!modal.canAutoHideWhenPageWillChange())
                return true;
        }
        return false;
    }
    appInBackground = nextSeqNoStr();
    isAppInBackground() {
        return !!this.global.getData(this.appInBackground);
    }
    setAppInBackground(background) {
        this.global.setData(this.appInBackground, background);
    }
}
