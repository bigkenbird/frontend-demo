import { nextSeqNoStr } from '@twix/ix-lib-base';
import { getComponentName } from '../fn/get-component-name';
import { useLoggerService } from '../use/use-injector';
export function useComponent(useOptions) {
    const name = useOptions.name ? useOptions.name : getComponentName();
    const logger = useOptions.logger ? useOptions.logger : useLoggerService().addLoggerPrefix(name);
    const rootElementRef = useOptions.rootElementRef ? useOptions.rootElementRef : null;
    const id = nextSeqNoStr();
    function init() { }
    function viewInit() { }
    function destroy() { }
    init();
    return {
        id,
        name,
        rootElementRef,
        logger,
        viewInit,
        destroy
    };
}
