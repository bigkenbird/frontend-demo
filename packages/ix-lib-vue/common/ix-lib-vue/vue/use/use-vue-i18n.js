import { getLocale } from '@twix/ix-lib-base';
import { createI18n, useI18n } from 'vue-i18n';
import { useI18NMessages } from '../use/use-injector';
export function createVueI18n(locale) {
    return createI18n({
        legacy: false,
        locale: locale ? locale : getLocale(),
        fallbackLocale: getLocale(),
        silentFallbackWarn: false,
        messages: useI18NMessages()
    });
}
let global = null;
export function useGlobalVueI18n() {
    if (global)
        return global;
    global = useI18n({ useScope: 'global' });
    return global;
}
