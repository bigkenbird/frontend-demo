/**
 * 流水數值
 */
let sequenceNo = 0;
/**
 * 整數最大值
 */
const max = Math.pow(2, 53);
/**
 * 取得一個流水數值
 *
 * @returns
 */
export function nextSeqNo() {
    if (sequenceNo >= max) {
        sequenceNo = 0;
    }
    return ++sequenceNo;
}
/**
 * 取得 一個流水數值字串
 * @returns
 */
export function nextSeqNoStr() {
    return `${nextSeqNo()}`;
}
