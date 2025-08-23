import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doGetJSON(resource: string, params: IData, success?: (jsonData: IData) => void, failure?: (status: IStatus) => void, timeout?: number, noCache?: boolean): Promise<[IStatus, IData]>;
