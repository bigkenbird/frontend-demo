import { BaseService } from './base-service';
export declare class TimerService extends BaseService {
    protected serviceName: string;
    private pageTimer;
    private logoutTimer;
    private popupTimer;
    cancelTimerWhenPageChanged(): void;
    newPageTimer(seconds: number, callback: (countdownSec: number) => void): void;
    startPageTimer(): void;
    stopPageTimer(): void;
    cancelPageTimer(): void;
    resetPageTimer(): void;
    newLogoutTimer(seconds: number, callback: (countdownSec: number) => void): void;
    startLogoutTimer(): void;
    stopLogoutTimer(): void;
    cancelLogoutTimer(): void;
    resetLogoutTimer(): void;
    newPopupTimer(seconds: number, callback: (countdownSec: number) => void): void;
    startPopupTimer(): void;
    stopPopupTimer(): void;
    cancelPopupTimer(): void;
    resetPopupTimer(): void;
}
