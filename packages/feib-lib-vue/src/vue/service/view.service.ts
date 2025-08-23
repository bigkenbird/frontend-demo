import { IPopupClose, ModalAction, ViewService } from '@twix/ix-lib-vue';

/**
 * View Service
 */
export class AppViewService extends ViewService {
  /**
   * Service Name
   */
  protected serviceName = 'ViewService';

  /**
   * 顯示 loading
   */
  showLoading(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * 隱藏 loading
   */
  hideLoading(): void {}

  /**
   * 顯示alert
   *
   * @param text
   * @param confirm
   * @param title
   * @param btnText
   * @param rootClass
   */
  showAlert(
    text: string,
    confirm?: IPopupClose,
    title?: string,
    btnText?: string
  ): Promise<ModalAction> {
    return Promise.resolve(ModalAction.CONFIRM);
  }

  /**
   * 顯示confirm
   *
   * @param text
   * @param confirm
   * @param cancel
   * @param title
   * @param confirmBtnText
   * @param cancelBtnText
   * @param rootClass
   */
  showConfirm(
    text: string,
    confirm?: IPopupClose,
    cancel?: IPopupClose,
    title?: string,
    confirmBtnText?: string,
    cancelBtnText?: string
  ): Promise<ModalAction> {
    return Promise.resolve(ModalAction.CONFIRM);
  }

  /**
   * 顯示系統錯誤Popup
   *
   * @param message
   * @param confirm
   * @param title
   * @param btnText
   */
  showGlobalErrorPopup(
    message: string,
    confirm: IPopupClose,
    title?: string,
    btnText?: string
  ): Promise<ModalAction> {
    return Promise.resolve(ModalAction.CONFIRM);
  }

  /**
   * 關閉所有modal
   */
  closeAllModal(callback: () => void): void {}

  /**
   * 在Page Init時重置Page CSS
   */
  resetPageCSSWhenPageInit(): void {}

  /**
   * 為了Promise回傳，需多封裝一層
   */
  protected wrapClose(
    r: (v: ModalAction) => void,
    rVal: ModalAction,
    fn?: IPopupClose
  ): IPopupClose {
    if (fn) {
      return (close: () => void) => {
        // 執行完fn再close與resolve
        new Promise<void>((r) => {
          fn(r);
        }).then(() => {
          close();
          r(rVal);
        });
      };
    } else {
      return (close: () => void) => {
        close();
        r(rVal);
      };
    }
  }
}
