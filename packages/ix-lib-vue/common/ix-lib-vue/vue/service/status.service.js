import { devWarning, isBlank } from '@twix/ix-lib-base';
import { useGlobalVueI18n } from '../use/use-vue-i18n';
import { BaseService } from './base-service';
export class StatusService extends BaseService {
    serviceName = 'StatusService';
    STATUS_SYS_APP = 'APP';
    STATUS_SYS_SVC = 'SVC';
    STATUS_SYS_ADT = 'ADT';
    clientCode = {
        APP1001: '1001',
        APP1002: '1002',
        APP1003: '1003',
        APP1004: '1004',
        APP1005: '1005',
        APP1006: '1006',
        APP1007: '1007',
        APP1008: '1008',
        APP1009: '1009',
        APP1010: '1010',
        APP1011: '1011',
        APP1012: '1012',
        APP1013: '1013',
        APP9999: '9999'
    };
    SVCCode = {
        SVC0000: '0000',
        SVC1001: '0113',
        SVC9907: '9907',
        SVC9909: '9909',
        SVC9914: '9914',
        SVC9902: '9987',
        SVCSUCC: '' // 目前後端回傳的成功代碼是空字串，不是0000，先調整成空字串等日後確認後再修改
    };
    backendStatusData;
    setBackendStatusData(statusData) {
        this.backendStatusData = statusData;
    }
    isClientStatusCode(status, code) {
        return this.STATUS_SYS_APP === status.meta.returnSys && status.meta.status.errorCode === code;
    }
    isADTStatusCode(status, code) {
        return this.STATUS_SYS_ADT === status.meta.returnSys && status.meta.status.errorCode === code;
    }
    isSVCStatusCode(status, code) {
        // return this.STATUS_SYS_SVC === status.meta.returnSys && status.meta.status.errorCode === code;
        return status.meta.status.errorCode === code;
    }
    getClientStatus(code) {
        if (isBlank(code)) {
            devWarning('未指定的ClientStatusCode:', code);
            code = this.clientCode.APP9999;
        }
        else {
            let valid = false;
            for (const key in this.clientCode) {
                const value = this.clientCode[key];
                if (value === code)
                    valid = true;
            }
            if (!valid) {
                devWarning('未定義的ClientStatusCode:', code);
                code = this.clientCode.APP9999;
            }
        }
        return this.wrapStatus({
            meta: {
                returnSys: this.STATUS_SYS_APP,
                status: {
                    errorCode: code,
                    errorDesc: this.getClientDescI18NKey(code)
                }
            }
        });
    }
    responseJSONToStatus(responseJSON) {
        let status;
        if (responseJSON && !isBlank(responseJSON.meta.status.errorCode)) {
            status = {
                meta: {
                    returnSys: responseJSON.meta.returnSys,
                    status: {
                        systemIxd: responseJSON.meta.status.systemIxd,
                        errorCode: responseJSON.meta.status.errorCode,
                        errorDesc: responseJSON.meta.status.errorDesc
                    }
                }
            };
        }
        return status;
    }
    copyResponseJSONColumnToStatus(responseJSON, status) {
        if (this.isFieldError(status))
            status.meta.status.errorParamList = responseJSON.meta.status.errorParamList;
        if (!this.isSuccess(status))
            status.meta.status.severity = responseJSON.meta.status.severity;
    }
    responseErrorToStatus(error) {
        let status;
        if (error.status === 404) {
            status = this.getClientStatus(this.clientCode.APP1001);
        }
        else if (error.status === 500) {
            status = this.getClientStatus(this.clientCode.APP1002);
        }
        else if (error.status === 504) {
            status = this.getClientStatus(this.clientCode.APP1010);
        }
        else if (error.status === 0) {
            status = this.getClientStatus(this.clientCode.APP1004);
        }
        if (status == null) {
            status = this.getClientStatus(this.clientCode.APP1008);
        }
        if (this.isDebug()) {
            status.errorDesc = `${status.errorDesc}(${JSON.stringify(error)})`;
        }
        return status;
    }
    wrapStatus(statusCopy) {
        if (this.backendStatusData && this.backendStatusData[statusCopy.meta.returnSys + statusCopy.meta.status.errorCode]) {
            statusCopy = { ...statusCopy, ...this.backendStatusData[statusCopy.meta.returnSys + statusCopy.meta.status.errorCode] };
        }
        else {
            const { t } = useGlobalVueI18n();
            if (statusCopy.meta.returnSys === this.STATUS_SYS_APP)
                statusCopy.meta.status.errorDesc = t(statusCopy.meta.status.errorDesc);
        }
        return statusCopy;
    }
    getClientDescI18NKey(code) {
        return `client.status.${code}`;
    }
    isSuccess(status) {
        return this.isSVCStatusCode(status, this.SVCCode.SVCSUCC);
    }
    isWAFBlock(status) {
        return this.isClientStatusCode(status, this.clientCode.APP1005);
    }
    isNoJsonFormat(status) {
        return this.isClientStatusCode(status, this.clientCode.APP1007);
    }
    isTxnModuleNotFound(status) {
        return this.isClientStatusCode(status, this.clientCode.APP1011);
    }
    isDAPBlock(status) {
        return this.isClientStatusCode(status, this.clientCode.APP1013);
    }
    isGatewayTimeout(status) {
        return this.isClientStatusCode(status, this.clientCode.APP1010);
    }
    isAppDisabled(status) {
        return this.isClientStatusCode(status, this.clientCode.APP1012);
    }
    isFieldError(status) {
        return this.isSVCStatusCode(status, this.SVCCode.SVC1001);
    }
    isDupTxn(status) {
        return this.isSVCStatusCode(status, this.SVCCode.SVC9902);
    }
    isSessionTimeout(status) {
        return this.isSVCStatusCode(status, this.SVCCode.SVC9907);
    }
    isNoLoginUser(status) {
        return this.isSVCStatusCode(status, this.SVCCode.SVC9909);
    }
}
