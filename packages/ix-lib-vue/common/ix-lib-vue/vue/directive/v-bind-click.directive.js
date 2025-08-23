import { handleEventListener, preventClick } from '@twix/ix-lib-base';
import { useEventBusService } from '../use/use-injector';
import { useLogger } from '../use/use-logger';
function bindClick(name) {
    const map = new Map();
    let eventBus;
    const { debug, isDebug } = useLogger(name);
    const LOG_TEXT = 'click listener count:';
    return {
        created(el, binding) {
            if (!eventBus)
                eventBus = useEventBusService();
            if (binding.value) {
                const off = handleEventListener(el, 'click', (e) => {
                    if (el.contains(e.target)) {
                        eventBus.emitBindClickClicked(e);
                        return preventClick(e, (action) => {
                            binding.value(action);
                        }, el, false, (e) => {
                            eventBus.emitBindClickSendLog(e);
                        });
                    }
                    return true;
                });
                map.set(el, off);
                if (isDebug())
                    debug(LOG_TEXT, map.size);
            }
        },
        unmounted(el) {
            if (map.has(el)) {
                map.get(el)();
                map.delete(el);
            }
            if (isDebug())
                debug(LOG_TEXT, map.size);
        }
    };
}
export const vBindClick = bindClick('v-bind-click');
