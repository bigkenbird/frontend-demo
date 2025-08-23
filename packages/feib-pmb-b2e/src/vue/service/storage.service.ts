import { StorageService } from '@twix/ix-lib-vue';

/** Local Storage key */
export class LocalStorageKey {
  // 語系
  public static KEY_LOCALE = 'locale';
}

/**
 * App Storage Service
 */
export class AppStorageService extends StorageService {
  /**
   * Service Name
   */
  protected serviceName = 'AppStorageService';

  /**
   * @implements
   */
  protected storageJSONKey = 'com.bank.yuantabank';

  /**
   * 加密 (特殊，故把鍵值獨立出來)
   */
  private storageEncryptKey = 'com.bank.yuantabank.enc';

  /**
   * get 使用者語系
   * @returns
   */
  getLocale(): string {
    return this.getValue(LocalStorageKey.KEY_LOCALE);
  }

  /**
   * set 使用者語系
   * @param locale
   */
  setLocale(locale: string) {
    this.setValue(LocalStorageKey.KEY_LOCALE, locale);
  }

  /**
   * get Encrypt Data
   */
  getEncryptData(): string {
    return this.getValue(this.storageEncryptKey);
  }

  /**
   * set Encrypt Data
   */
  setEncryptData(data: string): void {
    this.setValue(this.storageEncryptKey, data);
  }
}
