import { isBlank, simpleAwait } from '@twix/ix-lib-base';
import axios from 'axios';
import { addNoCacheRequestHeaders, axiosResponseErrorToStatus, useHttpClientLogger } from './http-client-helper';
const { info, error } = useHttpClientLogger();
export async function doPostBinary(resource, data, success, failure, timeout = 10000, fileName, headers = {}) {
    const httpClient = axios(resource, {
        method: 'post',
        headers: addNoCacheRequestHeaders(headers),
        data,
        responseType: 'arraybuffer',
        timeout
    });
    const result = await simpleAwait(httpClient);
    const err = result[0];
    if (err) {
        error('doPostBinary() Catch Error:', err, 'resource:', resource);
        const status = axiosResponseErrorToStatus(err);
        if (failure)
            failure(status);
        return [status, null];
    }
    const responseFileName = getFileNameFromResponseHeader(result[1].headers);
    if (!isBlank(responseFileName))
        fileName = responseFileName;
    if (isBlank(fileName))
        fileName = getFileName(resource);
    const blob = new Blob([result[1].data], { type: 'application/octet-stream' });
    info('doPostBinary() success, fileName:', fileName, 'size:', blob.size, 'bytes');
    if (success)
        success(blob, fileName);
    return [null, [blob, fileName]];
}
function getFileName(resource) {
    return resource.substring(resource.lastIndexOf('/') + 1);
}
function getFileNameFromResponseHeader(headers) {
    if (headers != null) {
        const attachment = headers['content-disposition'];
        if (!isBlank(attachment)) {
            const tokens = attachment.split(';');
            const len = tokens.length;
            for (let i = 0; i < len; i++) {
                if (tokens[i].startsWith('filename=')) {
                    return decodeURI(tokens[i].substring(9));
                }
            }
        }
    }
    return null;
}
