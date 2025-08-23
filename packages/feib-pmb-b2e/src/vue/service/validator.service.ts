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
   * 字串未超過最大/最小長度限制則回true，否則回false
   * @param str 輸入字串
   * @param minLength 最小長度
   * @param maxLength 最大長度
   * @returns 
   */
  lengthBetween(str: string, minLength: number, maxLength: number): boolean {
    if (isNull(str)) {
      return false;
    }

    return (str.length >= minLength) && (str.length <= maxLength);
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
   * 是否為統一編號
   * @param str
   * @returns true or false
   */
  isIdNumber(str: string): boolean {
    if (str == null) {
      return false;
    }
    return /^\d{8}$/.test(str);
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

    const strU = str.toUpperCase();
    if (/^[0-9A-Z]+$/.test(strU)) {
      return true;
    }
    return false;
  }

  /**
   * 是否只為半形英數字和中文字
   * @param str
   * @returns true or false
   */
  isOnlyEngOrChineseOrNumber(str: string): boolean {
    if (isNull(str)) {
      return false;
    }
    let onlyChinesePatternAndEngAndNumber = new RegExp(
      /^[\u4e00-\u9fff|\u3400-\u4dbf|\uf900-\ufaff|\u3300-\u33ff|\ufe30-\ufe4f|\uf900-\ufaff|a-z|A-Z|0-9]+$/g
    );
    if (onlyChinesePatternAndEngAndNumber.test(str)) {
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


  /**
   * 檢核字串是否為合法的登入ID：
   * 0.重覆身分證字號可能會在後面加1碼數字，故允許11碼
   * 1.本國人身分證字號+新式外國人居留證號(首碼為 A-Z英文字母，後9/10碼為數字)
   * 2.舊式外國人居留證號(前2碼為A-Z英文字碼，後8碼為數字)
   * 3.無戶籍外國人稅籍編號(前面8位數字、後2位英文)
   * @param cusId 
   */
  isValidLoginCustId(cusId: string): boolean {
    if (isNull(cusId)) {
      return false;
    }

    let id = cusId.slice(0).toUpperCase();

    if (id.length == 11) {
      if (this.isNumber(id.substring(10))) {
        //11碼可能為重複ID加註的數字註記，檢核是用前10碼檢核
        id = id.substring(0, 10);
      } else {
        //11碼不是數字，檢核失敗
        return false;
      }
    }

    if (this.isValidIdNumber(id, true)) {
      //本國人身分證字號 or 外國人居留證號
      return true;
    } else if (/^\d{8}[A-Z]{2}$/.test(id)) {
      //無戶籍外國人稅籍編號(前面8位數字、後2位英文)
      return true;
    }

    return false;
  }

  /**
   * 身分證字號檢核
   * @param id 證號
   * @param allowRC 是否允許居留證號
   */
  isValidIdNumber(id: string, allowRC: boolean): boolean {
    id = id.trim();

    //本國身分證
    const regexTW: RegExp = /^[A-Z][1,2]\d{8}$/;
    //本國身分證or新式居留證
    const regexTWRC: RegExp = /^[A-Z][1,2,8,9]\d{8}$/;
    //舊式居留證
    const regexRC_old: RegExp = /^[A-Z]{2}\d{8}$/;

    if (allowRC) {
      if (!regexTWRC.test(id) && !regexRC_old.test(id)) {
        return false;
      }
    } else {
      if (!regexTW.test(id)) {
        return false;
      }
    }

    return this.verifyIdCardCheckNo(id);
  }


  /**
   * 檢核證號檢核碼(身分證、新舊居留證)
   * @param input 
   * @returns 
   */
  private verifyIdCardCheckNo(input: string): boolean {
    const idArray: string[] = input.split('');
    const intRadix = 10;

    const TAIWAN_ID_LOCALE_CODE_LIST = [1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30];

    const RESIDENT_CERTIFICATE_NUMBER_LIST = ['0', '1', '2', '3', '4', '5', '6', '7', '4', '8', '9', '0', '1', '2', '5', '3', '4', '5', '6', '7', '8', '9', '2', '0', '1', '3'];

    // if is not a number (居留證編號)
    if (isNaN(parseInt(idArray[1], intRadix))) {
      idArray[1] =
        RESIDENT_CERTIFICATE_NUMBER_LIST[input.charCodeAt(1) - 'A'.charCodeAt(0)];
    }

    const result = idArray.reduce(
      (sum: number, n: string, index: number): number => {
        if (index === 0) {
          return (
            sum +
            TAIWAN_ID_LOCALE_CODE_LIST[
            idArray[0].charCodeAt(0) - 'A'.charCodeAt(0)
            ]
          )
        } else if (index === 9) {
          return sum + parseInt(idArray[9], intRadix)
        }
        return sum + parseInt(idArray[index], intRadix) * (9 - index)
      },
      0
    );

    if (result % 10 === 0) {
      return true;
    }

    return false;
  }

  /**
   * 是否為OBU_ID
   * 3碼為數字+A或B+6碼數字
   * @param id 
   * @returns 
   */
  isOBU(id: string): boolean {
    if (isNull(id)) {
      return false;
    }

    id = id.trim();

    return (/^\d{3}[A,B]{1}\d{6}$/.test(id));
  }

  /**
   * 基本密碼檢核:
   * 6-16碼，必須包含半形英文與數字，且不可少於2位英文字、1位數字，不可含符號及空白。
   * @param pcode 
   */
  validateBasicPcodeRule(pcode: string): boolean {
    return /^(?=.*\d)(?=.*[a-zA-Z]{2,})[0-9a-zA-Z]{6,16}$/.test(pcode);
  }

  /**
     * 檢核字串內的對應長度字串，是否為相同的英文或數字
     *
     * @param target 比對目標
     * @param compareLen 欲比對的長度
     */
  checkSameAlphaOrNumber(target: string, compareLen: number) {
    // 若要比對的長度比字串長度短，無法比較
    if (!this.isBlank(target) && compareLen >= 0 && target.length >= compareLen) {
      let tempTarget = target;
      for (var i = 0; i <= tempTarget.length - compareLen; i++) {
        var searchStr = tempTarget.substring(i, i + compareLen);
        if (this.checkSameNumber(searchStr) || this.isSameAlphabet(searchStr)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * 檢核字串內的對應長度字串，是否為連續英文或數字
   *
   * @param target 比對目標
   * @param compareLen 欲比對的長度
   */
  checkConsecutiveByLength(target: string, compareLen: number) {
    // 若要比對的長度比字串長度短，無法比較
    if (!this.isBlank(target) && compareLen >= 0 && target.length >= compareLen) {
      const compareStr = '0123456789';
      let tempTarget = target;
      for (var i = 0; i <= tempTarget.length - compareLen; i++) {
        var searchStr = tempTarget.substring(i, i + compareLen);
        if (this.checkConsecutiveAsc(searchStr) || this.checkConsecutiveDesc(searchStr) || compareStr.indexOf(searchStr) > 0) {
          return true;
        }
      }
    }

    return false;
  }


  /**
   * 是否為相同數字
   * '000':true
   * '123':false
   */
  checkSameNumber(str: string): boolean {
    if (isNull(str)) {
      return false;
    }

    let length = str.length;
    let count = 1;
    for (let i = 0; i < str.length - 1; i++) {
      let c = str.charAt(i);
      if (c > '9' || c < '0') {
        count = 1;
      } else if (c == str.charAt(i + 1)) {
        count++;
      } else {
        count = 1;
      }
    }

    if (length <= count) {
      return true;
    }
    return false;
  }

  /**
   * 是否為相同字母
   * 'aaa':true
   * 'aab':false
   */
  isSameAlphabet(str: string): boolean {
    if (isNull(str)) {
      return false;
    }

    str = str.toUpperCase();
    let length = str.length;
    let count = 1;
    for (let i = 0; i < str.length - 1; i++) {
      let c = str.charAt(i);
      if (c > 'Z' || c < 'A') {
        count = 1;
      } else if (c == str.charAt(i + 1)) {
        count++;
      } else {
        count = 1;
      }
    }

    if (length <= count) {
      return true;
    }
    return false;
  }

  /**
   * 是否為連續升冪文字
   * 'abc':true
   * 'cba':false
   */
  checkConsecutiveAsc(str: string): boolean {
    if (isNull(str)) {
      return false;
    }
    str = str.toUpperCase();
    let continuous = true;
    let c = str.charCodeAt(0);
    for (let i = 1; i < str.length; i++) {
      if (str.charCodeAt(i) != c + 1) {
        continuous = false;
        break;
      } else {
        c = str.charCodeAt(i);
      }
    }
    return continuous;
  }

  /**
   * 是否為連續降冪文字
   * 'cba':true
   * 'abc':false
   */
  checkConsecutiveDesc(str: string): boolean {
    if (isNull(str)) {
      return false;
    }
    str = str.toUpperCase();
    let continuous = true;
    let c = str.charCodeAt(0);
    for (let i = 1; i < str.length; i++) {
      if (str.charCodeAt(i) != c - 1) {
        continuous = false;
        break;
      } else {
        c = str.charCodeAt(i);
      }
    }
    return continuous;
  }


}
