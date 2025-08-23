import { onMounted, onUnmounted } from 'vue';
import { useLoggerService } from '../use/use-injector';
export function setupComponentHooks(hooks, logger) {
    const name = 'setup-component-hooks';
    const { info } = logger ? logger.addLoggerPrefix(name) : useLoggerService().addLoggerPrefix(name);
    onMounted(() => {
        info('viewInit()');
        if (hooks.viewInit)
            hooks.viewInit();
    });
    onUnmounted(() => {
        info('destroy()');
        if (hooks.destroy)
            hooks.destroy();
    });
}
