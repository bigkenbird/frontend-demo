import { IAction, IData } from '@twix/ix-lib-base';
export interface IUseAuthActivateGuardOptions {
    activate?: (action: IAction) => void | Promise<void>;
}
export declare function defineAuthActivateGuard(useOptions?: IUseAuthActivateGuardOptions): (to: IData, from: IData) => boolean | Promise<boolean>;
