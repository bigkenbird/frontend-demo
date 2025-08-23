import {
  clearTime,
  isBlank,
  isEmail,
  isNull,
  isNumeric,
} from '@twix/ix-lib-base';
import { useLogger } from '@twix/ix-lib-vue';
import getEmojiRegex from 'emoji-regex';

/**
 * Validator Service
 * @param logger
 * @returns
 */
export class ValidatorService {
  // Service Name
  private serviceName = 'ValidatorService';

  // setup logger
  private logger = useLogger(this.serviceName);

  // 取得emoji-regex套件的RegExp
  private emojiRegex: RegExp = getEmojiRegex();

  /**
   * 是否為空字串，注意與isEmpty()有差異
   * @param str 傳入字串
   * @returns true or false
   * @example
   * isBlank(undefined) // true
   * isBlank(null) // true
   * isBlank('') // true
   * isBlank(' ') // true
   */
  isBlank(str: string): boolean {
    return isBlank(str);
  }
  /**
   * 是否有emoji
   */
  hasEmoji(str: string): boolean {
    if (this.emojiRegex) return this.emojiRegex.test(str);
    return false;
  }

  /**
   * 必填檢核
   * @param value
   * @returns true or false
   */
  required(value: any): boolean {
    if (isNull(value)) {
      return false;
    }

    // 去空白
    if (typeof value == 'string') {
      let s: string;
      s = value;
      value = s.trim();
    }

    if (value.length != undefined && value.length == 0) {
      return false;
    }
    return true;
  }

  /**
   * 最小長度檢核
   * 未達最小長度回false
   * 超過最小長度回true
   * @param str
   * @param length 長度限制
   * @returns true or false
   */
  minlength(str: string, length: number): boolean {
    if (isNull(str)) {
      return false;
    }

    if (length < 0) {
      length = 0;
    }

    // 去空白
    str = str.trim();
    if (str.length < length) {
      return false;
    }
    return true;
  }

  /**
   * 最大長度檢核
   * 超過最大長度回false
   * 未超過最大長度回true
   * @param str
   * @param length 長度限制
   * @returns true or false
   */
  maxlength(str: string, length: number): boolean {
    if (isNull(str)) {
      return false;
    }

    if (length < 0) {
      length = 0;
    }

    // 去空白
    str = str.trim();
    if (str.length > length) {
      return false;
    }
    return true;
  }

  /**
   * 是否為email
   * @param str
   * @returns true or false
   */
  isEmail(str: string): boolean {
    if (isNull(str)) {
      return false;
    }
    if (isEmail(str)) {
      return true;
    }
    return false;
  }

  /**
   * 是否為台灣行動電話號碼格式
   * @param str
   * @returns true or false
   */
  isMobile(str: string): boolean {
    if (str == null) {
      return false;
    }
    return /^09\d{8}$/.test(str);
  }

  /**
   * 是否都為數字
   * @param str
   * @returns true or false
   * @example
   * isNumber('123'), return true
   * isNumber('12.3'), return false
   * isNumber('-123'), return false
   */
  isNumber(str: string): boolean {
    if (isNull(str)) {
      return false;
    }
    for (let i = 0; i < str.length; i++) {
      let s = String.fromCharCode(str.charCodeAt(i));
      if (!/^[0-9]*$/.test(s)) {
        return false;
      }
    }
    return true;
  }

  /**
   * 是否為數值
   * @param value
   * @returns true or false
   * @example
   * isNumeric('123'), return true
   * isNumeric('12.3'), return true
   * isNumeric('-123'), return true
   */
  isNumeric(value: string | number): boolean {
    return isNumeric(value);
  }

  /**
   * 是否為整數
   */
  isInteger(value: string) {
    const reg = /^-?\d+$/;
    return value && reg.test(value);
  }

  /**
   * 是否為正整數
   */
  isPositiveInteger(value: string) {
    const reg = /^[0-9]*[1-9][0-9]*$/;
    return value && reg.test(value);
  }

  /**
   * 是否只為英數字
   * @param str
   * @returns true or false
   * @example
   * isEngAndNumber('1a2b'), return true
   * isEngAndNumber('1a中文2b'), return false
   */
  isEngAndNumber(str: string): boolean {
    if (isNull(str)) {
      return false;
    }

    str = str.toUpperCase();
    if (/^[0-9A-Z]+$/.test(str)) {
      return true;
    }
    return false;
  }

