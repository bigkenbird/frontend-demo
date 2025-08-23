import { getScrollTop, isNativeApp, subscribeEvent } from '@twix/ix-lib-base';
import { getCurrentInstance, onMounted, onUnmounted } from 'vue';
import { subscribeGlobalErrorEvent, subscribeGlobalOrientationChangeEvent, subscribeGlobalPauseEvent, subscribeGlobalResizeEvent, subscribeGlobalResumeEvent } from '../use/use-global-api';
import { useEventService, useSharedDataService, useLoggerService } from '../use/use-injector';
export function setupShellHooks(hooks, logger) {
    const name = 'setup-shell-hooks';
    const { info } = logger ? logger.addLoggerPrefix(name) : useLoggerService().addLoggerPrefix(name);
    onMounted(() => {
        info('viewInit()');
        if (hooks.viewInit)
            hooks.viewInit();
        subscribeScrollEvent();
    });
    onUnmounted(() => {
        info('destroy()');
        if (unsubscribeGlobalPauseEvent) {
            unsubscribeGlobalPauseEvent();
            unsubscribeGlobalPauseEvent = null;
        }
        if (unsubscribeGlobalResumeEvent) {
            unsubscribeGlobalResumeEvent();
            unsubscribeGlobalResumeEvent = null;
        }
        if (unsubscribeGlobalOrientationChangeEvent) {
            unsubscribeGlobalOrientationChangeEvent();
            unsubscribeGlobalOrientationChangeEvent = null;
        }
        if (unsubscribeGlobalResizeEvent) {
            unsubscribeGlobalResizeEvent();
            unsubscribeGlobalResizeEvent = null;
        }
        if (scrollSubscription) {
            scrollSubscription.unsubscribe();
            scrollSubscription = null;
        }
        if (hooks.destroy)
            hooks.destroy();
        if (unsubscribeErrorEvent) {
            unsubscribeErrorEvent();
            unsubscribeErrorEvent = null;
        }
        if (bootstrapGuardReadySubscription) {
            bootstrapGuardReadySubscription.unsubscribe();
            bootstrapGuardReadySubscription = null;
        }
        if (pageDidChangeSubscription) {
            pageDidChangeSubscription.unsubscribe();
            pageDidChangeSubscription = null;
        }
    });
    let unsubscribeGlobalPauseEvent = subscribeGlobalPauseEvent(() => {
        info('pause()');
        if (hooks.pause)
            hooks.pause();
    });
    let unsubscribeGlobalResumeEvent = subscribeGlobalResumeEvent(() => {
        info('resume()');
        if (isNativeApp()) {
            setTimeout(() => {
                if (hooks.resume)
                    hooks.resume();
            }, 0);
        }
        else {
            if (hooks.resume)
                hooks.resume();
        }
    });
    let unsubscribeGlobalOrientationChangeEvent = subscribeGlobalOrientationChangeEvent((e) => {
        info('orientationchange()', e);
        if (hooks.orientationchange)
            hooks.orientationchange(e.target.orientation);
    });
    let unsubscribeGlobalResizeEvent = subscribeGlobalResizeEvent(() => {
        info('resize()');
        if (hooks.resize)
            hooks.resize();
    });
    const sharedData = useSharedDataService();
    let scrollSubscription;
    function subscribeScrollEvent() {
        if (!scrollSubscription && hooks.scroll) {
            const scrollingElement = sharedData.getScrollingElement() === document.body ||
                sharedData.getScrollingElement() === document.body.parentElement
                ? window
                : sharedData.getScrollingElement();
            scrollSubscription = subscribeEvent(scrollingElement, 'scroll', () => {
                if (hooks.scroll)
                    hooks.scroll(getScrollTop(sharedData.getScrollingElement()));
            });
        }
    }
    function subscribeErrorEvent() {
        getCurrentInstance().appContext.app.config.errorHandler = (err, instance, info) => {
            if (hooks.error)
                hooks.error(err);
        };
        const unsubscribeGlobalErrorEvent = subscribeGlobalErrorEvent((err) => {
            if (hooks.error)
                hooks.error(err);
        });
        return () => {
            getCurrentInstance().appContext.app.config.errorHandler = () => { };
            unsubscribeGlobalErrorEvent();
        };
    }
    let unsubscribeErrorEvent = subscribeErrorEvent();
    const event = useEventService();
    let bootstrapGuardReadySubscription = useEventService().subscribeBootstrapGuardReadySubject((data) => {
        if (hooks.bootstrap)
            hooks.bootstrap(data);
    });
    let pageDidChangeSubscription = event.subscribePageDidChangeSubject((page) => {
        if (hooks.pageDidChange)
            hooks.pageDidChange(page);
    });
}
