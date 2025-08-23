import { IStatus } from '../vue-interface';
import { BaseService } from './base-service';
export declare class EventBusService extends BaseService {
    protected serviceName: string;
    private eventBus;
    on(name: string, event: (...args: any[]) => Promise<any>, key?: string): void;
    once(name: string, event: (...args: any[]) => Promise<any>, key?: string): void;
    off(name: string, key?: string): void;
    emit(name: string, data: any[], key?: string, matchPrefix?: boolean): Promise<any>;
    private logout;
    onLogout(callback: (warning?: boolean) => void): void;
    emitLogout(warning?: boolean): Promise<[IStatus, null]>;
    private reloadApp;
    onReloadApp(callback: () => Promise<void>): void;
    emitReloadApp(): Promise<[null, null]>;
    private bindClickClicked;
    onBindClickClicked(callback: (e: MouseEvent) => void, key?: string): void;
    emitBindClickClicked(e: MouseEvent, key?: string): Promise<[null, null]>;
    offBindClickClicked(key?: string): void;
    private bindClickSendLog;
    onBindClickSendLog(callback: (e: MouseEvent) => void, key?: string): void;
    emitBindClickSendLog(e: MouseEvent, key?: string): Promise<[null, null]>;
    offBindClickSendLog(key?: string): void;
}
