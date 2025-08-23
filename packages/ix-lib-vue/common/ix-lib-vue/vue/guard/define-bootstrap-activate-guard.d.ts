import { IData } from '@twix/ix-lib-base';
export interface IUseBootstrapActivateGuardOptions {
    parseUrl: (startUrl: string) => [string, IData];
}
export declare function defineBootstrapActivateGuard(useOptions?: IUseBootstrapActivateGuardOptions): (to: IData, from: IData) => Promise<boolean>;
