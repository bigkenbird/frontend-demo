import { BaseService } from './base-service';
import { ModalAction } from '../vue-enum';
import { IPopupClose } from '../vue-interface';
export declare abstract class ViewService extends BaseService {
    protected serviceName: string;
    abstract showLoading(): Promise<void>;
    abstract hideLoading(): void;
    abstract showAlert(title: string, confirm: IPopupClose, text: string, btnText?: string): Promise<ModalAction>;
    abstract showConfirm(title: string, confirm: IPopupClose, cancel: IPopupClose, text: string, confirmBtnText?: string, cancelBtnText?: string): Promise<ModalAction>;
    abstract showGlobalErrorPopup(message: string, confirm: IPopupClose, title?: string, btnText?: string): Promise<ModalAction>;
    abstract closeAllModal(callback: () => void): void;
    abstract resetPageCSSWhenPageInit(): void;
    protected wrapClose(r: (v: ModalAction) => void, rVal: ModalAction, fn?: IPopupClose): IPopupClose;
}
