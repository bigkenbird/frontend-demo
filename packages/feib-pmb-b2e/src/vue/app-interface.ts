import { IStatus } from '@twix/ix-lib-vue';

/**
 * App Status
 */
export interface IAppStatus extends IStatus {
  displayCode?: string;
  errorTitle?: string;
}
