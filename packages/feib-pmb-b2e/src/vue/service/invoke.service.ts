import { getLocale, IData, uuid } from "@twix/ix-lib-base";
import { InvokeService, IStatus } from "@twix/ix-lib-vue";
import axios from "axios";

export class AppInvokeService extends InvokeService {
  /**
   * 取得 發送請求與接收回應邏輯 的Promise
   */
  protected getSendAndReceivePromise(
    rq: IData,
    resource: string,
    timeoutMills: number,
    initDupToken: boolean,
    ignoreDupToken: boolean
  ): Promise<IData> {
    // if (this.dataService.isValid(resource, rq)) {
    //   return this.dataService.getData(resource, rq);
    // }

    const headers = {
      "x-auth-token": sessionStorage.getItem("x-auth-token"),
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };
    const data = JSON.stringify(rq);
    return new Promise((resolve, reject) => {
      axios(resource, {
        method: "post",
        headers: headers,
        data,
        responseType: "json",
        timeout: timeoutMills ? timeoutMills : 30000,
      })
        .then((rs) => {
          resolve({ httpHeader: rs.headers, body: rs.data });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  protected handleResponseSysData(headers: any, body: any) {
    if (headers && headers["x-auth-token"]) {
      sessionStorage.setItem("x-auth-token", headers["x-auth-token"]);
    }
  }

  /**
   * sendAndReceive 送收的統一邏輯
   */
  protected doSendAndReceiveAction(
    rq: IData,
    resource: string,
    timeoutMills: number,
    success: (rsData: IData) => void,
    failure: (status: IStatus) => void,
    initDupToken: boolean,
    ignoreDupToken: boolean
  ): Promise<void> {
    // 發送請求
    return this.getSendAndReceivePromise(
      rq,
      resource,
      timeoutMills,
      initDupToken,
      ignoreDupToken
    )
      .then((data: IData) => {
        this.debug(
          "TrackingIxd:",
          rq.trackingIxd,
          "resource:",
          resource,
          "response:",
          data
        );

        if (this.status.isSuccess(data.body)) {
          let newData = Object.assign(
            { status: data.body.meta.status },
            data.body.body
          );

          success(newData);
        } else {
          // 轉換 response 成錯誤Status
          failure(this.status.responseJSONToStatus(data.body));
        }
        // 無論回應內容成敗，都必要處理/更新的response資料
        this.handleResponseSysData(data.httpHeader, data.body);
      })
      .catch((error: IData) => {
        // 非200回應
        this.error(
          "TrackingIxd:",
          rq.trackingIxd,
          "resource:",
          resource,
          "response error:",
          error
        );
        failure(this.status.responseErrorToStatus(error));
      });
  }

  /**
   * 建立完整的request body資料
   * @param rqData rq的Data區塊
   * @param resource 請求資源路徑
   */
  protected prepareRq(rqData: IData, resource: string): IData {
    if (rqData == null) rqData = {};
    let deviceInfo = {};
    return {
      meta: {
        // Client端發送請求時的時間戳記
        clientTime: new Date().getTime(),
        // 交易重覆檢核用Token
        submitToken: this.sharedData.getCheckDupTxnToken(),
        // 交易追蹤Id, 每個Rq請求都是唯一值
        trackingId: uuid(),
        // 前端通路的系統代號，ex：PMB、ECT(e櫃台)、PBB(PMB友善銀行)、P2E(PMB後台)、CMB、CBB(CMB友善銀行)
        clientSysId: this.config.clientSysCode,
        // Client端的語系
        locale: getLocale(),
        // // 裝置Id ex:"d561fa2a8c96718b", 無法取得時為"none"
        // deviceId: 'deviceInfo.deviceId',
        // // 裝置名稱, web版為瀏覽器名稱, native app為裝置的名稱
        // // web, ex:"chrome", "firefox", "safari", "ie"
        // // native app, ex: "motorola voles","Pixel 4","iPhone 10"
        // model: deviceInfo.model,
        // // 裝置作業系統, ex: "windows10", "android", "ios"
        // platform: deviceInfo.platform,
        // // 裝置作業系統版本, ex: "10.13.4"
        // platformVersion: deviceInfo.platformVersion,
        // // 當下網路型態, ex: 'cell4g', 'none', 'ethernet'..., 無法取得時為"unknown"
        // networkType: deviceInfo.networkType,
        // // 應用程式版本, native app取app版本, web取release version
        // appVersion: deviceInfo.appVersion,
        // // 裝置執行平台, ex:"chrome", "firefox", "safari", "ie"
        // runtime: deviceInfo.runtime,
        // // 裝置執行平台版本, ex: '66.011.1', '38.1', '8', '0'...
        // runtimeVersion: deviceInfo.runtimeVersion,
        // // 網頁包大版
        // mainVersion: deviceInfo.mainVersion,
        // // 網頁包小版
        // detailVersion: this.sharedData.getMiniappDetailVersion(),
        // 請求資料
      },
      body: rqData,
    };
  }
}
