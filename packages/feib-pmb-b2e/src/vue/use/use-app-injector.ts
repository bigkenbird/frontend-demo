import {
  getAppServiceToken,
  getEventBusServiceToken,
  getRouteServiceToken,
  getEventServiceToken,
  getNavigationServiceToken,
  getSharedDataServiceToken,
  getI18NMessagesToken,
  NavigationService,
  SharedDataService,
  EventService,
  RouteService,
  getConfigToken,
  getViewServiceToken,
  getLoggerServiceToken,
  getInvokeServiceToken,
  getStatusServiceToken,
  useLogger,
  getStorageServiceToken,
} from '@twix/ix-lib-vue';
import appConfig from '../app-config';
import { ValidatorService } from '@/service/validator.service';
import messages from '@/service/messages';
import { AppViewService } from '../service/view.service';
import { AppService } from '../service/app.service';
import { AppEventBusService } from '../service/event-bus.service';
import { AppInvokeService } from '../service/invoke.service';
import { AppStatusService } from '../service/status.service';
import { InjectionKey } from 'vue';
import { AppStorageService } from '../service/storage.service';

/**
 * Validator Service
 */
const validatorServiceToken: InjectionKey<ValidatorService> = Symbol();
export function getValidatorServiceToken<
  S extends ValidatorService
>(): InjectionKey<S> {
  return validatorServiceToken;
}

/**
 * Validator Service
 */
export function useValidatorService(): ValidatorService {
  return new ValidatorService();
}

/**
 * injector list
 */
export default {
  providers: [
    { provide: getConfigToken(), value: appConfig },
    { provide: getI18NMessagesToken(), value: messages },
    { provide: getLoggerServiceToken(), use: useLogger },
    { provide: getStatusServiceToken(), clazz: AppStatusService },
    { provide: getStorageServiceToken(), clazz: AppStorageService },
    { provide: getInvokeServiceToken(), clazz: AppInvokeService },
    { provide: getRouteServiceToken(), use: RouteService },
    { provide: getSharedDataServiceToken(), clazz: SharedDataService },
    { provide: getEventServiceToken(), clazz: EventService },
    { provide: getEventBusServiceToken(), clazz: AppEventBusService },
    { provide: getNavigationServiceToken(), clazz: NavigationService },
    { provide: getAppServiceToken(), clazz: AppService },
    { provide: getViewServiceToken(), clazz: AppViewService },
    { provide: getValidatorServiceToken(), clazz: ValidatorService },
  ],
};
