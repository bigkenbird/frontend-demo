import { IData, IEditableData } from '@twix/ix-lib-base';
export interface IForm {
    ERROR_CSS: string;
    DISABLED_CSS: string;
    values: IData;
    errors: IEditableData;
    disables: IData;
    getValue: (key: string) => boolean;
    setValue: (key: string, val: any) => boolean;
    clearValue: (key: string) => boolean;
    clearValues: () => void;
    hasError: (key: string) => boolean;
    hasErrors: () => boolean;
    getError: (key: string) => string;
    setError: (key: string, val: string) => boolean;
    setErrorsAndBindFocus: (errors: IData) => void;
    clearError: (key: string) => boolean;
    clearErrors: () => void;
    isDisable: (key: string) => boolean;
    setDisable: (key: string, val: boolean) => boolean;
    clearDisable: (key: string) => boolean;
    clearErrorWhenFocus: () => void;
    scrollToFirstError: () => void;
    isFormValid: () => boolean;
}
export declare function useForm(values: IData, disables: IData, validateValues: (data: IData) => void, formRootElement?: HTMLElement, scrollingElement?: HTMLElement, ERROR_CSS?: string, DISABLED_CSS?: string): IForm;
