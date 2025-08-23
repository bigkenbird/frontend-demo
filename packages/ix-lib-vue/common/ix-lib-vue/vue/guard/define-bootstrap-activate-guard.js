import { isBlank, isNativeApp, parseUrl as _parseUrl, replaceAll } from '@twix/ix-lib-base';
import { useConfig, useEventService, useRouteService, useSharedDataService } from '../use/use-injector';
import { useLogger } from '../use/use-logger';
let done = false;
export function defineBootstrapActivateGuard(useOptions) {
    const { debug } = useLogger('bootstrap-activate-guard');
    return (to, from) => {
        debug('bootstrap activate guard', to, from);
        return new Promise((resolve) => {
            if (!done) {
                done = true;
                const startUrl = useSharedDataService().getStartUrl();
                debug('Start Url:', startUrl);
                const taskNoAndParams = useOptions?.parseUrl ? useOptions.parseUrl(startUrl) : parseUrl(startUrl);
                debug('Start Txn:', taskNoAndParams[0], 'Params:', taskNoAndParams[1]);
                useEventService().emitBootstrapGuardReadySubject(taskNoAndParams);
                resolve(!done);
            }
            else {
                resolve(done);
            }
        });
    };
}
function parseUrl(startUrl) {
    const parseData = _parseUrl(startUrl);
    const route = useRouteService();
    const config = useConfig();
    if (isNativeApp()) {
        const taskNo = route.routeUrlToTaskNo(config.homeRoutePath);
        return [taskNo, parseData[1]];
    }
    else {
        const host = location.protocol + '//' + location.host;
        const pureUrl = replaceAll(parseData[0].substring(host.length), '//', '/');
        let taskNo;
        if (!isBlank(pureUrl) && pureUrl !== '/') {
            taskNo = route.routeUrlToTaskNo(pureUrl);
        }
        if (isBlank(taskNo)) {
            taskNo = route.routeUrlToTaskNo(config.homeRoutePath);
        }
        return [taskNo, parseData[1]];
    }
}
