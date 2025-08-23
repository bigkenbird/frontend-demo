import { IAction } from '../../base-interface';
/**
 * preventDefault
 *
 * @param e
 */
export declare function preventDefault(e: Event | null): void;
/**
 * stopPropagation
 *
 * @param e
 */
export declare function stopPropagation(e: Event | null): void;
/**
 * 終止click預設行為
 *
 * <ul>
 * <li>預防Bubble事件</li>
 * <li>阻擋事件被連點</li>
 * </ul>
 *
 * @param e 事件
 * @param callback
 * @param bindClickElement 綁定click的元素,綁定與真正觸發會有差異,註記的位置會有差異
 * @param pageBlock
 * @returns
 */
export declare function preventClick(e: Event | null, callback: (action: IAction) => void, bindClickElement: HTMLElement, pageBlock?: boolean, sendLog?: (e: MouseEvent) => void): boolean;
