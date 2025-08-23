import { doGetBinary } from './do-get-binary';
import { blobToObjectURL } from './http-client-helper';
export async function doGetBinaryObjectURL(resource, params, success, failure, timeout = 10000, noCache = false) {
    const result = await doGetBinary(resource, params, null, null, timeout, noCache);
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
