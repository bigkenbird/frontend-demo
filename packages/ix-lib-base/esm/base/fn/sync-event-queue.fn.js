import { error } from './logger/error.fn';
export class SyncEventQueue {
    lock = false;
    queue = [];
    argsQueue = [];
    _finishAll;
    /**
     * 是否Queue還有未執行完成的Event
     * @returns
     */
    hasEventOnQueue() {
        return this.queue.length > 0;
    }
    pushQueue(event, args) {
        this.queue.push(event);
        this.argsQueue.push(args == null ? [] : args);
        if (this.lock) {
            return;
        }
        this.lock = true;
        this.runSync();
    }
    runSync() {
        if (this.queue.length > 0) {
            this.queue
                .shift()(...this.argsQueue.shift())
                .then(() => {
                this.runSync();
            })
                .catch((e) => {
                error(e);
                this.runSync();
            });
        }
        else {
            this.queue = [];
            this.argsQueue = [];
            this.lock = false;
            if (this._finishAll)
                this._finishAll();
        }
    }
    finishAll(finishAll) {
        this._finishAll = finishAll;
    }
}
