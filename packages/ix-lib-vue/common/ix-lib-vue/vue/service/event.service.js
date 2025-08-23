import { debounce, preventClick, subscribeEvent, useSimpleSubject } from '@twix/ix-lib-base';
import { BaseService } from './base-service';
export class EventService extends BaseService {
    serviceName = 'EventService';
    subscribeResizeEvent(callback, delay = 100) {
        return subscribeEvent(window, 'resize', debounce(callback, delay));
    }
    subscribeOrientationChangeEvent(callback, delay = 100) {
        return subscribeEvent(window, 'orientationchange', debounce(callback, delay));
    }
    bootstrapGuardReadySubject;
    subscribeBootstrapGuardReadySubject(callback) {
        if (this.bootstrapGuardReadySubject == null)
            this.bootstrapGuardReadySubject = useSimpleSubject(1);
        return this.bootstrapGuardReadySubject.subscribe(callback);
    }
    emitBootstrapGuardReadySubject(bootstarpData) {
        if (this.bootstrapGuardReadySubject)
            this.bootstrapGuardReadySubject.emit(bootstarpData);
    }
    pageDidChangeSubject;
    subscribePageDidChangeSubject(callback) {
        if (this.pageDidChangeSubject == null)
            this.pageDidChangeSubject = useSimpleSubject();
        return this.pageDidChangeSubject.subscribe(callback);
    }
    emitPageDidChangeSubject(page) {
        if (this.pageDidChangeSubject)
            this.pageDidChangeSubject.emit(page);
    }
    pageWillChangeSubject;
    subscribePageWillChangeSubject(callback) {
        if (this.pageWillChangeSubject == null)
            this.pageWillChangeSubject = useSimpleSubject();
        return this.pageWillChangeSubject.subscribe(callback);
    }
    emitPageWillChangeSubject() {
        if (this.pageWillChangeSubject)
            this.pageWillChangeSubject.emit();
    }
    pageDestroyedSubject;
    subscribePageDestroyedSubject(callback) {
        if (this.pageDestroyedSubject == null)
            this.pageDestroyedSubject = useSimpleSubject();
        return this.pageDestroyedSubject.subscribe(callback);
    }
    emitPageDestroyedSubject(destroyedIds) {
        if (this.pageDestroyedSubject)
            this.pageDestroyedSubject.emit(destroyedIds);
    }
    widgetInitSubject;
    subscribeWidgetInitSubject(callback) {
        if (this.widgetInitSubject == null)
            this.widgetInitSubject = useSimpleSubject();
        return this.widgetInitSubject.subscribe(callback);
    }
    emitWidgetInitSubject(data) {
        if (this.widgetInitSubject)
            this.widgetInitSubject.emit(data);
    }
    bindClickClickedSubject;
    subscribeBindClickClickedSubject(callback) {
        if (this.bindClickClickedSubject == null)
            this.bindClickClickedSubject = useSimpleSubject();
        return this.bindClickClickedSubject.subscribe(callback);
    }
    emitBindClickClickedSubject(e) {
        if (this.bindClickClickedSubject)
            this.bindClickClickedSubject.emit(e);
    }
    windowCatchClickEventSubject;
    subscribeWindowCatchClickEventSubject(callback) {
        if (this.windowCatchClickEventSubject == null)
            this.windowCatchClickEventSubject = useSimpleSubject();
        return this.windowCatchClickEventSubject.subscribe(callback);
    }
    emitWindowCatchClickEventSubject(e) {
        if (this.windowCatchClickEventSubject)
            this.windowCatchClickEventSubject.emit(e);
    }
    subscribeNativeBackButtonClickEventSubject(callback, sendLog) {
        return subscribeEvent(document, 'backbutton', (e) => {
            preventClick(e, callback, null, false, sendLog);
        });
    }
}
