import { delay, devWarning, isBlank } from '@twix/ix-lib-base';
import { isNavigationFailure, NavigationFailureType, useRoute, useRouter } from 'vue-router';
import { useConfig } from '../use/use-injector';
import { useLogger } from '../use/use-logger';
export function RouteService(logger) {
    const serviceName = 'RouteService';
    logger = logger ? logger.addLoggerPrefix(serviceName) : useLogger(serviceName);
    const { debug, fatal } = logger;
    const route = useRoute();
    const router = useRouter();
    const config = useConfig();
    const hasActivateConfigMap = new Map();
    function getRouter() {
        return router;
    }
    function getRoutePath() {
        return route.path;
    }
    function taskNoToRouteUrl(taskNo, hasPageId = false) {
        if (isBlank(taskNo))
            return '';
        taskNo = taskNo.toLowerCase();
        const tokens = taskNo.split('_');
        if (tokens.length > 2) {
            const page = hasPageId && !isBlank(tokens[2]) ? tokens[2] : 'home';
            return '/' + tokens[0] + '/' + tokens[1] + '/' + page;
        }
        else if (tokens.length === 2) {
            return '/' + tokens[0] + '/' + tokens[1] + '/home';
        }
        devWarning('TaskNo轉換RouteUrl，格式異常');
        return '/';
    }
    function routeUrlToTaskNo(routeUrl, hasPageId = false) {
        let url = routeUrl;
        if (!isBlank(url)) {
            if (url.startsWith(config.contextRoot)) {
                url = url.substring(config.contextRoot.length);
            }
            if (url.startsWith('/')) {
                url = url.substring(1);
            }
            url = url.toUpperCase();
            const tokens = url.split('/');
            if (tokens.length === 3) {
                if (hasPageId) {
                    return `${tokens[0]}_${tokens[1]}_${tokens[2]}`;
                }
                else {
                    return `${tokens[0]}_${tokens[1]}`;
                }
            }
        }
        devWarning('routeUrl無法轉換TaskNo, routeUrl:', routeUrl);
        return '';
    }
    function hasActivateConfig() {
        const path = getRoutePath();
        if (hasActivateConfigMap.has(path)) {
            return hasActivateConfigMap.get(path);
        }
        let result = false;
        for (const route of router.getRoutes()) {
            if (path === route.path) {
                result = !!route.beforeEnter;
                break;
            }
        }
        hasActivateConfigMap.set(path, result);
        return result;
    }
    async function doNavigate(routeUrl, queryParams, skipLocationChange, replaceUrl, count = 0, countMaxFailure, success) {
        if (count < 3) {
            if (count > 0)
                delay(800);
            navigate(routeUrl, queryParams, skipLocationChange, replaceUrl, count, countMaxFailure, success);
        }
        else {
            if (countMaxFailure != null) {
                countMaxFailure();
            }
        }
    }
    function navigate(routePath, queryParams = {}, skipLocationChange, replaceUrl, count = 10, countMaxFailure, success) {
        if (skipLocationChange == null) {
            skipLocationChange = config.ngSkipLocationChangeValue;
        }
        if (replaceUrl == null) {
            replaceUrl = config.ngReplaceUrl;
        }
        debug('route.navigate()', 'routePath:', routePath, 'params:', queryParams, skipLocationChange, replaceUrl);
        router
            .push({ path: routePath, query: queryParams, replace: replaceUrl })
            .then((value) => {
            if (isNavigationFailure(value, NavigationFailureType.aborted) ||
                isNavigationFailure(value, NavigationFailureType.cancelled) ||
                isNavigationFailure(value, NavigationFailureType.duplicated)) {
                return;
            }
            else {
                if (!hasActivateConfig())
                    devWarning(`頁面未設定ActivateGuard RoutePath:${getRoutePath()}`);
                success();
            }
        })
            .catch((error) => {
            fatal('route.navigate() catch Error:', error);
            count++;
            doNavigate(routePath, queryParams, skipLocationChange, replaceUrl, count, countMaxFailure, success);
        });
    }
    return {
        getRouter,
        getRoutePath,
        taskNoToRouteUrl,
        routeUrlToTaskNo,
        doNavigate
    };
}
