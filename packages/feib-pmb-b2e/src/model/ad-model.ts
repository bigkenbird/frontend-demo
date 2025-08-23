/** 單則廣告內容 */
export interface AdItem {
  /** 標題 */
  title: string;
  /** 內容 */
  content: string;
  /** 按鈕名稱 */
  btnName: string;

  /** 目的地 */
  clickUrl: string;
  /** 廣告圖網址 */
  imageUrl: string;
  /** 廣告圖提示 */
  imageUrlAlt: string;

  /** 廣告Id */
  adId: string;

  /** 寬度 */
  width: string;
}

/** 廣告區塊 */
export interface AdBlock {
  /** 顯示類型 1~6 */
  adType: AdType;
  /** 廣告項 */
  adList?: any[];
}

/**
 * 廣告版型
 */
export enum AdType {
  //彈出式版型
  Modal = '1',
  //輪播小版廣告
  CarouselMini = '2',
  //輪播大版廣告
  CarouselFull = '3',
  //橫幅小版廣告
  BannerSmall = '4',
  //懸浮小圖
  FloatingImage = '99',
  //手動輪播廣告
  CarouselManual = '5',
  //大圖輪播廣告
  CarouselLarge = '6',
}



