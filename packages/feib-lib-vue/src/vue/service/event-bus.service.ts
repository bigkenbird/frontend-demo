import { EventBusService } from '@twix/ix-lib-vue';
import { nextSeqNoStr } from '@twix/ix-lib-base';

export class AppEventBusService extends EventBusService {
  /**
   * Header Display Action
   */
  private headerAction = 'headerDisplay' + nextSeqNoStr();

  /**
   * 註冊 Header Display Action
   */
  onHeaderDisplayAction(callback: () => void): void {
    this.on(this.headerAction, () => {
      callback();
      return Promise.resolve([null, null]);
    });
  }

  /**
   * 觸發 Header Display Action
   */
  emitHeaderDisplayAction(): Promise<boolean> {
    return this.emit(this.headerAction, []);
  }

  /**
   * 取消 Header Display Action
   */
  offHeaderDisplayAction(): void {
    this.off(this.headerAction);
  }
}
