import { IData } from '@twix/ix-lib-base';
import { IForm, useForm } from '@twix/ix-lib-vue';

/**
 * 使用表單
 * vue lib與app的form中間層，如有app層form需客制可在此處理
 *
 * @param values
 * @param disables
 * @param validateValues
 * @param formRootElement
 * @param scrollingElement
 * @returns
 */
export function useAppForm(
  values: IData,
  disables: IData,
  validateValues: (data: IData) => void,
  formRootElement?: HTMLElement,
  scrollingElement?: HTMLElement
): IForm {
  /**
   * 欄位錯誤Highlight樣式
   */
  const ERROR_CSS = 'is-error';

  /**
   * 欄位Disalbe樣式
   */
  const DISABLED_CSS = 'is-disabled';

  // 取得預設form
  const form = useForm(values, disables, validateValues, formRootElement, scrollingElement, ERROR_CSS, DISABLED_CSS);

  // 覆寫
  return {
    ...form
  };
}
