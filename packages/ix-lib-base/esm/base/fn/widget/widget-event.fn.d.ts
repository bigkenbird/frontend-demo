import { IBaseWidgetInitInfo, IData } from '../../base-interface';
export declare function emitWidgetEvent(id: string, event: string, data: any): void;
export declare function addWidgetEventListener(id: string, event: string, callback: (data: any) => void): void;
export declare function removeWidgetEventListener(id: string, event: string): void;
export declare function removeWidgetAllEventListener(id: string): void;
export declare function widgetInit(element: HTMLElement, initConfig: IData, callback?: (info: IBaseWidgetInitInfo) => void): void;
