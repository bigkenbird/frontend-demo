import { simpleAwait } from '@twix/ix-lib-base';
import axios from 'axios';
import { addNoCacheRequestHeaders, axiosResponseErrorToStatus, useHttpClientLogger } from './http-client-helper';
const { info, error } = useHttpClientLogger();
export async function doGetBinary(resource, params, success, failure, timeout = 10000, noCache = false) {
    const httpClient = axios(resource, {
        method: 'get',
        headers: noCache ? addNoCacheRequestHeaders({}) : {},
        params,
        responseType: 'arraybuffer',
        timeout
    });
    const result = await simpleAwait(httpClient);
    const err = result[0];
    if (err) {
        error('doGetBinary() Catch Error:', err, 'resource:', resource);
        const status = axiosResponseErrorToStatus(err);
        if (failure)
            failure(status);
        return [status, null];
    }
    const fileName = getFileName(resource);
    const blob = new Blob([result[1].data], { type: 'application/octet-stream' });
    info('doGetBinary() success, fileName:', fileName, 'size:', blob.size, 'bytes');
    if (success)
        success(blob, fileName);
    return [null, [blob, fileName]];
}
function getFileName(resource) {
    return resource.substring(resource.lastIndexOf('/') + 1);
}
