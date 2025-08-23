import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doGetBinary(resource: string, params: IData, success?: (blob: Blob, fileName: string) => void, failure?: (status: IStatus) => void, timeout?: number, noCache?: boolean): Promise<[IStatus, [Blob, string]]>;
