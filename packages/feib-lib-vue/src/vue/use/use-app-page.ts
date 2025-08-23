import {
  ISimpleSubscription,
  defaultString,
  subscribeEvent,
} from '@twix/ix-lib-base';
import {
  getComponentName,
  IPage,
  IPageHooks,
  IUsePageOptions,
  setupPageHooks,
  useAppService,
  useNavigationService,
  usePage,
  useSharedDataService,
} from '@twix/ix-lib-vue';
import { AppService } from '../service/app.service';

/**
 * vue lib與app的component中間層，如有app層component需客制可在此處理
 */
export interface IUseAppPageOptions extends IUsePageOptions {
  title?: () => string;
  desc: string;
  showHeader?: () => boolean;
  showNav?: () => boolean;
  showFooter?: () => boolean;
}

export interface IAppPageHooks extends IPageHooks {
  reuse?: (page: IAppPage) => void;
  scroll?: () => void;
}

export interface IAppPage extends IPage {
  title(): string;
  getDesc(): string;
  showHeader?: () => boolean;
  showNav?: () => boolean;
  showFooter?: () => boolean;
  app: AppService;
}

export function useAppPage(
  useOptions: IUseAppPageOptions,
  hooks: IAppPageHooks
): IAppPage {
  const page = usePage(useOptions);

  const app = useAppService<AppService>();

  // 頁面標題
  const title = useOptions.title
    ? useOptions.title
    : () => {
        return app.getTaskName();
      };

  // 頁面描述
  const desc = defaultString(useOptions.desc, getComponentName());
  function getDesc(): string {
    return desc;
  }

  // 是否顯示表頭
  const showHeader = useOptions.showHeader
    ? useOptions.showHeader
    : () => {
        return true;
      };

  // 是否顯示 Navigation
  const showNav = useOptions.showNav
    ? useOptions.showNav
    : () => {
        return true;
      };

  // 是否顯示Footer
  const showFooter = useOptions.showFooter
    ? useOptions.showFooter
    : () => {
        return false;
      };

  // /** 取得header 登入資訊 */
  // const getHeaderInfo = () => {
  //   let leftMetaInfo = headerInfo();
  //   // 設定 icon 的點擊事件
  //   return leftMetaInfo;
  // };

  /**
   * init
   */
  function init(): void {
    // 一回到登入後首頁 就清除所有Txn歷程
    if (
      app.sharedData.isLogin() &&
      page.routePath === app.config.loginHomeRoutePath
    ) {
      useNavigationService().clearTxnStack();
    }
  }

  const appPage = {
    ...page,
    title,
    getDesc,
    showHeader,
    showNav,
    showFooter,
    app,
  };

  // init
  init();

  // scroll event
  let scrollSubscription: ISimpleSubscription;

  function subscribeScrollEvent() {
    scrollSubscription = subscribeEvent(
      useSharedDataService().getScrollingElement(),
      'scroll',
      hooks.scroll
    );
  }

  function unsubscribeScrollEvent() {
    if (scrollSubscription) {
      scrollSubscription.unsubscribe();
      scrollSubscription = null;
    }
  }

  /**
   * page hooks
   */
  setupPageHooks(
    {
      viewInit(): void {
        if (hooks.viewInit) hooks.viewInit();
        if (hooks.scroll) subscribeScrollEvent();
        page.viewInit();
      },
      destroy(): void {
        if (hooks.destroy) hooks.destroy();
        if (hooks.scroll) unsubscribeScrollEvent();
        page.destroy();
      },
      leave(): boolean | Promise<boolean> {
        if (hooks.leave) return hooks.leave();
        if (hooks.scroll) unsubscribeScrollEvent();
        return true;
      },
      reuse(page: IAppPage): void {
        page.reuse(page);
        if (hooks.reuse) hooks.reuse(page);
        if (hooks.scroll) subscribeScrollEvent();
      },
      pause(): void {
        if (hooks.pause) hooks.pause();
      },
      resume(): void {
        if (hooks.resume) hooks.resume();
      },
    },
    appPage
  );

  return appPage;
}
