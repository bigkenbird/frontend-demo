import { createTxnHistory, delay, devWarning, isBlank, uuid } from '@twix/ix-lib-base';
import { useConfig, useRouteService, useSharedDataService, useStatusService, useTimerService, useViewService } from '../use/use-injector';
import { useKeepAliveCache } from '../use/use-keep-alive';
import { BaseService } from './base-service';
export class NavigationService extends BaseService {
    serviceName = 'NavigationService';
    constructor() {
        super();
        this.newHistory('_begin');
        this.addHistoryTrack(null, {}, {}, true);
    }
    get config() {
        return useConfig();
    }
    get sharedData() {
        return useSharedDataService();
    }
    get route() {
        return useRouteService();
    }
    get status() {
        return useStatusService();
    }
    get timer() {
        return useTimerService();
    }
    _ignoreHistoryTrack = false;
    _isChangeTxn = false;
    history;
    previousHistory;
    previousRouteUrlTemp;
    navigateDataTemp;
    waitNavigateData;
    previousPromise;
    refreshPageData;
    waitToDestoryComponentPath;
    isIgnoreHistoryTrack() {
        return this._ignoreHistoryTrack;
    }
    getHistory() {
        return this.history;
    }
    isNext() {
        return this.getHistory().isNext();
    }
    newHistory(routeUrl) {
        const txnPK = uuid();
        const begin = routeUrl === '_begin';
        if (begin) {
            requestAnimationFrame(() => {
                this.sharedData.setTxnUUID(txnPK);
            });
        }
        else {
            this.sharedData.setTxnUUID(txnPK);
        }
        let taskNo = '';
        if (!begin)
            taskNo = this.route.routeUrlToTaskNo(routeUrl);
        this.previousHistory = history;
        this.history = createTxnHistory(txnPK, taskNo, 0);
    }
    addHistoryTrack(routePath, data, pageData, inited, pagePK) {
        if (pagePK == null) {
            pagePK = uuid();
        }
        this.getHistory().addTrack({
            pk: pagePK,
            routePath: routePath,
            data: data,
            rsData: pageData,
            inited: inited
        });
    }
    getCurrentHistoryTrack() {
        return this.getHistory().getPreviousTrack(0);
    }
    changeTxn(taskNo, rqData = {}) {
        this.waitNavigate(taskNo, rqData, false, null, true, this.getHistory().getTaskNo());
    }
    changeTxnAndNoTxnStack(taskNo, rqData = {}) {
        this.waitNavigate(taskNo, rqData, false, null, true);
    }
    nextPage(routeUrl, rqData = {}, ignorePageHistory = false) {
        this.waitNavigate(routeUrl, rqData, ignorePageHistory, null, false);
    }
    async waitNavigate(routeUrl, data, ignorePageHistory, previousTrack, isChangeTxn, ignoreTxnHistory) {
        const originalRouteUrl = routeUrl;
        const route = useRouteService();
        if (isChangeTxn) {
            if (isBlank(routeUrl) || routeUrl.indexOf('/') > -1)
                return;
            routeUrl = route.taskNoToRouteUrl(routeUrl);
        }
        const view = useViewService();
        view.showLoading();
        await delay(0);
        if (isChangeTxn) {
            if (this.getHistory().getTrackLength() === 0) {
                ignoreTxnHistory = null;
            }
            if (ignoreTxnHistory && ignoreTxnHistory === originalRouteUrl) {
                ignoreTxnHistory = null;
            }
            this._isChangeTxn = true;
        }
        else {
            this._isChangeTxn = false;
        }
        this.debug('waitNavigate() routeUrl:', originalRouteUrl, 'data:', data, 'ignorePageHistory:', ignorePageHistory, 'previousTrack:', previousTrack, 'isChangeTxn:', isChangeTxn, 'ignoreTxnHistory:', ignoreTxnHistory);
        routeUrl = this.addRoutePathPrefix(routeUrl);
        if (!this.sharedData.isLogin() && routeUrl !== this.config.loginRoutePath) {
            this.sharedData.setTriggerLoginNavigateData(null);
        }
        this.waitNavigateData = [originalRouteUrl, data, ignorePageHistory, previousTrack, isChangeTxn, ignoreTxnHistory];
        this.saveCurrentTxnStack = ignoreTxnHistory;
        const sameRouteUrl = route.getRoutePath() === routeUrl;
        if (sameRouteUrl) {
            if (isChangeTxn) {
                this.debug('waitNavigate() 相同交易');
            }
            else {
                this.debug('waitNavigate() 相同頁面');
            }
            this.refreshPageData = {
                routePath: originalRouteUrl,
                data: data,
                isChangeTxn: isChangeTxn
            };
            routeUrl = this.config.refreshPageRoutePath;
            ignorePageHistory = true;
            this.previousRouteUrlTemp = this.sharedData.getPreviousRouteUrl();
        }
        if (route.getRoutePath() == this.config.refreshPageRoutePath) {
            this.previousRouteUrlTemp = this.sharedData.getPreviousRouteUrl();
        }
        this.navigateDataTemp = {
            routePath: routeUrl,
            data: data,
            ignorePageHistory: ignorePageHistory,
            previousTrack: previousTrack,
            isChangeTxn: isChangeTxn,
            sameRoutePath: sameRouteUrl
        };
        this.getHistory().setNext(previousTrack == null);
        const name = this.getCurrentHistoryTrack()?.name;
        route.doNavigate(routeUrl, {}, undefined, undefined, 0, () => {
            this.nextErrorPage(this.status.getClientStatus(this.status.clientCode.APP1011));
        }, async () => {
            if (!this.isNext() && this.previousPromise) {
                await this.previousPromise();
            }
            if (sameRouteUrl) {
                useKeepAliveCache().removeCache(name);
            }
        });
    }
    nextPageByActivate(navigateData) {
        const routeUrl = navigateData.routePath;
        const history = this.getHistory();
        this.debug('nextPageByActivate() isChangeTxn:', navigateData.isChangeTxn);
        if (navigateData.isChangeTxn) {
            if (!navigateData.sameRoutePath) {
                if (this.previousRouteUrlTemp == null && history != null && history.getPreviousTrack(0) != null) {
                    this.previousRouteUrlTemp = history.getPreviousTrack(0).routePath;
                }
            }
            this.sharedData.clearTxnData();
            this.newHistory(routeUrl);
        }
        if (this.sharedData.isLogin()) {
            this.timer.resetLogoutTimer();
        }
        else {
            this.timer.cancelLogoutTimer();
        }
        this.timer.cancelTimerWhenPageChanged();
        this.debug('nextPageByActivate() 換頁前歷程數量:', this.getHistory().getTrackLength(), '歷程:', this.getHistory());
        const historyTrack = this.getCurrentHistoryTrack();
        if (this.previousRouteUrlTemp == null) {
            if (historyTrack != null) {
                this.previousRouteUrlTemp = historyTrack.routePath;
            }
        }
        this._ignoreHistoryTrack = navigateData.ignorePageHistory;
        if (this._ignoreHistoryTrack) {
            history.removeLastTrack();
        }
        const previousTrack = navigateData.previousTrack;
        if (previousTrack == null) {
            this.addHistoryTrack(routeUrl, navigateData.data, navigateData.data, true);
        }
        else {
            if (previousTrack.inited) {
                this.sharedData.setPreviousReuseData(navigateData.data);
            }
            else {
                this.addHistoryTrack(previousTrack.routePath, navigateData.data, navigateData.data, true);
            }
        }
    }
    nextErrorPage(status, ignorePageHistory = false) {
        if (status.meta.systemIxd == null) {
            status.meta.systemIxd = this.getHistory().getTaskNo();
        }
        if (this.getHistory() != null && this.getHistory().getTrack(0) != null) {
            status.txnRqData = this.getHistory().getTrack(0).data;
        }
        this.nextPage(this.config.errorRoutePath, status, ignorePageHistory);
    }
    isErrorPage() {
        return this.getCurrentHistoryTrack().routePath === this.config.errorRoutePath;
    }
    previousPage(previous = 1, data = {}, reload = false) {
        this.debug('previousPage() start', 'previous:', previous, 'data:', data, 'reload:', reload);
        if (previous < 1)
            return;
        if (this.getHistory().getTrackLength() - previous > 0) {
            const track = this.getHistory().getPreviousTrack(previous);
            if (data == null)
                data = {};
            if (reload == true)
                track.inited = false;
            let startIdxToDestroy = this.getHistory().getTrackLength() - previous;
            let startIdxToRemove = startIdxToDestroy;
            if (!track.inited) {
                startIdxToDestroy = startIdxToDestroy - 1;
                startIdxToRemove = startIdxToRemove - 1;
            }
            const len = this.getHistory().getTrackLength();
            this.previousPromise = async () => {
                this.debug('previousPromise() start', 'startIdxToDestroy:', startIdxToDestroy, 'startIdxToRemove:', startIdxToRemove, 'length:', len);
                for (let i = len - 1; i >= startIdxToDestroy; i--) {
                    await useKeepAliveCache().removeCache(this.getHistory().getTrack(i).name);
                }
                for (let i = len - 1; i >= startIdxToRemove; i--) {
                    this.getHistory().removeTrack(i);
                }
                this.previousPromise = null;
            };
            this.waitNavigate(track.routePath, data, false, track, false);
        }
        else {
            devWarning('返回傳入參數已超過歷程數量');
        }
    }
    previousFirstPage(data, reload) {
        const len = this.getHistory().getTrackLength();
        if (len > 1) {
            this.previousPage(len - 1, data, reload);
        }
    }
    changeHomeTxn(pageData = {}) {
        let taskNo;
        if (this.sharedData.isLogin()) {
            taskNo = this.route.routeUrlToTaskNo(this.config.loginHomeRoutePath);
        }
        else {
            taskNo = this.route.routeUrlToTaskNo(this.config.homeRoutePath);
        }
        this.changeTxn(taskNo, pageData);
    }
    previousHomeTxn() {
        if (this.getTxnStackLength() > 0) {
            const homeTaskNo = this.txnStack[0];
            this.clearTxnStack();
            this.changeTxnAndNoTxnStack(homeTaskNo);
        }
        else {
            this.changeHomeTxn();
        }
    }
    txnStack = null;
    saveCurrentTxnStack;
    addTxnStack() {
        if (this.txnStack == null) {
            this.txnStack = [];
            return;
        }
        if (!isBlank(this.saveCurrentTxnStack)) {
            this.txnStack.push(this.saveCurrentTxnStack);
            this.saveCurrentTxnStack = null;
        }
    }
    getTxnStackLength() {
        if (this.txnStack == null)
            return 0;
        return this.txnStack.length;
    }
    clearTxnStack() {
        this.txnStack = null;
    }
    previousTxn() {
        if (this.getTxnStackLength() > 0) {
            this.info('交易切換歷程:', this.txnStack);
            const currentTxn = this.getHistory().getTaskNo();
            const prevTxn = this.txnStack.pop();
            if (currentTxn === prevTxn) {
                this.previousTxn();
            }
            else {
                this.changeTxnAndNoTxnStack(prevTxn);
            }
        }
        else {
            this.changeHomeTxn();
        }
    }
    previousTxnOrPage(previous = 1, data = {}, reload = false) {
        if (this.getHistory().isHeadTrack()) {
            this.previousTxn();
        }
        else {
            this.previousPage(previous, data, reload);
        }
    }
    hasBackHistory() {
        if (!this.getHistory().isHeadTrack()) {
            return true;
        }
        return this.getTxnStackLength() > 0;
    }
    addRoutePathPrefix(routePath) {
        if (routePath.startsWith(this.config.contextRoot + '/'))
            return routePath;
        return this.config.contextRoot + routePath;
    }
    getNavigateDataTemp() {
        return this.navigateDataTemp;
    }
    clearNavigateDataTemp() {
        this.navigateDataTemp = null;
    }
    getWaitNavigateData() {
        return this.waitNavigateData;
    }
    getPreviousRouteUrlTemp() {
        return this.previousRouteUrlTemp;
    }
    clearPreviousRouteUrlTemp() {
        this.previousRouteUrlTemp = null;
    }
    setWaitToDestoryComponentPath(routePath) {
        this.waitToDestoryComponentPath = routePath;
    }
    refreshSamePage() {
        if (this.refreshPageData) {
            this.waitNavigate(this.refreshPageData.routePath, this.refreshPageData.data, true, null, this.refreshPageData.isChangeTxn);
        }
    }
    getPreviousPromise() {
        return this.previousPromise;
    }
}
