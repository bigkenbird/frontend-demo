import { ILogger } from '../use/use-logger';
export interface IShellHooks {
    viewInit?: () => void;
    destroy?: () => void;
    error?: (err: Error) => void;
    pause?: () => void;
    resume?: () => void;
    orientationchange?: (orientation: number) => void;
    resize?: () => void;
    scroll?: (scrollTop: number) => void;
    bootstrap?: (data: [string, Record<string, string>]) => void | Promise<void>;
    pageDidChange?: (page: any) => void;
}
export declare function setupShellHooks(hooks: IShellHooks, logger?: ILogger): void;
