import { useStatusService } from '../../use/use-injector';
import { doPostText } from './do-post-text';
import { useHttpClientLogger } from './http-client-helper';
const { error } = useHttpClientLogger();
export async function doPostJSON(resource, data, success, failure, timeout = 6000, headers = {}) {
    const result = await doPostText(resource, data, null, null, timeout, headers);
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
        error('doPostJSON() Catch Parse Error:', err, 'resource:', resource);
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
