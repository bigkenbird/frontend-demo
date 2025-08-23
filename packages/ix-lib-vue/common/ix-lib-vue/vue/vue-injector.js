export function initInjector(settings) {
    const instanceMap = new Map();
    settings.providers.forEach((item) => {
        let instance;
        if (item.use) {
            if (instanceMap.has(item.use)) {
                instance = instanceMap.get(item.use);
            }
            else {
                instance = item.use();
                instanceMap.set(item.use, instance);
            }
        }
        else if (item.clazz) {
            if (instanceMap.has(item.clazz)) {
                instance = instanceMap.get(item.clazz);
            }
            else {
                instance = new item.clazz();
                instanceMap.set(item.clazz, instance);
            }
        }
        else if (item.value) {
            if (instanceMap.has(item.value)) {
                instance = instanceMap.get(item.value);
            }
            else {
                instance = item.value;
                instanceMap.set(item.value, instance);
            }
        }
        if (instance)
            VueInjector.set(item.provide, instance);
    });
}
const injectorMap = new Map();
export const VueInjector = {
    get(key) {
        return injectorMap.get(key);
    },
    set(key, instance) {
        injectorMap.set(key, instance);
    },
    has(key) {
        return injectorMap.has(key);
    }
};
