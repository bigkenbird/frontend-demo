import { defaultString, devWarning } from '@twix/ix-lib-base';
import { getComponentName } from '../fn/get-component-name';
import { useAppService, useLoggerService, useSharedDataService } from '../use/use-injector';
import { useForm } from './use-form';
export function usePage(useOptions) {
    const name = getComponentName();
    const logger = useLoggerService().addLoggerPrefix(name);
    const app = useAppService();
    const id = app.getCurrentHistoryTrack().pk;
    const urlRoot = defaultString(app.sharedData.getUrlRoot(), '.');
    const routePath = app.getRoutePath();
    const previousRoutePath = app.sharedData.getPreviousRouteUrl();
    const dataCopy = getPageDataCopy();
    logger.debug('pageData:', dataCopy);
    const form = useOptions.form ? useOptions.form : useForm({}, {}, () => { });
    const saveScrollPosition = !!useOptions.saveScrollPosition;
    let scrollPosition = 0;
    function setScrollPosition(val) {
        scrollPosition = val;
    }
    const hideLoadingWhenInit = useOptions.hideLoadingWhenInit == null ? true : !!useOptions.hideLoadingWhenInit;
    const rootElement = app.sharedData.getPageRootElement();
    function init() {
        app.sharedData.setCurrentPagePK(id);
        if (app.getCurrentHistoryTrack().routePath !== routePath) {
            devWarning('頁面實體與歷程路徑比對錯誤', 'track route:', app.getCurrentHistoryTrack().routePath, 'routePath:', routePath);
        }
        app.view.resetPageCSSWhenPageInit();
        logger.debug('init()', 'routePath:', routePath, 'previousRoutePath:', previousRoutePath);
        app.scrollAnimate(0, false);
    }
    function viewInit() {
        if (hideLoadingWhenInit)
            app.view.hideLoading();
    }
    function destroy() {
    }
    function reuse(page) {
        const reuseData = app.sharedData.getPreviousReuseData();
        app.sharedData.setCurrentPagePK(id);
        app.sharedData.setPreviousReuseData(null);
        logger.debug('reuse() reuseData:', reuseData);
        window.requestAnimationFrame(() => {
            app.event.emitPageDidChangeSubject(page);
            app.scrollAnimate(saveScrollPosition ? scrollPosition : 0, false, 0);
            app.view.hideLoading();
        });
    }
    const sharedData = useSharedDataService();
    function isActivePage() {
        return id && id === sharedData.getCurrentPagePK();
    }
    init();
    return {
        viewInit,
        destroy,
        reuse,
        name,
        id,
        URL_ROOT: urlRoot,
        routePath,
        previousRoutePath,
        form,
        rootElement,
        hideLoadingWhenInit,
        data: dataCopy,
        logger,
        app,
        setScrollPosition,
        isActivePage,
        ...useTxnData()
    };
}
function useTxnData() {
    const app = useAppService();
    function getTxnData() {
        return app.sharedData.getTxnData(app.getTxnPk());
    }
    function setTxnData(data) {
        app.sharedData.setTxnData(app.getTxnPk(), data);
    }
    function setTxnDataReplace(data) {
        let txnData = getTxnData();
        if (!txnData)
            txnData = {};
        setTxnData({
            ...txnData,
            ...data
        });
    }
    return {
        getTxnData,
        setTxnData,
        setTxnDataReplace
    };
}
function getPageDataCopy() {
    const app = useAppService();
    if (app.getCurrentHistoryTrack()) {
        const pageData = app.getCurrentHistoryTrack().rsData;
        return Object.assign({}, pageData);
    }
    else {
        return {};
    }
}
