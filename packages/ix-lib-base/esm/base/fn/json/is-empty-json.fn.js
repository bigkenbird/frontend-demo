/* eslint-disable @typescript-eslint/no-explicit-any */
import { isJSON } from './is-json.fn';
export function isEmptyJSON(json) {
    if (isJSON(json)) {
        return Object.keys(json).length === 0;
    }
    return false;
}
