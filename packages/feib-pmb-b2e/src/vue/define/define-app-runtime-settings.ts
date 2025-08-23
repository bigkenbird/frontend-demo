import appSettings from '@app-vue/use/use-app-injector';
import { Locale, setLocale } from '@twix/ix-lib-base';
import { defineRuntimeSettings, initInjector } from '@twix/ix-lib-vue';

/**
 * App執行環境設定
 */
export default (): void => {
  // init injector
  initInjector(appSettings);
  // 預設 執行環境設定
  defineRuntimeSettings();

  setLocale(Locale['zh-TW']);
};
