import { devWarning, getEnvInfoAll, isBlank, isDevMode, isNativeApp, subscribeEvent } from '@twix/ix-lib-base';
import { getCurrentInstance, version } from 'vue';
import { defineGlobalComponent } from '../define/define-global-component';
import { defineGlobalDirective } from '../define/define-global-directive';
import { defineRuntimeSettings } from '../define/define-runtime-settings';
import { getEnvironmentMode } from '../fn/vue-environment-mode';
import { useAppService, useLoggerService, useAuthService, useConfig, useEventService, useSharedDataService, useTimerService, useViewService } from '../use/use-injector';
import { createVueI18n, useGlobalVueI18n } from './use-vue-i18n';
export function useShell(useOptions) {
    let windowCatchClickSubscription;
    useOptions.defineRuntimeSettings ? useOptions.defineRuntimeSettings() : defineRuntimeSettings();
    const name = 'use-shell';
    const logger = useOptions.logger ? useOptions.logger.addLoggerPrefix(name) : useLoggerService().addLoggerPrefix(name);
    printEnvInfo();
    const $app = getCurrentInstance().appContext.app;
    const config = useConfig();
    const sharedData = useSharedDataService();
    const event = useEventService();
    const app = useAppService();
    const view = useViewService();
    $app.use(createVueI18n());
    const { t } = useGlobalVueI18n();
    useOptions.defineGlobalDirective ? useOptions.defineGlobalDirective($app) : defineGlobalDirective($app);
    useOptions.defineGlobalComponent ? useOptions.defineGlobalComponent($app) : defineGlobalComponent($app);
    init();
    function printEnvInfo() {
        logger.info('vuejs version:', version);
        logger.info('env:', getEnvironmentMode());
        logger.info('env-runtime-info:', getEnvInfoAll());
    }
    function init() {
        if (isDevMode())
            window.channel = { service: { app } };
        sharedData.setStartUrl(location.href);
        if (useOptions.initUrlRoot) {
            sharedData.setUrlRoot(useOptions.initUrlRoot());
        }
        else {
            let urlRoot = '';
            if (isNativeApp())
                urlRoot = '.';
            sharedData.setUrlRoot(urlRoot);
        }
        if (!isBlank(sharedData.getXAuthToken())) {
            const time = sharedData.getXAuthTokenTime();
            if (time != null && new Date().getTime() - time > config.XAuthTokenTimeoutMs) {
                sharedData.clearXAuthToken();
            }
        }
        windowCatchClickSubscription = subscribeEvent(window, 'click', (e) => {
            event.emitWindowCatchClickEventSubject(e);
        });
        app.registerEventBusEvents();
        window.close = () => {
            devWarning('不應呼叫window.close()');
        };
    }
    function viewInit() {
        sharedData.setPageRootElement(useOptions.initPageRootElement.value);
        sharedData.setScrollingElement(useOptions.pageScrollingElement.value);
    }
    function error(err) {
        let errorHasShow = false;
        const errorToMessage = (error) => {
            let message = `${error.name}: ${error.message}`;
            if (error.stack != null && error.stack.length > 0) {
                message += ` ${error.stack}`;
            }
            return message;
        };
        const showErrorAlert = (message) => {
            const text = app.config.hideRealGlobalError
                ? t('alert.desc.global.error')
                : `<pre style="white-space:pre-wrap;overflow:scroll;height:400px;">${message}</pre>`;
            view.showGlobalErrorPopup(text, (close) => {
                errorHasShow = false;
                app.reloadApp().then(close);
            }, t('alert.title.error'), t('btn.refresh'));
        };
        logger.debug('handleAppError()', err);
        let message = '';
        if (err instanceof Error) {
            message = errorToMessage(err);
        }
        else if (err instanceof ErrorEvent) {
            message = errorToMessage(err.error);
        }
        else if (typeof err === 'string') {
            message = err;
        }
        else if (typeof err.toString === 'function') {
            message = err.toString();
        }
        else {
            throw err;
        }
        try {
            logger.fatal(message);
            if (!errorHasShow) {
                errorHasShow = true;
                showErrorAlert(message);
            }
            if (err instanceof TypeError) {
                throw err;
            }
        }
        catch (e) {
        }
        finally {
            view.hideLoading();
        }
        throw error;
    }
    let blurTime = -1;
    function pause() {
        sharedData.setAppInBackground(true);
        blurTime = new Date().getTime();
    }
    function resume() {
        sharedData.setAppInBackground(false);
        if (sharedData.getWindowFocusAction() === 1) {
            useAuthService().doLogout();
        }
        else if (sharedData.getWindowFocusAction() === 2) {
            app.reloadApp();
            return;
        }
        else {
            useTimerService().startLogoutTimer();
        }
        if (blurTime != -1 && new Date().getTime() - blurTime > config.idleReloadMs) {
            app.reloadApp();
            return;
        }
        else {
            blurTime = -1;
        }
    }
    function orientationchange(orientation) {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
    function resize() {
    }
    function scroll(scrollTop) {
        if (sharedData.getPageComponent() &&
            sharedData.getScrollingElement().scrollHeight !== sharedData.getScrollingElement().clientHeight) {
            sharedData.getPageComponent().setScrollPosition(scrollTop);
        }
    }
    function bootstrap(data) {
        app.changeTxn(data[0], data[1]);
    }
    function destroy() {
        if (windowCatchClickSubscription) {
            windowCatchClickSubscription.unsubscribe();
            windowCatchClickSubscription = null;
        }
    }
    function pageDidChange(page) {
        sharedData.setPageComponent(page);
    }
    return {
        viewInit,
        destroy,
        error,
        pause,
        resume,
        orientationchange,
        resize,
        scroll,
        bootstrap,
        pageDidChange,
        logger
    };
}
