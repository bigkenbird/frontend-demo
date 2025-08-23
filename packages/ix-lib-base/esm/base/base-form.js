import { devWarning } from './fn/dev/dev-logger-warning.fn';
import { scrollToFirstError } from './fn/scroll/scroll-to-first-error.fn';
import { isBlank } from './fn/validator/is-blank.fn';
import { isString } from './fn/validator/is-string.fn';
/**
 * form 基礎父類
 */
export class BaseForm {
    validateValues;
    /**
     * 表單欄位值
     */
    values = {};
    /**
     * 表單欄位錯誤文字
     */
    errors = {};
    /**
     * 表單欄位disable值
     */
    disables = {};
    /**
     * 表單根元素，並非一定是<form>，而是包含所有要控制欄位的父層元素即可
     */
    formRootElement;
    /**
     * 可捲動form內容的捲動元素
     */
    scrollingElement;
    /**
     * constructor
     */
    constructor(values, disables, validateValues, formRootElement, scrollingElement) {
        this.validateValues = validateValues;
        // 表單欄位值
        if (values != null)
            this.values = values;
        // 表單欄位disable值
        if (disables != null)
            this.disables = disables;
        // form的根元素
        if (formRootElement) {
            this.formRootElement = formRootElement;
        }
        else {
            this.formRootElement = this.initDefaultFormRootElement();
        }
        // 錯誤時的捲動元素
        if (scrollingElement) {
            this.scrollingElement = scrollingElement;
        }
        else {
            this.scrollingElement = this.initDefaultScrollingElement();
        }
    }
    /**
     * 表單欄位值是否通過檢核
     */
    isFormValid() {
        // 在每次formValid()時綁定，可避免後續動態產生的element沒有綁上清除行為，要注意會重覆綁定的控制
        this.clearErrorWhenFocus();
        // 先清除已存在的錯誤訊息
        this.clearErrors();
        // trim前後空白字元後再檢核是否非空值
        Object.keys(this.values).forEach((key) => {
            if (!isBlank(key)) {
                const val = this.values[key];
                if (isString(val)) {
                    this.values[key] = val.trim();
                }
            }
        });
        // 呼叫驗證
        if (this.validateValues) {
            this.validateValues(this.values);
        }
        else {
            // 防呆警告
            devWarning('表單未設定驗證方法');
            return false;
        }
        // 錯誤時捲動到第一個錯誤訊息位置
        if (this.hasErrors()) {
            this.scrollToFirstError();
            return false;
        }
        return true;
    }
    /**
     * 取得表單欄位值
     */
    getValue(key) {
        return this.values[key];
    }
    /**
     * 設定表單欄位值
     */
    setValue(key, val) {
        this.values[key] = val;
    }
    /**
     * 清除表單欄位值
     */
    clearValue(key) {
        delete this.values[key];
    }
    /**
     * 清除表單所有欄位值
     */
    clearValues() {
        this.values = {};
    }
    /**
     * 是否有表單欄位錯誤
     */
    hasError(key) {
        // 有欄位即使空字串也算有錯誤
        return this.errors[key] != null;
    }
    /**
     * 是否有表單欄位錯誤
     */
    hasErrors() {
        for (const key in this.errors) {
            if (this.hasError(key))
                return true;
        }
        return false;
    }
    /**
     * 取得表單欄位錯誤文字
     */
    getError(key) {
        if (this.hasError(key)) {
            const error = this.errors[key];
            if (error != null) {
                return error;
            }
        }
        return '';
    }
    /**
     * 設定表單欄位錯誤文字
     */
    setError(key, msg) {
        this.errors[key] = msg;
    }
    /**
     * 設定表單所有欄位錯誤文字 & 綁定clearErrorWhenFocus
     * @param errors
     */
    setErrorsAndBindFocus(errors) {
        this.errors = errors;
        this.clearErrorWhenFocus();
    }
    /**
     * 清除表單欄位錯誤文字
     */
    clearError(key) {
        delete this.errors[key];
    }
    /**
     * 清除所有表單欄位錯誤文字
     */
    clearErrors() {
        this.errors = {};
    }
    /**
     * 表單欄位是否disable
     */
    isDisable(key) {
        // 值一定要是boolean，否則當false處理
        if (this.disables[key] != null && typeof this.disables[key] === 'boolean') {
            return this.disables[key];
        }
        return false;
    }
    /**
     * 設定表單欄位disable值
     */
    setDisable(key, disable) {
        this.disables[key] = disable;
    }
    /**
     * 清除表單欄位disable值
     */
    clearDisable(key) {
        delete this.disables[key];
    }
    /**
     * scroll到第一個錯誤
     */
    scrollToFirstError() {
        if (this.ERROR_CSS) {
            scrollToFirstError(`.${this.ERROR_CSS}`, this.formRootElement, this.scrollingElement);
        }
    }
}
