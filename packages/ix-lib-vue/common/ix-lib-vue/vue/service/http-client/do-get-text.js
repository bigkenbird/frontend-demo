import { simpleAwait } from '@twix/ix-lib-base';
import axios from 'axios';
import { addNoCacheRequestHeaders, axiosResponseErrorToStatus, useHttpClientLogger } from './http-client-helper';
const { info, error } = useHttpClientLogger();
export async function doGetText(resource, params, success, failure, timeout = 6000, noCache = false) {
    const httpClient = axios(resource, {
        method: 'get',
        headers: noCache ? addNoCacheRequestHeaders({}) : {},
        params,
        responseType: 'text',
        timeout
    });
    const result = await simpleAwait(httpClient);
    const err = result[0];
    if (err) {
        error('doGetText() Catch Error:', err, 'resource:', resource);
        const status = axiosResponseErrorToStatus(err);
        if (failure)
            failure(status);
        return [status, null];
    }
    const text = result[1].data;
    info('doGetText() success, response.data:', text);
    if (success)
        success(text);
    return [null, text];
}
