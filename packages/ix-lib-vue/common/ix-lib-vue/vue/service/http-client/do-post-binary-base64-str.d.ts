import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doPostBinaryBase64Str(resource: string, data: IData, success?: (base64Str: string, fileName: string) => void, failure?: (status: IStatus) => void, timeout?: number, fileName?: string, headers?: {}): Promise<[IStatus, [string, string]]>;
