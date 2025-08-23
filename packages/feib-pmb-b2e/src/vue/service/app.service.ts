import { IData, IEditableData, uuid } from '@twix/ix-lib-base';
import {
  AppBaseService,
  EventBusService,
  useEventBusService,
} from '@twix/ix-lib-vue';

export class AppService extends AppBaseService {
  /**
   * @implements
   */
  protected serviceName = 'AppService';
  /**
   * @override
   */
  get eventBus(): EventBusService {
    return useEventBusService();
  }

  /**
   * @implements
   */
  previousPage(): void {
    // 回前交易歷程或頁面歷程
    this.navigation.getHistory().removeLastTrack();
    let history = this.navigation.getHistory().getPreviousTrack(0);
    if (history && history.routePath != null) {
      console.log('previous history', history.routePath);
      this.route
        .getRouter()
        .push({ path: history.routePath, query: history.data, replace: false });
    } else {
      this.route.getRouter().push({ path: '/', query: {}, replace: false });
    }
  }

  nextPage(routeUrl: string, data: IData, ignorePageHistory?: boolean): void {
    this.navigation.getHistory().addTrack({
      pk: uuid(),
      routePath: routeUrl,
      data: data,
      rsData: data,
      inited: true,
    });

    this.route
      .getRouter()
      .push({ path: routeUrl, query: data, replace: false });
  }

  changeTxn(taskNo: string, rqData?: IData): void {
    if (!rqData) {
      rqData = {};
    }
    this.navigation.nextPage(taskNo, rqData);
  }

  /**
   * 取得 交易層級返回時使用的參數
   */
  getPreviousTxnData(): IEditableData {
    if (this.navigation.getHistory()) {
      return this.navigation.getHistory().getPreviousTxnData();
    }
    return {};
  }
}
