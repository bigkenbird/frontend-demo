import { IAction } from '../../base-interface';
/**
 * 控制target元素以下(含target本身)的a.href點擊
 *
 * @param target - 要開始handle的父層元素
 */
export declare function handleAHrefClick(target: HTMLElement, callback: (action: IAction, href: string) => void): void;
