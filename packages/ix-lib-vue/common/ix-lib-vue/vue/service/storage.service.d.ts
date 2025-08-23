import { BaseService } from './base-service';
export declare class StorageService extends BaseService {
    protected serviceName: string;
    protected storageJSONKey: string;
    getValue(storageKey: string): string;
    setValue(storageKey: string, value: string): void;
    getJSONValue(key: string): string;
    setJSONValue(key: string, value: string | null): void;
    protected seed: string;
    getSeed(): string;
    setSeed(val: string): void;
    protected pushToken: string;
    getPushNotificationToken(): string;
    setPushNotificationToken(token: string): void;
    protected reloadApp: string;
    isReloadApp(): boolean;
    setReloadApp(val: 'Y' | null): void;
    clearReloadApp(): void;
}
