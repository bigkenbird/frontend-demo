import { IData } from '@twix/ix-lib-base';
import { InjectionKey } from 'vue';
export declare function initInjector(settings: IData): void;
export declare const VueInjector: {
    get<T>(key: InjectionKey<T>): T;
    set<T_1>(key: InjectionKey<T_1>, instance: T_1): void;
    has(key: unknown): boolean;
};
