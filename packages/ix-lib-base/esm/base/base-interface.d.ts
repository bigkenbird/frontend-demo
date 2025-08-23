/**
 * 集合資料
 */
export interface IData {
    readonly [key: string]: any;
}
/**
 * 可編輯集合資料
 */
export interface IEditableData {
    [key: string]: any;
}
/**
 * 事件動作介面
 */
export interface IAction {
    readonly done: (param?: any) => void;
    readonly reject?: (value?: any) => void;
    readonly e?: Event;
    readonly index?: number;
    readonly page?: number;
}
/**
 * 版本號介面
 */
export interface ISemanticVersion {
    readonly major: number;
    readonly minor: number;
    readonly bugfix: number;
}
/**
 * 環境資訊介面
 */
export interface IEnvInfo {
    readonly mobile: boolean;
    readonly desktop: boolean;
    readonly safari_mobile: boolean;
    readonly safari_desktop: boolean;
    readonly chrome_ios: boolean;
    readonly chrome: boolean;
    readonly firefox: boolean;
    readonly ie: boolean;
    readonly edge: boolean;
    readonly edge_ios: boolean;
    readonly ipad: boolean;
    readonly iphone: boolean;
    readonly android: boolean;
    readonly ios: boolean;
    readonly macos: boolean;
    readonly windows: boolean;
    readonly unixlike: boolean;
    readonly browser_ver_string: string;
    readonly browser_ver: number;
    readonly browser_id: string;
    readonly os_ver: ISemanticVersion;
    readonly os_ver_categories: number[];
    readonly os_ver_str: string;
    readonly os_id: string;
    readonly inappbrowser: boolean;
}
/**
 * Widget Init Data
 */
export interface IBaseWidgetInitInfo {
    readonly id: string;
    readonly name: string;
}
