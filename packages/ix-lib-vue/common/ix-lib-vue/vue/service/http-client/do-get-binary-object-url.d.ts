import { IData } from '@twix/ix-lib-base';
import { IStatus } from '../../vue-interface';
export declare function doGetBinaryObjectURL(resource: string, params: IData, success?: (objectURL: string, fileName: string, revoke: () => void) => void, failure?: (status: IStatus) => void, timeout?: number, noCache?: boolean): Promise<[IStatus, [string, string, () => void]]>;
