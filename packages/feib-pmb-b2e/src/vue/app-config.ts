import { LoggerLevel } from '@twix/ix-lib-base';
import { IVueConfig, vueConfig } from '@twix/ix-lib-vue';

/**
 * App Config Interface
 */
export interface IAppConfig extends IVueConfig {
  //
}

/**
 * App Config
 */
export default {
  ...vueConfig,

  /** base **/
  loggerLevel: LoggerLevel.DEBUG,
  clientLogger: true,
  serverLogger: true,
};
