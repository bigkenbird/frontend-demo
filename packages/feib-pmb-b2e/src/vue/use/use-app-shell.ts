import {
  IShell,
  IShellHooks,
  IUseShellOptions,
  setupShellHooks,
  useShell,
} from '@twix/ix-lib-vue';
import { IAppPage } from '@app-vue/use/use-app-page';

/**
 * vue lib與app的shell中間層，如有app層shell需客制可在此處理
 */

export interface IUseAppShellOptions extends IUseShellOptions {
  //
}

export interface IAppShellHooks extends IShellHooks {
  // pageDidChange: <IAppPage>(page) => void; // TODO: generic type判斷在Vue有問題
  pageDidChange: (page: IAppPage) => void;
}

export interface IAppShell extends IShell {
  //
}

export function useAppShell(
  useOptions: IUseAppShellOptions,
  hooks: IAppShellHooks
): IAppShell {
  const shell = useShell(useOptions);
  setupShellHooks(
    {
      viewInit: () => {
        shell.viewInit();
        if (hooks.viewInit) hooks.viewInit();
      },
      destroy: () => {
        shell.destroy();
        if (hooks.destroy) hooks.destroy();
      },
      error: (err) => {
        // 錯誤控制，若有自己的實作整個替換
        if (hooks.error) {
          hooks.error(err);
        } else {
          console.log('err', err);
        }
      },
      pause: () => {
        shell.pause();
        if (hooks.pause) hooks.pause();
      },
      resume: () => {
        shell.resume();
        if (hooks.resume) hooks.resume();
      },
      orientationchange: (orientation) => {
        shell.orientationchange(orientation);
        if (hooks.orientationchange) hooks.orientationchange(orientation);
      },
      resize: () => {
        shell.resize();
        if (hooks.resize) hooks.resize();
      },
      scroll: (scrollTop) => {
        shell.scroll(scrollTop);
        if (hooks.scroll) hooks.scroll(scrollTop);
      },
      bootstrap: (data) => {
        if (hooks.bootstrap) {
          hooks.bootstrap(data);
        } else {
          shell.bootstrap(data);
        }
      },
      pageDidChange: (page) => {
        shell.pageDidChange(page);
        if (hooks.pageDidChange) hooks.pageDidChange(page);
      },
    },
    shell.logger
  );
  return shell;
}
