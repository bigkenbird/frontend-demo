import { doPostBinary } from './do-post-binary';
import { blobToObjectURL } from './http-client-helper';
export async function doPostBinaryObjectURL(resource, data, success, failure, timeout = 10000, fileName, headers = {}) {
    const result = await doPostBinary(resource, data, null, null, timeout, fileName, headers);
    if (result[0]) {
        if (failure)
            failure(result[0]);
        return [result[0], null];
    }
    const { objectURL, revoke } = blobToObjectURL(result[1][0]);
    if (success)
        success(objectURL, result[1][1], revoke);
    return [null, [objectURL, result[1][1], revoke]];
}
