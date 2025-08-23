import { IData } from '../base-interface';
/**
 * 歷程項目
 */
export interface IHistoryItem {
    inited: boolean;
    readonly pk: string;
    readonly id?: string;
    name?: string;
    readonly routePath: string;
    readonly data: IData;
    rsData: IData;
}
/**
 * 交易歷程
 */
export interface IHistoryTxn {
    getTrack(index: number): IHistoryItem;
    addTrack(page: IHistoryItem): void;
    removeLastTrack(): void;
    removeTrack(index: number): void;
    getTrackLength(): number;
    length(): number;
    getPreviousTrack(previous: number): IHistoryItem;
    isHeadTrack(): boolean;
    getTxnPK(): string;
    getTaskNo(): string;
    isNext(): boolean;
    setNext(val: boolean): void;
    getTxnFirstTrack(): IHistoryItem;
    getPreviousTxnData(): IData;
    setPreviousTxnData(data: IData): void;
}
/**
 * 產生交易歷程資料
 *
 * @param txnPK 交易PK值 ex:"a6247e41-35c9-4e05-e09a-82c578dd80cf"
 * @param taskNo 交易代號
 * @param txnFirstPageTrackIndex 切換交易時的紀錄的交易第一頁index
 * @returns
 */
export declare function createTxnHistory(txnPK: string, taskNo: string, txnFirstPageTrackIndex: number): IHistoryTxn;
