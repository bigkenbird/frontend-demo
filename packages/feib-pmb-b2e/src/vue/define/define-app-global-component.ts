import { App } from 'vue';

// basic
import XButton from '@/components/atomic/basic/button/button.vue';
import XButtonBlock from '@/components/atomic/basic/button/button-block.vue';
import XIcon from '@/components/atomic/basic/icon/icon.vue';
import XToggle from '@/components/atomic/form/toggle/toggle.vue';

// display
import XTabView from '@/components/atomic/display/tab-view/tab-view.vue';
import XTabPanel from '@/components/atomic/display/tab-view/tab-panel.vue';

// form
import XCheckbox from '@/components/atomic/form/checkbox/checkbox.vue';
import XCheckboxMulti from '@/components/atomic/form/checkbox/checkbox-multi.vue';
import XCheckboxGroup from '@/components/atomic/form/checkbox/checkbox-group.vue';
import XDatePicker from '@/components/atomic/form/date-picker/date-picker.vue';
import XInput from '@/components/atomic/form/input/input.vue';
import XPagenation from '@/components/atomic/form/pagenation/pagenation.vue';
import XRadio from '@/components/atomic/form/radio/radio.vue';
import XRadioGroup from '@/components/atomic/form/radio/radio-group.vue';
import XTextarea from '@/components/atomic/form/textarea/textarea.vue';
import XFormGroup from '@/components/atomic/form/form-group/form-group.vue';
import XFileUpload from '@/components/atomic/form/fileupload/fileupload.vue';

// layout
import XFooter from '@/components/atomic/layout/footer/footer.vue';
import XNav from '@/components/atomic/layout/nav/nav.vue';
import XHeader from '@/components/atomic/layout/header/header.vue';
import XBreadcrumb from '@/components/atomic/layout/breadcrumb.vue';

// modal
import XModal from '@/components/atomic/modal/modal-base/modal-base.vue';
import XDialog from '@/components/atomic/modal/dialog/dialog.vue';
import XDrawer from '@/components/atomic/modal/drawer/drawer.vue';
import XToast from '@/components/atomic/modal/toast/toast.vue';
import XLoading from '@/components/atomic/modal/loading/loading.vue';

// other
import XDropdown from '@/components/atomic/form/dropdown/dropdown.vue';
import XMessage from '@/components/atomic/other/message/message.vue';
import XTooltip from '@/components/atomic/form/tooltip/tooltip.vue';

/**
 * 在此定義的component在當下app中使用不需再import
 */
export default function (app: App) {
  // basic
  app.component('XButton', XButton);
  app.component('XButtonBlock', XButtonBlock);
  app.component('XIcon', XIcon);
  app.component('XToggle', XToggle);
  // display
  app.component('XTabView', XTabView);
  app.component('XTabPanel', XTabPanel);

  // form
  app.component('XCheckbox', XCheckbox);
  app.component('XCheckboxMulti', XCheckboxMulti);
  app.component('XCheckboxGroup', XCheckboxGroup);
  // app.component('XComboBox', XComboBox);
  app.component('XDatePicker', XDatePicker);
  app.component('XDropdown', XDropdown);
  // app.component('XDropdownOption', XDropdownOption);
  app.component('XInput', XInput);
  app.component('XPagenation', XPagenation);
  app.component('XRadio', XRadio);
  app.component('XRadioGroup', XRadioGroup);
  app.component('XTextarea', XTextarea);
  app.component('XFormGroup', XFormGroup);
  app.component('XFileUpload', XFileUpload);
  // layout
  app.component('XFooter', XFooter);
  app.component('XNav', XNav);
  app.component('XHeader', XHeader);
  app.component('XBreadcrumb', XBreadcrumb);
  // modal
  app.component('XModal', XModal);
  app.component('XDialog', XDialog);
  app.component('XToast', XToast);
  app.component('XDrawer', XDrawer);
  app.component('XLoading', XLoading);
  // other
  app.component('XMessage', XMessage);
  app.component('XTooltip', XTooltip);
}
