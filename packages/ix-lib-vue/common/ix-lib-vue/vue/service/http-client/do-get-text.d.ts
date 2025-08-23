import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doGetText(resource: string, params: IData, success?: (text: string) => void, failure?: (status: IStatus) => void, timeout?: number, noCache?: boolean): Promise<[IStatus, string]>;
