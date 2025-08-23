import { useAppService, useNavigationService } from '../use/use-injector';
export function useActivateGuardService() {
    const app = useAppService();
    const pageData = getPageData();
    return { app, pageData };
}
let pageDataCopy;
function getPageData() {
    if (pageDataCopy != null) {
        return pageDataCopy;
    }
    const navigation = useNavigationService();
    let data = {};
    if (navigation.getCurrentHistoryTrack() != null) {
        data = navigation.getCurrentHistoryTrack().data;
    }
    pageDataCopy = Object.assign({}, data);
    return pageDataCopy;
}
