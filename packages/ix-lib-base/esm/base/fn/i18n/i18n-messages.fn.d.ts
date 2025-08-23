export declare function getLocaleMessages(): {
    [key: string]: {
        [key: string]: string;
    };
};
/**
 * 設定 多語系內容
 *
 * @param messages
 */
export declare function setLocaleMessages(messages: {
    [key: string]: {
        [key: string]: string;
    };
}): void;
/**
 * 取代 多語系內容
 *
 * @param messages
 */
export declare function addLocaleMessages(messages: {
    [key: string]: {
        [key: string]: string;
    };
}): void;
