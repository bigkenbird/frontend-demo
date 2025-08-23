import { BaseService } from './base-service';
export class ViewService extends BaseService {
    serviceName = 'ViewService';
    wrapClose(r, rVal, fn) {
        if (fn) {
            return (close) => {
                new Promise((r) => {
                    fn(r);
                }).then(() => {
                    close();
                    r(rVal);
                });
            };
        }
        else {
            return (close) => {
                close();
                r(rVal);
            };
        }
    }
}
