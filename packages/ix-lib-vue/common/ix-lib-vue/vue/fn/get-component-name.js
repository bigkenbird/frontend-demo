import { UNKNOWN } from '@twix/ix-lib-base';
import { getCurrentInstance } from 'vue';
export function getComponentName() {
    const instance = getCurrentInstance();
    if (instance) {
        let val = instance.type.__name;
        if (val)
            return val;
        val = instance.type.name;
        if (val)
            return val;
    }
    return UNKNOWN;
}
