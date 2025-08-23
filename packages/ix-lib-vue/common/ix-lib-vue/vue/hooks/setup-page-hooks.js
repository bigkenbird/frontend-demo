import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { getComponentName } from '../fn/get-component-name';
import { subscribeGlobalPauseEvent, subscribeGlobalResumeEvent } from '../use/use-global-api';
import { useLoggerService, useEventService, useNavigationService } from '../use/use-injector';
export function setupPageHooks(hooks, page) {
    const name = 'setup-page-hooks';
    const { info } = page.logger ? page.logger.addLoggerPrefix(name) : useLoggerService().addLoggerPrefix(name);
    const componentName = getComponentName();
    useRoute().meta.name = componentName;
    useNavigationService().getCurrentHistoryTrack().name = componentName;
    onMounted(() => {
        info('viewInit()');
        if (hooks.viewInit)
            hooks.viewInit();
        window.requestAnimationFrame(() => {
            useEventService().emitPageDidChangeSubject(page);
        });
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
        if (hooks.destroy)
            hooks.destroy();
    });
    let canTriggerReuse = false;
    onActivated(() => {
        if (canTriggerReuse) {
            page?.reuse(page);
            if (hooks.reuse)
                hooks.reuse(page);
        }
    });
    onDeactivated(() => {
        canTriggerReuse = true;
    });
    onBeforeRouteLeave(() => {
        info('leave()');
        if (hooks.leave) {
            return hooks.leave();
        }
        else {
            return true;
        }
    });
    let unsubscribeGlobalPauseEvent = subscribeGlobalPauseEvent(() => {
        info('pause()');
        if (page.isActivePage() && hooks.pause)
            hooks.pause();
    });
    let unsubscribeGlobalResumeEvent = subscribeGlobalResumeEvent(() => {
        info('resume()');
        if (page.isActivePage() && hooks.resume)
            hooks.resume();
    });
}
