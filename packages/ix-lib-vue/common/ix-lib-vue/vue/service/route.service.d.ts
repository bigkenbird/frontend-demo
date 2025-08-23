import { IData } from '@twix/ix-lib-base';
import { Router } from 'vue-router';
import { ILogger } from '../use/use-logger';
export interface IRouteService {
    getRouter(): Router;
    getRoutePath(): string;
    taskNoToRouteUrl(taskNo: string, hasPageId?: boolean): string;
    routeUrlToTaskNo(routeUrl: string, hasPageId?: boolean): string;
    doNavigate(routeUrl: string, queryParams: IData, skipLocationChange?: boolean, replaceUrl?: boolean, count?: number, countMaxFailure?: () => void, success?: () => void): Promise<void>;
}
export declare function RouteService(logger?: ILogger): IRouteService;
