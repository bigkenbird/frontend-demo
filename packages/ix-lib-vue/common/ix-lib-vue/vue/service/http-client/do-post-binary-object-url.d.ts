import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doPostBinaryObjectURL(resource: string, data: IData, success?: (objectURL: string, fileName: string, revoke: () => void) => void, failure?: (status: IStatus) => void, timeout?: number, fileName?: string, headers?: {}): Promise<[IStatus, [string, string, () => void]]>;
