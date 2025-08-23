import { IData, IHistoryItem } from '@twix/ix-lib-base';
export interface INgEnvironment {
    readonly production: boolean;
    readonly run_independent: boolean;
    readonly run_serve: boolean;
}
export interface ITxnTask {
    readonly key?: string;
    readonly name: string;
}
export interface IHistoryTrackData {
    inited: boolean;
    readonly pagePk: string;
    readonly routePath: string;
    readonly data: IData;
    rsData: IData;
}
export interface IStatus {
    meta: {
        returnSys?: string;
        status: {
            systemIxd?: string;
            errorCode?: string = "";
            errorDesc?: string;
            serverity?: string;
            errorParamList?: Array<string>;
            displayMessage?: string;
        }
    }
}
export interface INavigateData {
    readonly routePath: string;
    readonly data: {
        [key: string]: string;
    };
    readonly ignorePageHistory?: boolean;
    readonly previousTrack?: IHistoryItem;
    readonly isChangeTxn: boolean;
    readonly sameRoutePath: boolean;
}
export interface IPopupClose {
    (close: () => void): void;
}
export interface IValueChangesData {
    currentValue: any;
    previousValue: any;
    firstChange: boolean;
}
export interface IModalComponent {
    hide: () => void;
    canAutoHideWhenPageWillChange: () => boolean;
}
