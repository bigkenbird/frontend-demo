/**
 * 產生交易歷程資料
 *
 * @param txnPK 交易PK值 ex:"a6247e41-35c9-4e05-e09a-82c578dd80cf"
 * @param taskNo 交易代號
 * @param txnFirstPageTrackIndex 切換交易時的紀錄的交易第一頁index
 * @returns
 */
export function createTxnHistory(txnPK, taskNo, txnFirstPageTrackIndex) {
    /**
     * 目前狀態是前進或返回,換交易是前進
     */
    let next = true;
    /**
     * history下代表各頁的track
     */
    const track = [];
    /**
     * 交易層級返回時使用的參數
     */
    let previousTxnData;
    /**
     * 取歷程Track
     *
     * @param index - 歷程track的index
     */
    function getTrack(index) {
        return track[index];
    }
    /**
     * 增加歷程Track
     */
    function addTrack(page) {
        track.push(page);
    }
    /**
     * 移除最後一筆track
     */
    function removeLastTrack() {
        track.pop();
    }
    /**
     * 移除指定的track
     */
    function removeTrack(index) {
        track.splice(index, 1);
    }
    /**
     * 取得歷程頁面數量
     * @deprecated
     */
    function getTrackLength() {
        return track.length;
    }
    /**
     * 取得歷程頁面數量
     * @returns
     */
    function length() {
        return track.length;
    }
    /**
     * 取最後一筆帶0，取倒數第二筆帶1
     */
    function getPreviousTrack(previous) {
        const len = track.length;
        if (len === 0)
            return null;
        if (previous < 0)
            previous = 0;
        // 超出track範圍,回第一筆
        if (len <= previous)
            previous = len - 1;
        return track[len - previous - 1];
    }
    /**
     *  是否目前為最前面的歷程
     */
    function isHeadTrack() {
        return track.length < 2;
    }
    /**
     * 取得交易PK
     */
    function getTxnPK() {
        return txnPK;
    }
    /**
     * 取得 交易代號 TaskNo
     */
    function getTaskNo() {
        return taskNo;
    }
    /**
     * 是否為Next Page
     */
    function isNext() {
        return next;
    }
    /**
     * 設定是否為Next Page
     */
    function setNext(val) {
        next = val;
    }
    /**
     * 取得交易首頁的track,用來回到交易首頁
     */
    function getTxnFirstTrack() {
        return getTrack(txnFirstPageTrackIndex);
    }
    /**
     * 取得 交易層級返回時使用的參數
     */
    function getPreviousTxnData() {
        return previousTxnData ? previousTxnData : {};
    }
    /**
     * 設定 交易層級返回時使用的參數
     */
    function setPreviousTxnData(data) {
        previousTxnData = data;
    }
    return {
        getTrack,
        addTrack,
        removeLastTrack,
        removeTrack,
        getTrackLength,
        length,
        getPreviousTrack,
        isHeadTrack,
        getTxnPK,
        getTaskNo,
        isNext,
        setNext,
        getTxnFirstTrack,
        getPreviousTxnData,
        setPreviousTxnData
    };
}
