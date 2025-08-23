import { getAuthServiceToken, getSharedDataServiceToken } from '../use/use-injector';
import { useLogger } from '../use/use-logger';
import { VueInjector } from '../vue-injector';
export function defineAuthActivateGuard(useOptions) {
    const { debug } = useLogger('auth-activate-guard');
    return (to, from) => {
        debug('auth activate guard', to, from);
        if (useOptions?.activate) {
            return new Promise((done) => {
                useOptions.activate({
                    done
                });
            });
        }
        else {
            const isLogin = VueInjector.get(getSharedDataServiceToken()).isLogin();
            if (!isLogin) {
                VueInjector.get(getAuthServiceToken()).doLogin();
            }
            return isLogin;
        }
    };
}
