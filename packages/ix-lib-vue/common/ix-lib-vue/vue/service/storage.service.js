import { getLocalStorageJSONValue, getLocalStorageValue, setLocalStorageJSONValue, setLocalStorageValue } from '@twix/ix-lib-base';
import { BaseService } from './base-service';
export class StorageService extends BaseService {
    serviceName = 'StorageService';
    storageJSONKey = 'storage.data';
    getValue(storageKey) {
        return getLocalStorageValue(storageKey);
    }
    setValue(storageKey, value) {
        setLocalStorageValue(storageKey, value);
    }
    getJSONValue(key) {
        return getLocalStorageJSONValue(this.storageJSONKey, key);
    }
    setJSONValue(key, value) {
        setLocalStorageJSONValue(this.storageJSONKey, key, value);
    }
    seed = 'seed';
    getSeed() {
        return this.getJSONValue(this.seed);
    }
    setSeed(val) {
        this.setJSONValue(this.seed, val);
    }
    pushToken = 'pushToken';
    getPushNotificationToken() {
        return this.getJSONValue(this.pushToken);
    }
    setPushNotificationToken(token) {
        this.setJSONValue(this.pushToken, token);
    }
    reloadApp = 'reloadApp';
    isReloadApp() {
        return window.sessionStorage.getItem(this.reloadApp) === 'Y';
    }
    setReloadApp(val) {
        if (val == null) {
            this.clearReloadApp();
        }
        else {
            window.sessionStorage.setItem(this.reloadApp, 'Y');
        }
    }
    clearReloadApp() {
        window.sessionStorage.removeItem(this.reloadApp);
    }
}
