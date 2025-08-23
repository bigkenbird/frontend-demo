import { clearAllClickAction, devWarning, getLocale, isBlank, setServerTime, uuid } from '@twix/ix-lib-base';
import { useConfig, useEventBusService, useNavigationService, useSharedDataService, useStatusService, useStorageService, useViewService } from '../use/use-injector';
import { useGlobalVueI18n } from '../use/use-vue-i18n';
import { doGetBinaryObjectURL } from './http-client/do-get-binary-object-url';
import { doPostBinaryObjectURL } from './http-client/do-post-binary-object-url';
import { BaseService } from './base-service';
import { doPostJSON } from './http-client/do-post-json';
export class InvokeService extends BaseService {
    serviceName = 'InvokeService';
    syncLock = false;
    clientStartTime = new Date().getTime().toString();
    ignoreCheckDupRequest = ['handshake'];
    get navigation() {
        return useNavigationService();
    }
    get status() {
        return useStatusService();
    }
    get config() {
        return useConfig();
    }
    get sharedData() {
        return useSharedDataService();
    }
    get storage() {
        return useStorageService();
    }
    get view() {
        return useViewService();
    }
    get eventBus() {
        return useEventBusService();
    }
    getSendAndReceivePromise(rq, resource, timeoutMills, initDupToken, ignoreDupToken) {
        return doPostJSON(resource, rq).then((res) => {
            if (res[0] != null) {
                return Promise.reject(res[0]);
            }
            else {
                return Promise.resolve(res[1]);
            }
        });
    }
    handleResponseIsNotJSON(responseText, failure) {
        const result = /<strong><font(.*)>(.*)<\/font><\/strong>/.exec(responseText);
        if (result != null && result.length > 2) {
            const status = this.status.getClientStatus(this.status.clientCode.APP1005);
            status.errorDesc += `(${result[2]})`;
            failure(status);
        }
        else {
            failure(this.status.getClientStatus(this.status.clientCode.APP1007));
        }
    }
    handleResponseSysData(responseHeaders, responseJSON) {
        const XAuthToken = responseHeaders['x-auth-token'];
        if (this.sharedData.getXAuthToken() != XAuthToken && !isBlank(XAuthToken)) {
            this.sharedData.setXAuthToken(XAuthToken);
        }
        const serverTime = responseJSON.serverTime;
        if (serverTime != null && serverTime > 0) {
            setServerTime(serverTime);
        }
        if (!isBlank(responseJSON.submitToken)) {
            this.sharedData.setCheckDupTxnToken(responseJSON.submitToken);
        }
    }
    doSendAndReceiveAction(rq, resource, timeoutMills, success, failure, initDupToken, ignoreDupToken) {
        return this.getSendAndReceivePromise(rq, resource, timeoutMills, initDupToken, ignoreDupToken)
            .then((response) => {
            this.debug('TrackingIxd:', rq.trackingIxd, 'resource:', resource, 'response:', response);
            const responseJSON = response.responseJSON;
            if (responseJSON == null || responseJSON === '') {
                if (response.status !== 200) {
                    failure(this.status.responseErrorToStatus(response));
                }
                else {
                    this.handleResponseIsNotJSON(response.responseText, failure);
                }
                return;
            }
            this.handleResponseSysData(response.responseHeaders, responseJSON);
            if (this.status.isSuccess(responseJSON)) {
                this.info('TrackingIxd:', rq.trackingIxd, 'resource:', resource, 'response success:', responseJSON.body);
                success(responseJSON.body);
            }
            else {
                this.error('TrackingIxd:', rq.trackingIxd, 'resource:', resource, 'responseJSON error:', responseJSON);
                failure(this.status.responseJSONToStatus(responseJSON));
            }
        })
            .catch((error) => {
            this.error('TrackingIxd:', rq.trackingIxd, 'resource:', resource, 'response error:', error);
            if (error.sys != null && error.code != null) {
                failure(this.status.responseJSONToStatus(error));
            }
            else {
                failure(this.status.responseErrorToStatus(error));
            }
        });
    }
    doSendAndReceive(resource, rqData, success, failure, timeoutMills, async = false) {
        if (timeoutMills == null)
            timeoutMills = this.config.requestTimeoutMs;
        if (isBlank(resource)) {
            devWarning('未設定請求資源目標');
        }
        const rq = this.prepareRq(rqData, resource);
        if (!async) {
            if (this.checkClientDupRequest(rq)) {
            }
        }
        this.debug('TrackingIxd:', rq.trackingIxd, 'resource:', resource, 'rqData:', rq, 'timeoutMills:', timeoutMills);
        const result = this.confirmDuplicateToken(resource, async);
        const initDupToken = result[0];
        const ignoreDupToken = result[1];
        const isSync = initDupToken || !ignoreDupToken;
        if (isSync) {
            const { t } = useGlobalVueI18n();
            if (this.syncLock) {
                this.view.showGlobalErrorPopup(t('alert.desc.duptxn.error'), null, t('alert.title.warn'));
                this.error('偵測重覆發送同步請求, resource:', resource);
                return;
            }
            this.syncLock = true;
        }
        success = this.wrapSuccess(success, isSync);
        failure = this.wrapFailure(failure, isSync, resource);
        this.doSendAndReceiveAction(rq, resource, timeoutMills, success, failure, initDupToken, ignoreDupToken).then(()=>localStorage.setItem('lastRecievedTime', Date.now()));
    }
    confirmDuplicateToken(resource, async) {
        let initDupToken = false;
        let ignoreDupToken = false;
        if (resource === 'handshake') {
            initDupToken = true;
        }
        else if (this.sharedData.getCheckDupTxnToken() === 'impInit') {
            initDupToken = true;
        }
        else if (this.sharedData.getCheckDupTxnToken() === 'impAsync') {
            ignoreDupToken = true;
        }
        else if (async) {
            ignoreDupToken = true;
        }
        if (resource.indexOf('/tx') > -1) {
            ignoreDupToken = false;
        }
        else if (resource.indexOf('general/ag002/04') > -1) {
            ignoreDupToken = false;
        }
        else {
            ignoreDupToken = true;
        }
        return [initDupToken, ignoreDupToken];
    }
    wrapSuccess(success, checkSyncLock) {
        return (rsData) => {
            if (checkSyncLock)
                this.syncLock = false;
            if (success)
                success(rsData);
        };
    }
    wrapFailure(failure, checkSyncLock, resource) {
        return (status) => {
            if (checkSyncLock)
                this.syncLock = false;
            if (this.isHandleResponseSystemStatus(resource, status)) {
                this.handleResponseSystemStatus(status, failure);
            }
            else {
                failure(status);
            }
        };
    }
    isHandleResponseSystemStatus(resource, status) {
        return !(resource === this.config.pingpongResource || resource === 'handshake');
    }
    sendAndReceive(resource, rqData, success, failure, timeoutMills) {
        this.doSendAndReceive(resource, rqData, success, failure, timeoutMills, false);
    }
    sendAndReceiveAsync(resource, rqData, success, failure, timeoutMills) {
        this.doSendAndReceive(resource, rqData, success, failure, timeoutMills, true);
    }
    pingpongBackendService() {
        this.sendAndReceiveAsync(this.config.pingpongResource, {}, () => {
        }, () => {
        });
    }
    getPDF(resource, success, failure, timeoutMills = 30000, noCache = false) {
        doGetBinaryObjectURL(resource, {}, success, failure, timeoutMills, noCache);
    }
    postPDF(resource, rqData, success, failure, timeoutMills = 30000) {
        const headers = {
            'x-auth-token': this.sharedData.getXAuthToken(),
            'X-Channel-Id': this.config.XChannelId,
            'X-Requested-With': 'IMPAsync',
            'Content-Type': 'application/json'
        };
        const rq = this.prepareRq(rqData, resource);
        doPostBinaryObjectURL(`/api${resource}`, rq, success, failure, timeoutMills, null, headers);
    }
    prepareRq(rqData, resource) {
        if (rqData == null)
            rqData = {};
        return {
            trackingId: uuid(),
            clientTime: new Date().getTime(),
            submitToken: this.sharedData.getCheckDupTxnToken(),
            locale: getLocale(),
            clientSysId: this.config.clientSysCode,
            rqData: rqData
        };
    }
    handleResponseSystemStatus(status, failure) {
        const { t } = useGlobalVueI18n();
        if (this.status.isFieldError(status)) {
            const errorField = status.errorFields;
            const form = this.sharedData.getPageComponent().form;
            if (form != null) {
                form.clearErrors();
                Object.keys(errorField).forEach((key) => {
                    form.setError(key, errorField[key]);
                });
                if (form.hasErrors()) {
                    form.scrollToFirstError();
                }
            }
            this.view.hideLoading();
        }
        else if (this.status.isSessionTimeout(status) || this.status.isNoLoginUser(status)) {
            this.view.closeAllModal(() => {
                this.view.hideLoading();
                this.view.showAlert(t('alert.title.error'), () => {
                    this.eventBus.emitReloadApp();
                }, status.errorDesc);
            });
        }
        else if (this.status.isDupTxn(status) || this.status.isGatewayTimeout(status)) {
            this.sharedData.setCheckDupTxnToken('impInit');
            this.navigation.nextErrorPage(status);
        }
        else if (this.status.isWAFBlock(status) ||
            this.status.isDAPBlock(status) ||
            this.status.isNoJsonFormat(status)) {
            this.sharedData.setCheckDupTxnToken('impInit');
            this.navigation.nextErrorPage(status);
        }
        else {
            failure(status);
            return;
        }
        clearAllClickAction();
        if (this.sharedData.getPageActivatePromise() != null)
            this.sharedData.getPageActivatePromise()(false);
    }
    checkClientDupRequest(rq) {
        if (this.ignoreCheckDupRequest.indexOf(rq.resource) > -1)
            return false;
        const rqDataForCheck = JSON.stringify({
            t: rq.txnIxd,
            r: rq.resource,
            d: rq.rqData
        });
        const rqDataForCheckList = this.sharedData.getRqDataForCheckList();
        if (rqDataForCheckList != null) {
            const len = rqDataForCheckList.length;
            for (let i = 0; i < len; i++) {
                if (rqDataForCheckList[i] === rqDataForCheck) {
                    devWarning('可能重覆發送交易', '內容:', rqDataForCheck);
                    return true;
                }
            }
        }
        rqDataForCheckList.push(rqDataForCheck);
        return false;
    }
    getClientStartTime() {
        return this.clientStartTime;
    }
}
