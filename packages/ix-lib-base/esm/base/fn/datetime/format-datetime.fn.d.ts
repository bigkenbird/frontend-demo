/**
 * 由pattern格式化time
 * 注意：傳入的time是否為已處理過time，不同時區會造成資料差異
 *
 * @param time
 * @param pattern 簡易版用'yyyy' 'MM' 'dd' 'HH' 'mm' 'ss' 'SSS'當作取代的標記
 * @param tst 是否轉為臺灣年月日時分秒，預設true，設false在不同時區會取得不同的結果
 * @returns
 */
export declare function formatTime(time: number, pattern?: string, tst?: boolean): string;
/**
 * 由pattern格式化date
 * 注意：傳入的date是否為臺灣年月日時分秒的date物件，不同時區會造成資料差異
 *
 * @param date
 * @param pattern 簡易版用'yyyy' 'MM' 'dd' 'HH' 'mm' 'ss' 'SSS'當作取代的標記
 * @returns
 */
export declare function formatDate(date: Date, pattern?: string): string;
/**
 * 取得台灣年月日時分秒的Date物件
 *
 * Date物件無法直接設定時區，會是由當下瀏覽器決定，所以做法是調整time的值以讓Date物件可取得台灣的年月日時分秒
 * 但Date物件裡的TimezoneOffset還是當下時區
 *
 * @param time
 * @author Clark Chen
 * @version 2021/03/10
 * @returns
 */
export declare function getTaiwanDate(time: number): Date;
