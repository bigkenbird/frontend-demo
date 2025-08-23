import { IData } from '@twix/ix-lib-base';
import { ILogger } from '../../use/use-logger';
import { IStatus } from '../../vue-interface';
export declare function useHttpClientLogger(): ILogger;
export declare function addNoCacheRequestHeaders(headers: IData): IData;
export declare function axiosResponseErrorToStatus(error: IData): IStatus;
export declare function blobToBase64Str(blob: Blob): Promise<[IStatus, string]>;
export declare function blobToObjectURL(blob: Blob): {
    objectURL: string;
    revoke: () => void;
};
