import { IData, isBlank } from "@twix/ix-lib-base";
import {
  IClientStatusCode,
  IServiceStatusCode,
  IStatus,
  StatusService,
  useStorageService,
} from "@twix/ix-lib-vue";
import { IAppStatus } from "../app-interface";
import { AppStorageService } from "./storage.service";
import { defineStore } from "pinia";

export interface IB2eStatus {
  txDocIxd?: string;
  txResult?: boolean;
  remark?: string;
  failReason?: string;
}

export const statusStore = defineStore("IB2eStatusStore", {
  state: () => ({
    status: null as IB2eStatus,
  }),
  getters: {
    getStatus: (state) => (state.status ? state.status : null),
  },
  actions: {
    updateStatus(status: IB2eStatus) {
      this.status = status;
    },
  },
});

export class AppStatusService extends StatusService {
  /**
   * @override
   */
  protected SVCCode: ICHLServiceStatusCode = {
    SVC0000: "0000", // 成功
    SVC1001: "COM001001", // 欄位錯誤
    SVC9902: "COM009902", // 重覆交易錯誤
    SVC9907: "COM009907", // 作業已逾時, 請重新登入(網銀瀏覽器頁籤切換時檢查是否session expired)
    SVC9909: "COM009909", // 作業逾時或已登出，感謝您的使用，如要再次查詢或交易請重新登入 (後端Session已無User)
    SVC9914: "COM009914", // OAuth 權限不符
    SVC9906: "COM009906", // 此服務暫不開放
    SVCSUCC: "", // 目前後端回傳的成功代碼是空字串，不是0000，先調整成空字串等日後確認後再修改
  };

  /**
   * @override
   */
  protected copyResponseJSONColumnToStatus(
    responseJSON: IData,
    status: IAppStatus
  ): void {
    // 後端回應欄位檢核錯誤,status需多補上errorField
    if (this.isFieldError(status)) {
      status.meta.status.errorParamList =
        responseJSON.meta.status.errorParamList;
    }

    // CHL App 額外的欄位
    status.displayCode = responseJSON.meta.status.displayMessage;
  }

  /**
   *
   * response Error 轉換為 Status
   *
   * 處理http層級的錯誤
   */
  responseErrorToStatus(error: IData): IStatus {
    let status: IStatus;

    let statusCode = Number(error.response.status);
    if (statusCode === 404) {
      // 404
      status = this.getClientStatus(this.clientCode.APP1001);
    } else if (statusCode === 500) {
      // 500
      status = this.getClientStatus(this.clientCode.APP1002);
    } else if (statusCode === 504) {
      // 504
      status = this.getClientStatus(this.clientCode.APP1010);
    } else if (statusCode === 0) {
      // 0, 連線異常，可能失去網路、網路不通或服務目前未提供正確回應
      status = this.getClientStatus(this.clientCode.APP1004);
    } else if (statusCode === 8992) {
      // 前端等待回應到逾時，IMP Fetch Counter server丟出的錯誤
      status = this.getClientStatus(this.clientCode.APP1003);
    } else if (isNaN(statusCode)) {
      // 最後無對應Status時，統一回應APP1008
      status = this.getClientStatus(this.clientCode.APP1008);
    }

    // 最後無對應Status時，統一回應APP1008
    if (status == null) {
      status = this.getClientStatus(this.clientCode.APP1008);
    }

    // debug時 多顯示資訊
    if (this.isDebug()) {
      status.meta.status.errorDesc = `${status.meta.status.errorDesc}(${error.response.status}-${error.response.statusText})`;
    }

    return status;
  }

  /**
   * @override
   */
  public wrapStatus(statusCopy: IAppStatus): IAppStatus {
    // 找出對應的desc,否則使用預設的desc
    const errorItem = this.getErrorItem(
      statusCopy.meta.returnSys,
      statusCopy.meta.status.errorCode
    );

    if (
      errorItem == null &&
      (statusCopy.meta.returnSys === this.STATUS_SYS_APP ||
        statusCopy.meta.returnSys === this.STATUS_SYS_ADT)
    ) {
      // 當對應不到訊息時，顯示統一文字
      statusCopy.meta.status.errorDesc = `系統忙碌中，請稍後再試`;
    } else if (errorItem) {
      if (!statusCopy.meta.status.errorParamList) {
        statusCopy.meta.status.errorParamList = [];
      }
      statusCopy.displayCode = errorItem.code;
      if (!isBlank(errorItem.externalDesc))
        statusCopy.meta.status.errorDesc = errorItem.externalDesc;
    }

    return statusCopy;
  }

  /**
   * 取得ErrorNodeMap中的ErrorItem
   *
   * @param errorNode - 錯誤系統, ex: 'ADT'
   * @param errorCode - 錯誤代碼, ex: '9099'
   */
  private getErrorItem(
    errorNode: string,
    errorCode: string
  ): { [key: string]: string } | null {
    if (this.backendStatusData) {
      // APP | ADT | FIDO
      if (this.backendStatusData[errorNode]) {
        if (this.backendStatusData[errorNode][errorCode]) {
          return this.backendStatusData[errorNode][errorCode];
        }
      }
    }
    return null;
  }

  /**
   * 是否為密碼到期提醒
   */
  isRequirePwdChange(status: IStatus): boolean {
    return status.meta.status.errorCode === "G508";
  }

  /**
   * 登入密碼錯誤達限制
   */
  isPwdLocked(status: IStatus): boolean {
    return status.meta.status.errorCode === "G504";
  }

  /**
   * 是否功能暫停
   */
  isSuspendTxn(status: IStatus): boolean {
    return this.isSVCStatusCode(status, this.SVCCode.SVC9906);
  }
}

/**
 * App Client Status Code Interface
 */
export interface IAppClientStatusCode extends IClientStatusCode {}

export interface ICHLServiceStatusCode extends IServiceStatusCode {
  /** 此服務暫不開放 */
  readonly SVC9906: string;
}
