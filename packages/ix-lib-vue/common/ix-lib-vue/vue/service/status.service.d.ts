import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../vue-interface';
import { BaseService } from './base-service';
export declare class StatusService extends BaseService {
    protected serviceName: string;
    STATUS_SYS_APP: string;
    STATUS_SYS_SVC: string;
    STATUS_SYS_ADT: string;
    clientCode: IClientStatusCode;
    protected SVCCode: IServiceStatusCode;
    protected backendStatusData: IData;
    setBackendStatusData(statusData: IData): void;
    isClientStatusCode(status: IStatus, code: string): boolean;
    isADTStatusCode(status: IStatus, code: string): boolean;
    isSVCStatusCode(status: IStatus, code: string): boolean;
    getClientStatus(code: string): IStatus;
    responseJSONToStatus(responseJSON: IData): IStatus;
    protected copyResponseJSONColumnToStatus(responseJSON: IData, status: IStatus): void;
    responseErrorToStatus(error: IData): IStatus;
    protected wrapStatus(statusCopy: IStatus): IStatus;
    protected getClientDescI18NKey(code: string): string;
    isSuccess(status: IStatus): boolean;
    isWAFBlock(status: IStatus): boolean;
    isNoJsonFormat(status: IStatus): boolean;
    isTxnModuleNotFound(status: IStatus): boolean;
    isDAPBlock(status: IStatus): boolean;
    isGatewayTimeout(status: IStatus): boolean;
    isAppDisabled(status: IStatus): boolean;
    isFieldError(status: IStatus): boolean;
    isDupTxn(status: IStatus): boolean;
    isSessionTimeout(status: IStatus): boolean;
    isNoLoginUser(status: IStatus): boolean;
}
export interface IClientStatusCode {
    readonly APP1001: string;
    readonly APP1002: string;
    readonly APP1003: string;
    readonly APP1004: string;
    readonly APP1005: string;
    readonly APP1006: string;
    readonly APP1007: string;
    readonly APP1008: string;
    readonly APP1009: string;
    readonly APP1010: string;
    readonly APP1011: string;
    readonly APP1012: string;
    readonly APP1013: string;
    readonly APP9999: string;
}
export interface IServiceStatusCode {
    readonly SVC0000: string;
    readonly SVC1001: string;
    readonly SVC9902: string;
    readonly SVC9907: string;
    readonly SVC9909: string;
    readonly SVC9914: string;
    readonly SVCSUCC: string;  // 目前後端回傳的成功代碼是空字串，不是0000，先調整成空字串等日後確認後再修改
}