import { EventBus, nextSeqNoStr } from '@twix/ix-lib-base';
import { BaseService } from './base-service';
export class EventBusService extends BaseService {
    serviceName = 'EventBusService';
    eventBus = new EventBus();
    on(name, event, key = '') {
        this.eventBus.on(name, event, key);
    }
    once(name, event, key = '') {
        this.eventBus.once(name, event, key);
    }
    off(name, key = '') {
        this.eventBus.off(name, key);
    }
    emit(name, data, key = '', matchPrefix = false) {
        return this.eventBus.emit(name, data, key, matchPrefix);
    }
    logout = nextSeqNoStr();
    onLogout(callback) {
        this.on(this.logout, (warning) => {
            return Promise.resolve().then(() => {
                callback(warning);
            });
        });
    }
    emitLogout(warning) {
        return this.emit(this.logout, [warning]);
    }
    reloadApp = nextSeqNoStr();
    onReloadApp(callback) {
        this.on(this.reloadApp, callback);
    }
    emitReloadApp() {
        return this.emit(this.reloadApp, []);
    }
    bindClickClicked = nextSeqNoStr();
    onBindClickClicked(callback, key) {
        this.on(this.bindClickClicked, (e) => {
            return new Promise((r) => {
                callback(e);
                r();
            });
        }, key);
    }
    emitBindClickClicked(e, key) {
        return this.emit(this.bindClickClicked, [e], key);
    }
    offBindClickClicked(key) {
        this.off(this.bindClickClicked, key);
    }
    bindClickSendLog = nextSeqNoStr();
    onBindClickSendLog(callback, key) {
        this.on(this.bindClickSendLog, (e) => {
            return Promise.resolve().then(() => {
                callback(e);
            });
        }, key);
    }
    emitBindClickSendLog(e, key) {
        return this.emit(this.bindClickSendLog, [e], key);
    }
    offBindClickSendLog(key) {
        this.off(this.bindClickSendLog, key);
    }
}
