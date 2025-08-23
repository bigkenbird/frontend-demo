import { useInvokeService } from '@twix/ix-lib-vue';
import { IAppStatus } from '../app-interface';

/** 廣告資訊 */
export default class AdService {
  /** 取後端設定廣告資訊*/
  remoteFetchData = (txnType: string, adType: string) => {
    return new Promise<any>((resolve, reject) => {
      useInvokeService().sendAndReceiveAsync(
        '/mhm/adv-info/request',
        {
          taskType: txnType,
          adType: adType,
        },
        (rsData) => {
          resolve(rsData);
        },
        (status: IAppStatus) => {
          console.log('adv-info-request =' + JSON.stringify(status));
          reject(status);
        }
      );
    });
  };

  /** 推送廣告互動資訊*/
  adInteract = (adItem: any, interactType: any) => {
    return new Promise<any>((resolve, reject) => {
      useInvokeService().sendAndReceiveAsync(
        '/mhm/adv-info/trace',
        {
          traceId: adItem.traceId,
          interactType: interactType,
        },
        (rsData) => {
          resolve(rsData);
        },
        (status: IAppStatus) => {
          console.log('adv-info-trace =' + JSON.stringify(status));
          reject(status);
        }
      );
    });
  };

  /** 載入廣告資訊 */
  loadAd = (txnType: any, adType: any) => {
    return new Promise<any>((resolve, reject) => {
      this.remoteFetchData(txnType, adType)
        .then((rs) => {
          resolve({
            adType: adType,
            adList: rs.adList,
            showType: rs.showType,
          });
        })
        .catch((err: IAppStatus) => {
          reject(err);
        });
    });
  };

  /** 點擊廣告 */
  clickAd = (txnType: any, adType: any, adItem: { clickUrl: string | URL }) => {
    console.log(
      `CLICK AD ${txnType} ${adType} ${JSON.stringify(adItem, null, 2)}`
    );
    this.adInteract(adItem, 'CLICK');
    if (adItem.clickUrl) {
      alert(`openLinkUrl(${adItem.clickUrl})`);
    }
  };
}
