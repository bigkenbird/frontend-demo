/**
 * 處理大寫鎖定
 *
 * @param target 指定的DOM
 * @param callback 鍵盤輸入會觸發，注意：是每個輸入都會觸發，要小心效能
 * @returns
 */
export declare function handleCapsLock(target: HTMLElement, callback: (capsLock: boolean) => void): void;
