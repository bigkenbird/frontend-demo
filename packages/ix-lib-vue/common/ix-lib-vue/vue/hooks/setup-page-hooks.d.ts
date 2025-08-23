import { IPage } from '../use/use-page';
export interface IPageHooks {
    viewInit?: () => void;
    destroy?: () => void;
    leave?: () => boolean | Promise<boolean>;
    reuse?: (page: any) => void;
    pause?: () => void;
    resume?: () => void;
}
export declare function setupPageHooks(hooks: IPageHooks, page: IPage): void;
