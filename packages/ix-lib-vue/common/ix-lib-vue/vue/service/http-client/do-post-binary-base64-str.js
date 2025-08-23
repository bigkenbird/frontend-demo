import { doPostBinary } from './do-post-binary';
import { blobToBase64Str } from './http-client-helper';
export async function doPostBinaryBase64Str(resource, data, success, failure, timeout = 10000, fileName, headers = {}) {
    const result = await doPostBinary(resource, data, null, null, timeout, fileName, headers);
    if (result[0]) {
        if (failure)
            failure(result[0]);
        return [result[0], null];
    }
    const result64 = await blobToBase64Str(result[1][0]);
    if (result64[0]) {
        return [result64[0], null];
    }
    if (success)
        success(result64[1], result[1][1]);
    return [null, [result64[1], result[1][1]]];
}
