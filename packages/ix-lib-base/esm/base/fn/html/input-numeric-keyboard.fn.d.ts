/**
 * iOS與Android 顯示數字鍵盤與鍵盤上是否有小數點按鍵
 *
 * 使用type="number"來顯示數字鍵盤，取值常有非預期結果與maxlength限制失效，需避免input使用type=number
 */
export declare function inputNumericKeyboard(input: HTMLInputElement, hasDeciamls?: boolean): void;
