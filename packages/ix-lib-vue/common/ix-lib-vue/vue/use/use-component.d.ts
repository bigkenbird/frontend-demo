import { Ref } from 'vue';
import { ILogger } from './use-logger';
export interface IUseComponentOptions {
    name: string;
    rootElementRef: Ref<HTMLElement>;
    pageId?: string;
    logger?: ILogger;
}
export interface IComponent {
    id: string;
    name: string;
    logger: ILogger;
    rootElementRef?: Ref<HTMLElement>;
    viewInit: () => void;
    destroy: () => void;
}
export declare function useComponent(useOptions: IUseComponentOptions): IComponent;
