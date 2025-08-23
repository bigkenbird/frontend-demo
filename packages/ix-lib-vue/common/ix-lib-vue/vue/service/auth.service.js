import { useConfig, useInvokeService, useNavigationService, useRouteService, useSharedDataService, useViewService } from '../use/use-injector';
import { BaseService } from './base-service';
export class AuthService extends BaseService {
    serviceName = 'AuthService';
    get navigation() {
        return useNavigationService();
    }
    get route() {
        return useRouteService();
    }
    get config() {
        return useConfig();
    }
    get view() {
        return useViewService();
    }
    get sharedData() {
        return useSharedDataService();
    }
    get invoke() {
        return useInvokeService();
    }
    doLogin() {
        if (!this.sharedData.isLogin()) {
            const waitNavigateData = this.navigation.getWaitNavigateData();
            this.sharedData.setTriggerLoginNavigateData(waitNavigateData);
            if (waitNavigateData[4]) {
                this.navigation.changeTxn(this.route.routeUrlToTaskNo(this.config.loginRoutePath), {});
            }
            else {
                this.navigation.nextPage(this.config.loginRoutePath, {}, waitNavigateData[2]);
            }
        }
    }
    doLoginSuccess(data, cancelDefaultChangeTxn) {
        return new Promise((r) => {
            this.saveDataWhenLoginSuccess(data);
            this.navigation.clearTxnStack();
            if (cancelDefaultChangeTxn) {
                this.sharedData.setTriggerLoginNavigateData(null);
                r();
            }
            else {
                const waitNavigateData = this.sharedData.getTriggerLoginNavigateData();
                if (waitNavigateData && waitNavigateData.length > 0) {
                    waitNavigateData[2] = true;
                    this.navigation.getWaitNavigateData().apply(this.navigation, waitNavigateData);
                    this.sharedData.setTriggerLoginNavigateData(null);
                }
                else {
                    this.navigation.changeHomeTxn(data);
                }
            }
        });
    }
    saveDataWhenLoginSuccess(data) {
        this.sharedData.setLogin(true);
    }
    doLogout() {
        return new Promise((resolve) => {
            this.view.showLoading();
            this.sharedData.setWindowFocusAction(1);
            this.invoke.sendAndReceiveAsync(this.config.logoutResource, {}, () => {
                this.clearDataWhenLogoutSuccess();
                this.sharedData.setWindowFocusAction(2);
                this.view.closeAllModal(() => {
                    resolve(null);
                });
            }, (status) => {
                this.sharedData.setWindowFocusAction(0);
                this.view.closeAllModal(() => {
                    resolve(status);
                });
            });
        });
    }
    clearDataWhenLogoutSuccess() {
        this.sharedData.setLogin(false);
        this.sharedData.clearSessionData();
        this.sharedData.setXAuthToken(null);
    }
}
