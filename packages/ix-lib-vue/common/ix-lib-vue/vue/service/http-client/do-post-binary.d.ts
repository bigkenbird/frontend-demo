import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doPostBinary(resource: string, data: IData, success?: (blob: Blob, fileName: string) => void, failure?: (status: IStatus) => void, timeout?: number, fileName?: string, headers?: {}): Promise<[IStatus, [Blob, string]]>;
