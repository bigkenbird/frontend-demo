import { IData } from '@twix/ix-lib-base';
import { AppBaseService } from '../service/app-base.service';
import { IForm } from './use-form';
import { ILogger } from './use-logger';
export interface IUsePageOptions {
    form?: IForm;
    hideLoadingWhenInit?: boolean;
    saveScrollPosition?: boolean;
}
export interface IPage extends IUseTxnData {
    viewInit: () => void;
    destroy: () => void;
    reuse: (page: IPage) => void;
    name: string;
    id: string;
    URL_ROOT: string;
    routePath: string;
    previousRoutePath: string;
    form: IForm;
    rootElement: HTMLElement;
    hideLoadingWhenInit: boolean;
    data: IData;
    logger: ILogger;
    app: AppBaseService;
    setScrollPosition: (val: number) => void;
    isActivePage: () => boolean;
}
export declare function usePage(useOptions: IUsePageOptions): IPage;
interface IUseTxnData {
    getTxnData: () => IData;
    setTxnData: (data: IData) => void;
    setTxnDataReplace: (data: IData) => void;
}
export {};
