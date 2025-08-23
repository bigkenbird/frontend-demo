import { getScrollTop, isBlank, parseUrl, reloadApp, scrollAnimate, simpleAwait } from '@twix/ix-lib-base';
import { useAuthService, useConfig, useEventBusService, useEventService, useInvokeService, useNavigationService, useRouteService, useSharedDataService, useStatusService, useStorageService, useViewService } from '../use/use-injector';
import { BaseService } from './base-service';
import { getNodeEnv } from '../fn/vue-environment-mode';
export class AppBaseService extends BaseService {
    serviceName = 'TxnService';
    get route() {
        return useRouteService();
    }
    get navigation() {
        return useNavigationService();
    }
    get config() {
        return useConfig();
    }
    get invoke() {
        return useInvokeService();
    }
    get view() {
        return useViewService();
    }
    get sharedData() {
        return useSharedDataService();
    }
    get storage() {
        return useStorageService();
    }
    get event() {
        return useEventService();
    }
    get status() {
        return useStatusService();
    }
    get eventBus() {
        return useEventBusService();
    }
    get auth() {
        return useAuthService();
    }
    changeTxn(taskNo, rqData) {
        this.navigation.changeTxn(taskNo, rqData);
    }
    changeTxnAndNoTxnStack(taskNo, rqData) {
        this.navigation.changeTxnAndNoTxnStack(taskNo, rqData);
    }
    nextPage(routeUrl, data, ignorePageHistory) {
        this.navigation.nextPage(routeUrl, data, ignorePageHistory);
    }
    nextErrorPage(status, ignorePageHistory = false) {
        this.navigation.nextErrorPage(status, ignorePageHistory);
    }
    previousPage(previous = 1, data = {}, reload = false) {
        this.navigation.previousPage(previous, data, reload);
    }
    previousFirstPage(data, reload) {
        this.navigation.previousFirstPage(data, reload);
    }
    hasBackHistory() {
        return this.navigation.hasBackHistory();
    }
    changeHomeTxn(pageData) {
        this.navigation.changeHomeTxn(pageData);
    }
    previousHomeTxn() {
        this.navigation.previousHomeTxn();
    }
    sendAndReceive(resource, rqData, success, failure, timeoutMills) {
        // TODO: 評估是否有更好的方式判斷運行的環境為何，以及URL是偶該換成讀外部設定。
        if (getNodeEnv() == 'sit') {
            resource = resource.replace("b2e/", "sit/b2e/");
            resource = resource.replace("b2e-mkt/", "sit/b2e-mkt/");
        } else if (getNodeEnv() == 'uat') {
            resource = resource.replace("b2e/", "uat/b2e/");
            resource = resource.replace("b2e-mkt/", "uat/b2e-mkt/");
        }
        this.invoke.sendAndReceive(resource, rqData, success, failure, timeoutMills);
    }
    sendAndReceiveAsync(resource, rqData, success, failure, timeoutMills) {
        // TODO: 評估是否有更好的方式判斷運行的環境為何，以及URL是偶該換成讀外部設定。
        if (getNodeEnv() == 'sit') {
            resource = resource.replace("b2e/", "sit/b2e/");
            resource = resource.replace("b2e-mkt/", "sit/b2e-mkt/");
        } else if (getNodeEnv() == 'uat') {
            resource = resource.replace("b2e/", "uat/b2e/");
            resource = resource.replace("b2e-mkt/", "uat/b2e-mkt/");
        }
        this.invoke.sendAndReceiveAsync(resource, rqData, success, failure, timeoutMills);
    }
    sendAndReceivePromise(resource, rqData, timeoutMills) {
        return simpleAwait(new Promise((resolve, reject) => {
            this.sendAndReceive(resource, rqData, (rsData) => {
                resolve(rsData);
            }, (status) => {
                reject(status);
            }, timeoutMills);
        }));
    }
    sendAndReceivePromiseAsync(resource, rqData, timeoutMills) {
        return simpleAwait(new Promise((resolve, reject) => {
            this.sendAndReceiveAsync(resource, rqData, (rsData) => {
                resolve(rsData);
            }, (status) => {
                reject(status);
            }, timeoutMills);
        }));
    }
    doPostPDF(resource, rqData, success, failure, timeoutMills) {
        this.view.showLoading();
        this.invoke.postPDF(resource, rqData, (objectURL, fileName, dispose) => {
            const sub = window.open(objectURL, '_blank');
            if (sub == null || sub.closed || typeof sub.closed === 'undefined') {
                failure(true);
            }
            else {
                success();
            }
            dispose();
            this.view.hideLoading();
        }, (status) => {
            this.error('doPostPDF() fail, status:', status);
            failure(false, status);
            this.view.hideLoading();
        }, timeoutMills);
    }
    doPostPDFAndName(resource) {
        this.view.showLoading();
        this.invoke.postPDF(resource, {}, (objectURL, fileName, dispose) => {
            const a = document.createElement('a');
            a.setAttribute('target', '_system');
            a.setAttribute('href', objectURL);
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            dispose();
            this.view.hideLoading();
        }, (status) => {
            this.error('doPostPDFAndResponseFileName() fail, status:', status);
            this.view.hideLoading();
        });
    }
    pingpongBackendService() {
        this.invoke.pingpongBackendService();
    }
    openExtUrlLog(url, title) {
        if (this.isDebug())
            this.debug('openExtUrlLog() url:', url);
    }
    parseURLScheme(url) {
        const data = parseUrl(url);
        let taskNo = data[1].task_id;
        delete data[1].task_id;
        if (isBlank(taskNo) || taskNo.split('_').length !== 3) {
            taskNo = null;
        }
        return [taskNo, data[1]];
    }
    parseTaskNoParams(url) {
        const data = parseUrl(url);
        if (isBlank(data[0]) || data[0].split('_').length !== 3) {
            data[0] = null;
        }
        return data;
    }
    getRoutePath() {
        return this.route.getRoutePath();
    }
    getPreviousPageRouteUrl() {
        if (this.navigation.getHistory().getTrackLength() > 1) {
            return this.navigation.getHistory().getPreviousTrack(1).routePath;
        }
        return '';
    }
    getTaskNo() {
        return this.navigation.getHistory().getTaskNo();
    }
    getTaskName(taskNo) {
        if (taskNo == null)
            taskNo = this.getTaskNo();
        const task = this.sharedData.getTxnTask(taskNo);
        if (task != null) {
            return task.name;
        }
        return taskNo;
    }
    getTxnPk() {
        return this.navigation.getHistory().getTxnPK();
    }
    isTxnHeadPage() {
        return this.navigation.getHistory().isHeadTrack();
    }
    getCurrentHistoryTrack() {
        return this.navigation.getCurrentHistoryTrack();
    }
    getPagePk() {
        return this.getCurrentHistoryTrack().pk;
    }
    reloadApp() {
        this.storage.setReloadApp('Y');
        return reloadApp();
    }
    scrollAnimate(to, animate = true, duration, scrollingElement) {
        if (scrollingElement == null)
            scrollingElement = this.sharedData.getScrollingElement();
        return scrollAnimate(to, animate, duration, scrollingElement);
    }
    getScrollTop(scrollingElement) {
        if (scrollingElement == null)
            scrollingElement = this.sharedData.getScrollingElement();
        return getScrollTop(scrollingElement);
    }
    registerEventBusEvents() {
        this.eventBus.onLogout((warning) => {
            this.doLogout(warning);
        });
        this.eventBus.onReloadApp(() => {
            return this.reloadApp();
        });
        this.eventBus.onBindClickClicked((e) => {
        });
        this.eventBus.onBindClickSendLog((e) => {
            this.bindClickSendLog(e);
        });
    }
    bindClickSendLog(e) {
    }
    doLogout(warning = false) {
        this.auth.doLogout().then((status) => {
            if (status) {
                this.nextErrorPage(status);
            }
            else {
                this.reloadApp();
            }
        });
    }
}
