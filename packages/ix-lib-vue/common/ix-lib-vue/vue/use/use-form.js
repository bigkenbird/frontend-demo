import { defaultString, devWarning, handleEventListener, isBlank, isString, scrollToFirstError as _scrollToFirstError } from '@twix/ix-lib-base';
import { reactive } from 'vue';
import { useSharedDataService } from '../use/use-injector';
export function useForm(values, disables, validateValues, formRootElement, scrollingElement, ERROR_CSS = '', DISABLED_CSS = '') {
    const valuesReactive = reactive(values);
    const errorsReactive = reactive({});
    const disablesReactive = reactive(disables);
    const sharedData = useSharedDataService();
    if (!formRootElement) {
        formRootElement = sharedData.getPageRootElement();
    }
    if (!scrollingElement) {
        scrollingElement = sharedData.getScrollingElement();
    }
    function getValue(key) {
        return Reflect.get(valuesReactive, key);
    }
    function setValue(key, val) {
        return Reflect.set(valuesReactive, key, val);
    }
    function clearValue(key) {
        return Reflect.deleteProperty(valuesReactive, key);
    }
    function clearValues() {
        for (const key of Reflect.ownKeys(valuesReactive)) {
            clearValue(key);
        }
    }
    function hasError(key) {
        return Reflect.has(errorsReactive, key);
    }
    function hasErrors() {
        for (const key of Reflect.ownKeys(errorsReactive)) {
            if (hasError(key))
                return true;
        }
        return false;
    }
    function getError(key) {
        return defaultString(Reflect.get(errorsReactive, key));
    }
    function setError(key, val) {
        return Reflect.set(errorsReactive, key, val);
    }
    function setErrorsAndBindFocus(errors) {
        clearErrors();
        for (const [key, val] of Object.entries(errors)) {
            setError(key, val);
        }
        clearErrorWhenFocus();
    }
    function clearError(key) {
        return Reflect.deleteProperty(errorsReactive, key);
    }
    function clearErrors() {
        for (const key of Reflect.ownKeys(errorsReactive)) {
            clearError(key);
        }
    }
    function isDisable(key) {
        const val = Reflect.get(disablesReactive, key);
        if (val === true || val === false)
            return val;
        return false;
    }
    function setDisable(key, val) {
        return Reflect.set(disablesReactive, key, val);
    }
    function clearDisable(key) {
        return Reflect.deleteProperty(disablesReactive, key);
    }
    function clearErrorWhenFocus() {
        if (formRootElement) {
            window.requestAnimationFrame(() => {
                formRootElement.querySelectorAll('input[name]').forEach((element) => {
                    if (element.clearErrorWhenFocus)
                        return;
                    const name = element.getAttribute('name');
                    const type = element.getAttribute('type');
                    const event = type === 'checkbox' || type === 'radio' ? 'change' : 'focus';
                    handleEventListener(element, event, (e) => {
                        if (!isBlank(name))
                            clearError(name);
                    });
                    element.clearErrorWhenFocus = true;
                });
            });
        }
    }
    function scrollToFirstError() {
        if (ERROR_CSS) {
            _scrollToFirstError(`.${ERROR_CSS}`, formRootElement, scrollingElement);
        }
    }
    function isFormValid() {
        clearErrorWhenFocus();
        clearErrors();
        for (const key of Reflect.ownKeys(values)) {
            if (!isBlank(key)) {
                const val = Reflect.get(values, key);
                if (isString(val)) {
                    Reflect.set(values, key, val.trim());
                }
            }
        }
        if (validateValues) {
            validateValues(valuesReactive);
        }
        else {
            devWarning('表單未設定驗證方法');
            return false;
        }
        if (hasErrors()) {
            scrollToFirstError();
            return false;
        }
        return true;
    }
    return {
        ERROR_CSS,
        DISABLED_CSS,
        values: valuesReactive,
        errors: errorsReactive,
        disables: disablesReactive,
        getValue,
        setValue,
        clearValue,
        clearValues,
        hasError,
        hasErrors,
        getError,
        setError,
        setErrorsAndBindFocus,
        clearError,
        clearErrors,
        isDisable,
        setDisable,
        clearDisable,
        clearErrorWhenFocus,
        scrollToFirstError,
        isFormValid
    };
}
