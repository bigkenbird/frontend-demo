/**
 * 依傳入的Date物件加上n月
 *
 * @example
 * ```
 * addMonth(Date{2019/03/15 13:01:55}, 2) // Date{2019/05/15 13:01:55}
 * addMonth(Date{2019/03/31 13:01:55}, 1) // Date{2019/04/30 13:01:55} 大月轉小月
 * addMonth(Date{2019/04/30 13:01:55}, 1) // Date{2019/05/30 13:01:55} 小月轉大月
 * addMonth(Date{2019/04/30 13:01:55}, -2) // Date{2019/02/28 13:01:55} 2019/2月有28天
 * addMonth(Date{2019/04/30 13:01:55}, 10) // Date{2020/02/29 13:01:55} 2020/2月閏年有29天
 * addMonth(Date{2020/02/29 13:01:55}, 12) // Date{2021/02/28 13:01:55} 閏年2月轉非閏年2月
 * addMonth(Date{2020/02/29 13:01:55}, -48) // Date{2016/02/29 13:01:55} 閏年2月轉閏年2月
 * addMonth(Date{2020/04/30 13:01:55}, -2) // Date{2020/02/29 13:01:55} 2019/2月有29天
 * ```
 * @param date Date Object
 * @param number 正負整數
 * @returns 加上n月後的Date物件 **(會與傳入Date不同參照)**
 * @author Clark Chen
 * @version 2021/03/10
 */
export function addMonth(date, number) {
    if (date == null)
        return null;
    const returnDate = new Date(date.getTime());
    const dd = returnDate.getDate();
    returnDate.setDate(1); // 設為1日,避免月份跑掉
    returnDate.setMonth(returnDate.getMonth() + number);
    // 是否為閏年
    const year = returnDate.getFullYear();
    const leapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    returnDate.setDate(Math.min(dd, daysInMonth[returnDate.getMonth()] || 1));
    return returnDate;
    // console.log('test date', this.datetime.addMonth(new Date(2019, 2, 15, 13, 1, 55), 2));
    // console.log('test date', this.datetime.addMonth(new Date(2019, 2, 31, 13, 1, 55), 1));
    // console.log('test date', this.datetime.addMonth(new Date(2019, 3, 30, 13, 1, 55), 1));
    // console.log('test date', this.datetime.addMonth(new Date(2019, 3, 30, 13, 1, 55), -2));
    // console.log('test date', this.datetime.addMonth(new Date(2019, 3, 30, 13, 1, 55), 10));
    // console.log('test date', this.datetime.addMonth(new Date(2020, 1, 29, 13, 1, 55), 12));
    // console.log('test date', this.datetime.addMonth(new Date(2020, 1, 29, 13, 1, 55), -48));
    // console.log('test date', this.datetime.addMonth(new Date(2020, 3, 30, 13, 1, 55), -2));
}
