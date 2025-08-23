import { VueInjector } from '../vue-injector';
const configToken = Symbol();
export function getConfigToken() {
    return configToken;
}
export function useConfig() {
    return VueInjector.get(getConfigToken());
}
const I18NMessagesToken = Symbol();
export function getI18NMessagesToken() {
    return I18NMessagesToken;
}
export function useI18NMessages() {
    return VueInjector.get(getI18NMessagesToken());
}
const timerServiceToken = Symbol();
export function getTimerServiceToken() {
    return timerServiceToken;
}
export function useTimerService() {
    return VueInjector.get(getTimerServiceToken());
}
const sharedDataServiceToken = Symbol();
export function getSharedDataServiceToken() {
    return sharedDataServiceToken;
}
export function useSharedDataService() {
    return VueInjector.get(getSharedDataServiceToken());
}
const routeServiceToken = Symbol();
export function getRouteServiceToken() {
    return routeServiceToken;
}
export function useRouteService() {
    return VueInjector.get(getRouteServiceToken());
}
const navigationServiceToken = Symbol();
export function getNavigationServiceToken() {
    return navigationServiceToken;
}
export function useNavigationService() {
    return VueInjector.get(getNavigationServiceToken());
}
const eventServiceToken = Symbol();
export function getEventServiceToken() {
    return eventServiceToken;
}
export function useEventService() {
    return VueInjector.get(getEventServiceToken());
}
const eventBusServiceToken = Symbol();
export function getEventBusServiceToken() {
    return eventBusServiceToken;
}
export function useEventBusService() {
    return VueInjector.get(getEventBusServiceToken());
}
const invokeServiceToken = Symbol();
export function getInvokeServiceToken() {
    return invokeServiceToken;
}
export function useInvokeService() {
    return VueInjector.get(getInvokeServiceToken());
}
const statusServiceToken = Symbol();
export function getStatusServiceToken() {
    return statusServiceToken;
}
export function useStatusService() {
    return VueInjector.get(getStatusServiceToken());
}
const viewServiceToken = Symbol();
export function getViewServiceToken() {
    return viewServiceToken;
}
export function useViewService() {
    return VueInjector.get(getViewServiceToken());
}
const storageServiceToken = Symbol();
export function getStorageServiceToken() {
    return storageServiceToken;
}
export function useStorageService() {
    return VueInjector.get(getStorageServiceToken());
}
const authServiceToken = Symbol();
export function getAuthServiceToken() {
    return authServiceToken;
}
export function useAuthService() {
    return VueInjector.get(getAuthServiceToken());
}
const appServiceToken = Symbol();
export function getAppServiceToken() {
    return appServiceToken;
}
export function useAppService() {
    return VueInjector.get(getAppServiceToken());
}
const loggerServiceToken = Symbol();
export function getLoggerServiceToken() {
    return loggerServiceToken;
}
export function useLoggerService() {
    return VueInjector.get(getLoggerServiceToken());
}
