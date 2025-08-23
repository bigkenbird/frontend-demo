import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doGetBinaryBase64Str(resource: string, params: IData, success?: (base64Str: string, fileName: string) => void, failure?: (status: IStatus) => void, timeout?: number, noCache?: boolean): Promise<[IStatus, [string, string]]>;
