import { IData } from '@twix/ix-lib-base';
import { ILogger } from '../use/use-logger';
export interface IPageActivateGuardAction {
    pass: () => void;
    reject: () => void;
    getData: () => IData;
    updateData(data: IData): void;
    logger: ILogger;
}
export declare function definePageActivateGuard(activate?: (action: IPageActivateGuardAction) => void | Promise<void>): (to: IData, from: IData) => boolean | Promise<boolean>;
