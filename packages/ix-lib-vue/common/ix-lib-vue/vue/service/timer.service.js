import { Timer } from '@twix/ix-lib-base';
import { BaseService } from './base-service';
export class TimerService extends BaseService {
    serviceName = 'TimerService';
    pageTimer;
    logoutTimer;
    popupTimer;
    cancelTimerWhenPageChanged() {
        this.cancelPopupTimer();
        this.cancelPageTimer();
    }
    newPageTimer(seconds, callback) {
        this.cancelPageTimer();
        this.pageTimer = new Timer(seconds, callback);
        this.startPageTimer();
    }
    startPageTimer() {
        if (this.pageTimer)
            this.pageTimer.start();
    }
    stopPageTimer() {
        if (this.pageTimer)
            this.pageTimer.stop();
    }
    cancelPageTimer() {
        if (this.pageTimer)
            this.pageTimer.cancel();
        this.pageTimer = null;
    }
    resetPageTimer() {
        if (this.pageTimer)
            this.pageTimer.reset();
    }
    newLogoutTimer(seconds, callback) {
        this.cancelLogoutTimer();
        this.logoutTimer = new Timer(seconds, callback);
        this.startLogoutTimer();
    }
    startLogoutTimer() {
        if (this.logoutTimer)
            this.logoutTimer.start();
    }
    stopLogoutTimer() {
        if (this.logoutTimer)
            this.logoutTimer.stop();
    }
    cancelLogoutTimer() {
        if (this.logoutTimer)
            this.logoutTimer.cancel();
        this.logoutTimer = null;
    }
    resetLogoutTimer() {
        if (this.logoutTimer)
            this.logoutTimer.reset();
    }
    newPopupTimer(seconds, callback) {
        this.cancelPopupTimer();
        this.popupTimer = new Timer(seconds, callback);
        this.startPopupTimer();
    }
    startPopupTimer() {
        if (this.popupTimer)
            this.popupTimer.start();
    }
    stopPopupTimer() {
        if (this.popupTimer)
            this.popupTimer.stop();
    }
    cancelPopupTimer() {
        if (this.popupTimer)
            this.popupTimer.cancel();
        this.popupTimer = null;
    }
    resetPopupTimer() {
        if (this.popupTimer)
            this.popupTimer.reset();
    }
}
