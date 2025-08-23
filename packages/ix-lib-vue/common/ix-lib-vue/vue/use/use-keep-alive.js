import { isBlank } from '@twix/ix-lib-base';
import { nextTick, reactive } from 'vue';
const caches = reactive([]);
function getCaches() {
    return caches;
}
function addCache(name) {
    if (!isBlank(name) && !caches.includes(name)) {
        caches.push(name);
    }
}
async function removeCache(name) {
    if (!isBlank(name)) {
        const index = caches.indexOf(name);
        if (index > -1) {
            caches.splice(index, 1);
            await nextTick();
            return true;
        }
    }
    return false;
}
async function removeAllCaches() {
    const len = caches.length;
    for (let i = len - 1; i >= 0; i--) {
        await removeCache(caches[i]);
    }
}
export function useKeepAliveCache() {
    return {
        getCaches,
        addCache,
        removeCache,
        removeAllCaches
    };
}
