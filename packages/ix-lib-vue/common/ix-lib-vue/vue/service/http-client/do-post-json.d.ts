import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doPostJSON(resource: string, data: IData, success?: (jsonData: IData) => void, failure?: (status: IStatus) => void, timeout?: number, headers?: {}): Promise<[IStatus, IData]>;
