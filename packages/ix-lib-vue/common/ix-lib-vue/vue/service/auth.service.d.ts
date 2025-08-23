import { IData } from '@twix/ix-lib-base';
import { IVueConfig } from '../vue-config';
import { IStatus } from '../vue-interface';
import { InvokeService } from './invoke.service';
import { NavigationService } from './navigation.service';
import { IRouteService } from './route.service';
import { SharedDataService } from './shared-data.service';
import { ViewService } from './view.service';
import { BaseService } from './base-service';
export declare class AuthService extends BaseService {
    protected serviceName: string;
    protected get navigation(): NavigationService;
    protected get route(): IRouteService;
    protected get config(): IVueConfig;
    protected get view(): ViewService;
    protected get sharedData(): SharedDataService;
    protected get invoke(): InvokeService;
    doLogin(): void;
    doLoginSuccess(data: IData, cancelDefaultChangeTxn: boolean): Promise<void>;
    protected saveDataWhenLoginSuccess(data: IData): void;
    doLogout(): Promise<IStatus>;
    protected clearDataWhenLogoutSuccess(): void;
}
