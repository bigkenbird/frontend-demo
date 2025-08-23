import { debug, simpleAwait } from '@twix/ix-lib-base';
import axios from 'axios';
import {
  addNoCacheRequestHeaders,
  axiosResponseErrorToStatus,
  useHttpClientLogger,
} from './http-client-helper';
const { info, error } = useHttpClientLogger();
export async function doPostText(
  resource,
  data,
  success,
  failure,
  timeout = 6000,
  headers = {}
) {
  const httpClient = axios(resource, {
    method: 'post',
    headers: addNoCacheRequestHeaders(headers),
    data,
    responseType: 'text',
    timeout,
  });
  const result = await simpleAwait(httpClient);

  const err = result[0];
  if (err) {
    error('doPostText() Catch Error:', err, 'resource:', resource);
    const status = axiosResponseErrorToStatus(err);
    if (failure) failure(status);
    return [status, null];
  }
  const text = result[1].data;
  info('doPostText() success, response.data:', text);
  if (success) success(text);
  return [null, text];
}
