import { ILogger } from '../use/use-logger';
export interface IComponentHooks {
    viewInit?: () => void;
    destroy?: () => void;
}
export declare function setupComponentHooks(hooks: IComponentHooks, logger?: ILogger): void;