  /**
   * 是否只為英/數字/中文字
   * @param str
   * @returns true or false
   */
  isOnlyEngOrChineseOrNumber(str: string): boolean {
    if (isNull(str)) {
      return false;
    }

    if (/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(str)) {
      return true;
    }
    return false;
  }

  /**
   * 是否只為英/中文字
   * @param str
   * @returns true or false
   */
  isOnlyEngOrChinese(str: string): boolean {
    if (isNull(str)) {
      return false;
    }

    if (/^[\u4e00-\u9fa5a-zA-Z]+$/.test(str)) {
      return true;
    }
    return false;
  }

  /** 是否為日期 */
  isDate(dateString: string, format?: RegExp): boolean {
    let date = new Date(dateString);
    if (!(date instanceof Date)) {
      return false;
    }
    if (isNaN(Number(date))) {
      return false;
    }
    if (format) {
      return format.test(dateString);
    } else {
      // 預設格式 yyyy/MM/dd
      return /^\d{4}\/\d{2}\/\d{2}$/.test(dateString);
    }
  }

  /** 是否為日期時間格式 */
  isDateTime(dateString: string, format?: RegExp): boolean {
    let date = new Date(dateString);
    if (!(date instanceof Date)) {
      return false;
    }
    if (isNaN(Number(date))) {
      return false;
    }
    if (format) {
      return format.test(dateString);
    } else {
      // 預設格式 yyyy/MM/dd HH:mm:ss
      return /^\d{4}\/\d{2}\/\d{2} d{2}:d{2}:d{2}$/.test(dateString);
    }
  }

  /**
   * 是否符合幣別金額的格式
   * (1)限輸入半形數字和小數點
   * (2)新台幣/日幣不能輸入小數點
   * @param value 金額
   * @param currencyId 幣別代碼 (全大寫)
   */
  checkMoneyCurrencyFormat(value: number, currencyId: string): boolean {
    if (!currencyId) {
      return false;
    }
    if (currencyId === 'TWD' || currencyId === 'JPY') {
      return this.isNumber(value.toString());
    }
    return this.isNumeric(value.toString());
  }

  /**
   * startDate 是否比 endDate 晚
   * @returns true(起日大於迄日)/false
   */
  startDateIsLater(
    startDate: Date | string,
    endDate: Date | string,
    startCanEqualEnd?: boolean
  ): boolean {
    if (isNull(startDate) || isNull(endDate)) {
      return false;
    }
    // 檢查日期格式
    if (!(startDate instanceof Date)) {
      if (!this.isDate(startDate)) {
        return false;
      }
      startDate = new Date(startDate);
    }
    if (!(endDate instanceof Date)) {
      if (!this.isDate(endDate)) {
        return false;
      }
      endDate = new Date(endDate);
    }

    // 清除時分秒
    clearTime(startDate);
    clearTime(endDate);

    if (startCanEqualEnd) {
      return startDate.getTime() > endDate.getTime();
    } else {
      return startDate.getTime() >= endDate.getTime();
    }
  }

  /**
   * startDateTime 是否比 endDateTime 晚
   * @returns true(起日大於迄日)/false
   */
  startDateTimeIsLater(
    startDate: Date | string,
    endDate: Date | string,
    startCanEqualEnd?: boolean
  ): boolean {
    if (isNull(startDate) || isNull(endDate)) {
      return false;
    }
    // 檢查日期格式
    if (!(startDate instanceof Date)) {
      if (!this.isDate(startDate)) {
        return false;
      }
      startDate = new Date(startDate);
    }
    if (!(endDate instanceof Date)) {
      if (!this.isDate(endDate)) {
        return false;
      }
      endDate = new Date(endDate);
    }

    if (startCanEqualEnd) {
      return startDate.getTime() > endDate.getTime();
    } else {
      return startDate.getTime() >= endDate.getTime();
    }
  }

  /**
   * startDate與endDate的距離是否大於 N 個月
   */
  isDateIntervalOverNMonth(
    startDate: Date | string,
    endDate: Date | string,
    nMonth: number
  ): boolean {
    if (isNull(startDate) || isNull(endDate)) {
      return false;
    }
    // 檢查日期格式
    if (!(startDate instanceof Date)) {
      if (!this.isDate(startDate)) {
        return false;
      }
      startDate = new Date(startDate);
    }
    if (!(endDate instanceof Date)) {
      if (!this.isDate(endDate)) {
        return false;
      }
      endDate = new Date(endDate);
    }

    let nMonthFromStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + nMonth,
      startDate.getDate()
    );

    return endDate.getTime() > nMonthFromStartDate.getTime();
  }
}
