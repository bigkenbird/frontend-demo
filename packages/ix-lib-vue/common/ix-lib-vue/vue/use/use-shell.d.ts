import { App, Ref } from 'vue';
import { ILogger } from './use-logger';
import { IPage } from './use-page';
export interface IUseShellOptions {
    defineRuntimeSettings?: () => void;
    logger?: ILogger;
    initUrlRoot?: () => string;
    initPageRootElement: Ref<HTMLElement>;
    pageScrollingElement: Ref<HTMLElement>;
    defineGlobalDirective?: ($app: App) => void;
    defineGlobalComponent?: ($app: App) => void;
}
export interface IShell {
    viewInit: () => void;
    destroy: () => void;
    error: (err: Error) => void;
    pause: () => void;
    resume: () => void;
    orientationchange: (orientation: number) => void;
    resize: () => void;
    scroll: (scrollTop: number) => void;
    bootstrap: (data: [string, Record<string, string>]) => void | Promise<void>;
    pageDidChange: (page: IPage) => void;
    logger: ILogger;
}
export declare function useShell(useOptions: IUseShellOptions): IShell;
