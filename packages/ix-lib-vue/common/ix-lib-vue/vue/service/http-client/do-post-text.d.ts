import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doPostText(resource: string, data: IData, success?: (text: string) => void, failure?: (status: IStatus) => void, timeout?: number, headers?: {}): Promise<[IStatus, string]>;
