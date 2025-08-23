import { doGetBinary } from './do-get-binary';
import { blobToBase64Str } from './http-client-helper';
export async function doGetBinaryBase64Str(resource, params, success, failure, timeout = 10000, noCache = false) {
    const result = await doGetBinary(resource, params, null, null, timeout, noCache);
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
