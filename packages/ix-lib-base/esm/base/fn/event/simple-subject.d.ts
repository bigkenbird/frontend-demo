/**
 * 訂閱 Interface
 */
export interface ISimpleSubscription {
    unsubscribe: () => void;
}
/**
 * 訂閱主題 Interface
 */
export interface ISimpleSubject<T> {
    subscribe: (event: (value?: T) => void) => ISimpleSubscription;
    emit: (value?: T) => void;
    hasEvent: () => boolean;
}
/**
 * 主題訂閱
 *
 * @param bufferSize 值大於0，會暫存觸發過的值，當後續有訂閱時觸發
 */
export declare function useSimpleSubject<T>(bufferSize?: number): ISimpleSubject<T>;
/**
 * 空訂閱，用於訂閱失敗，可以回傳Subscription
 */
export declare function emptySubscription(): ISimpleSubscription;
