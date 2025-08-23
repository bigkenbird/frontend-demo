let handle = 0;
const map = new Map();
export function setCustomInterval(callback, timeout) {
    const interval = new CustomInterval();
    interval.setInterval(callback, timeout);
    handle++;
    map.set(handle, interval);
    return handle;
}
export function clearCustomInterval(flag) {
    if (flag != null && map.has(flag)) {
        const interval = map.get(flag);
        if (interval) {
            interval.clearInterval();
        }
        map.delete(flag);
    }
}
class CustomInterval {
    handle;
    setInterval(handler, timeout) {
        this.handle = window.setTimeout(() => {
            this.setInterval(handler, timeout);
            handler();
        }, timeout);
    }
    clearInterval() {
        if (this.handle != null) {
            window.clearTimeout(this.handle);
            this.handle = undefined;
        }
    }
}
