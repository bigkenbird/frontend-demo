import { IData, IEditableData } from './base-interface';
/**
 * form 基礎父類
 */
export declare abstract class BaseForm {
    protected validateValues: (data: IData) => void;
    /**
     * 欄位錯誤Highlight樣式
     */
    abstract ERROR_CSS: string;
    /**
     * 欄位Disalbe樣式
     */
    abstract DISABLED_CSS: string;
    /**
     * 表單欄位值
     */
    values: IEditableData;
    /**
     * 表單欄位錯誤文字
     */
    errors: IEditableData;
    /**
     * 表單欄位disable值
     */
    disables: IEditableData;
    /**
     * 表單根元素，並非一定是<form>，而是包含所有要控制欄位的父層元素即可
     */
    protected formRootElement: HTMLElement;
    /**
     * 可捲動form內容的捲動元素
     */
    protected scrollingElement: HTMLElement;
    /**
     * constructor
     */
    constructor(values: IEditableData, disables: IEditableData, validateValues: (data: IData) => void, formRootElement?: HTMLElement, scrollingElement?: HTMLElement);
    /**
     * 表單欄位值是否通過檢核
     */
    isFormValid(): boolean;
    /**
     * 取得表單欄位值
     */
    getValue(key: string): string;
    /**
     * 設定表單欄位值
     */
    setValue(key: string, val: unknown): void;
    /**
     * 清除表單欄位值
     */
    clearValue(key: string): void;
    /**
     * 清除表單所有欄位值
     */
    clearValues(): void;
    /**
     * 是否有表單欄位錯誤
     */
    hasError(key: string): boolean;
    /**
     * 是否有表單欄位錯誤
     */
    hasErrors(): boolean;
    /**
     * 取得表單欄位錯誤文字
     */
    getError(key: string): string;
    /**
     * 設定表單欄位錯誤文字
     */
    setError(key: string, msg: string): void;
    /**
     * 設定表單所有欄位錯誤文字 & 綁定clearErrorWhenFocus
     * @param errors
     */
    setErrorsAndBindFocus(errors: IData): void;
    /**
     * 清除表單欄位錯誤文字
     */
    clearError(key: string): void;
    /**
     * 清除所有表單欄位錯誤文字
     */
    clearErrors(): void;
    /**
     * 表單欄位是否disable
     */
    isDisable(key: string): boolean;
    /**
     * 設定表單欄位disable值
     */
    setDisable(key: string, disable: boolean): void;
    /**
     * 清除表單欄位disable值
     */
    clearDisable(key: string): void;
    /**
     * 預設表單根元素
     */
    protected abstract initDefaultFormRootElement(): HTMLElement;
    /**
     * 錯誤時的捲動元素
     */
    protected abstract initDefaultScrollingElement(): HTMLElement;
    /**
     * scroll到第一個錯誤
     */
    scrollToFirstError(): void;
    /**
     * 表單欄位focus時清除欄位錯誤
     */
    protected abstract clearErrorWhenFocus(): void;
}
