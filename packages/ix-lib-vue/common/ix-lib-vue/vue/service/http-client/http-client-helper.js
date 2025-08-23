import { useStatusService } from '../../use/use-injector';
import { useLogger } from '../../use/use-logger';
const logger = useLogger('http-client');
export function useHttpClientLogger() {
    return logger;
}
export function addNoCacheRequestHeaders(headers) {
    return {
        ...headers,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
    };
}
export function axiosResponseErrorToStatus(error) {
    const status = useStatusService();
    if (error.message && error.message.startsWith('timeout')) {
        return status.getClientStatus(status.clientCode.APP1003);
    }
    else if (error.response) {
        return status.responseErrorToStatus({
            status: error.response.status,
            statusText: error.response.statusText
        });
    }
    else {
        return status.getClientStatus(status.clientCode.APP1008);
    }
}
export function blobToBase64Str(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            resolve([null, reader.result]);
        };
        reader.onerror = () => {
            const status = useStatusService();
            resolve([status.getClientStatus(status.clientCode.APP1009), null]);
        };
    });
}
export function blobToObjectURL(blob) {
    let objectURL = window.URL.createObjectURL(blob);
    const revoke = () => {
        window.URL.revokeObjectURL(objectURL);
        objectURL = null;
    };
    setTimeout(() => {
        if (objectURL != null) {
            revoke();
        }
    }, 1000);
    return {
        objectURL,
        revoke
    };
}
