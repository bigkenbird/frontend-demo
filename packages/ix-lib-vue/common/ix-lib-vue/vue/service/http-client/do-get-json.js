import { useStatusService } from '../../use/use-injector';
import { doGetText } from './do-get-text';
import { useHttpClientLogger } from './http-client-helper';
const { error } = useHttpClientLogger();
export async function doGetJSON(resource, params, success, failure, timeout = 6000, noCache = false) {
    const result = await doGetText(resource, params, null, null, timeout, noCache);
    let errStatus = result[0];
    if (errStatus) {
        if (failure)
            failure(errStatus);
        return [errStatus, null];
    }
    let json = null;
    try {
        json = JSON.parse(result[1]);
    }
    catch (err) {
        error('doGetJSON() Catch Parse Error:', err, 'resource:', resource);
    }
    if (json) {
        if (success)
            success(json);
        return [null, json];
    }
    const status = useStatusService();
    errStatus = status.getClientStatus(status.clientCode.APP1007);
    if (failure)
        failure(errStatus);
    return [errStatus, null];
}
