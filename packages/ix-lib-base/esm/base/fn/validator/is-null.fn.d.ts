/**
 * undefined or null
 *
 * @param val
 */
export declare function isNull(val: unknown): boolean;
/**
 * undefined
 */
declare global {
    interface Window {
        Null: undefined | null;
        isNull: (val: unknown) => boolean;
    }
}
