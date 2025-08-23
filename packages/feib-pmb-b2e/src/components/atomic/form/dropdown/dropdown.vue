<!-- 
  TODO：
  搜尋：一鍵清空搜尋框？
  多選：可刪除已選取的選項？
  =======
-->
<template>
  <div class="form-item dropdown" ref="dropdownEl">
    <div :class="dropdownClass" v-bind-click="onContainerClick">
      <div class="form-item-enter-block-inner">
        <div class="enter-txt dropdown-txt txt-ellipsis flex items-center">
          <slot
            name="dropdownTxt"
            :value="modelValue"
            :placeholder="getPlaceholder()"
            :dropdownTxt="dropdownTxt"
          >
            {{ dropdownTxt ? dropdownTxt : getPlaceholder() }}
          </slot>
        </div>
      </div>

      <div class="form-item-enter-block-rt">
        <XIcon
          :name="overlayVisible ? 'chevron-up' : 'chevron-down'"
          size="24px"
        ></XIcon>
      </div>
    </div>

    <transition>
      <div
        class="form-item-overlay dropdown-overlay"
        v-show="overlayVisible"
        :class="[isOverlayPosDown ? 'pos-down' : 'pos-top']"
        ref="overlayEl"
      >
        <!-- 搜尋框 -->
        <div v-if="filter" class="dropdown-overlay-search">
          <XInput v-model="filterText">
            <template v-slot:enterGroupRt>
              <XIcon name="search" size="24px"></XIcon>
            </template>
          </XInput>
        </div>
        <!-- 顯示選項 -->
        <ul>
          <li
            v-for="(value, key) in visibleOptions"
            v-bind:key="key"
          >
            <div v-if="key !== 'noneGroup'"  class="group-name">{{ key }}</div>
            <ul>
              <li
                v-for="option of value"
                :class="[
                  'dropdown-option',
                  { 'is-active': isItemSelected(option) },
                ]"
                v-bind-click="(action:IAction) => { onSelect(action, option) }"
                v-bind:key="`${option.label}-${option.value}`"
              >
                <div :class="['dropdown-option-txt', { 'is-disabled dropdown-txt': option.disabled }, 'flex', 'items-center']">
                  <slot name="option" :option="option">{{ option.label }}</slot>
                </div>
                <div
                  v-if="multiple && isItemSelected(option)"
                  class="dropdown-option-suffix"
                >
                  <XIcon name="check" size="20px"></XIcon>
                </div>
              </li>
            </ul>
          </li>
          <!-- 搜尋不到時，顯示文字 -->
          <li
            class="dropdown-option"
            v-if="filterText && visibleOptionsLength === 0"
          >
            <slot name="emptyfilter">{{ getEmptyFilterText() }}</slot>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { IAction } from '@twix/ix-lib-base';
import { useI18n } from 'vue-i18n';
import messages from './dropdown.messages';
import { OptionValueType } from './dropdown-option-value-type';

// i18n
const { t } = useI18n({
  messages,
});

interface PropsType {
  disabled?: boolean;
  error?: boolean | string;
  errorMsg?: string;
  warning?: boolean;
  multiple?: boolean;
  filter?: boolean;
  bgwhite?: boolean;
  placeholder?: string;
  options: OptionValueType[];
  optionValue?: OptionValueType | OptionValueType[] | null | undefined; //v-model
  modelValue?: string;
  emptyFilterText?: string;
}
// =================================
// props and emits
// =================================
const props = withDefaults(defineProps<PropsType>(), {
  disabled: false,
  error: false,
  warning: false,
  multiple: false,
  filter: false,
  bgwhite: false,
  placeholder: '請選擇',
  emptyFilterText: '查無資料',
});

function getPlaceholder(): string {
  if (props.placeholder === '請選擇') {
    return t('uicomponent.dropdownlist.pleaseSelect'); //請選擇
  }
  return props.placeholder;
}

function getEmptyFilterText() {
  if (props.emptyFilterText === '查無資料') {
    return t('uicomponent.dropdownlist.noData'); //查無資料
  }
  return props.emptyFilterText;
}

// emits: ['update:modelValue', 'change', 'focus', 'blur', 'before-show', 'before-hide', 'show', 'hide', 'filter'],
const emit = defineEmits<{
  (
    event: 'update:optionValue',
    value: OptionValueType | OptionValueType[]
  ): void;
  (event: 'update:modelValue', value: string): void;
  (event: 'change', value: OptionValueType | OptionValueType[]): void;
  (event: 'show', value: IAction): void;
  (event: 'hide', value: IAction): void;
}>();

// =================================
// data
// =================================
// toggle下拉區塊展開
const overlayVisible = ref(false);
// dropdown DOM
const dropdownEl = ref<HTMLElement | null>(null);
const overlayEl = ref<HTMLElement | null>(null);
const isOverlayPosDown = ref(true);

// 顯示用
const dropdownTxt = ref('');
// 已選取的option（單選=string,多選=arr）
const selectedOption = ref<OptionValueType>();
const selectedOptions = ref<OptionValueType[]>([]);
// 搜尋框文字
const filterText = ref<string>('');

type interfaceVisibleOptions = {
  noneGroup?: OptionValueType[],
}
// 可顯示的選項（若無filter則顯示全部）
const visibleOptions = computed<interfaceVisibleOptions>(() => {
  let result =  props.options.filter((item) => {
    return item.label.includes(filterText.value);
  });
  let groupObject = result.reduce(function (r: any, a: OptionValueType) {
    let groupName: string = a.group ? a.group : 'noneGroup';
    r[groupName] = r[groupName] || [];
    r[groupName].push(a);
    return r;
  }, { 'noneGroup': [] });
  return groupObject;
});

const visibleOptionsLength = computed(() => {
  return props.options.filter((item) => {
    return item.label.includes(filterText.value);
  }).length;
})
// =================================
// class and style
// =================================
const dropdownClass = computed(() => {
  return {
    'form-item-enter-block': true,
    'dropdown-enter-block': true,
    'is-disabled': props.disabled,
    'is-error': !!props.error,
    'is-focus': overlayVisible.value,
    bgwhite: props.bgwhite,
  };
});

// =================================
// some utilities
// =================================
// 判斷某選項是否已被選取
function isItemSelected(option: OptionValueType): boolean {
  return findIndexInOptions(option, selectedOptions.value) > -1;
}
function delArrItem<T extends any[]>(arr: T, index: number) {
  return [
    ...arr.slice(0, index),
    // data[index] 的位置，要刪掉
    ...arr.slice(index + 1),
  ];
}

function findIndexInOptions(value: OptionValueType, list: OptionValueType[]) {
  let index = -1;

  if (list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].label === value.label && list[i].value === value.value) {
        index = i;
        break;
      }
    }
  }

  return index;
}
// function getSelectedName(options: OptionValueType[]) {
//   let selectedName: string[] = [];
//   options.forEach((option) => {
//     selectedName.push(option.label);
//   });
//   return selectedName;
// }

// =================================
// functions
// =================================
// 控制下拉區塊位置
function updateOverlayPosition() {
  let windowHeight = window.innerHeight;
  let elBottom = dropdownEl.value?.getBoundingClientRect().bottom || 0;
  let overlayHeight = overlayEl.value?.offsetHeight || 0;
  isOverlayPosDown.value = windowHeight - elBottom > overlayHeight;
}
// 控制下拉區塊開關
function show(action?: IAction) {
  Promise.resolve((overlayVisible.value = true)).then(() => {
    updateOverlayPosition();
  });
  document.addEventListener('click', onOutsideClick);
  document.addEventListener('scroll', onOutsideScroll);

  emit('show', action);
}
function hide(action?: IAction) {
  overlayVisible.value = false;
  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('scroll', onOutsideScroll);

  emit('hide', action);
}

function onContainerClick(action: IAction) {
  if (props.disabled) {
    return;
  }
  document.querySelectorAll('div')[0].click(); // click 事件被 v-bind-click 攔截走了 所以可以開很多個dropdown
  overlayVisible.value ? hide(action) : show(action);
  action.done();
}

function onOutsideClick($event: Event) {
  if (
    dropdownEl.value &&
    !dropdownEl.value.contains($event.composedPath()[0] as HTMLElement)
  ) {
    hide();
  }
}
function onOutsideScroll($event: Event) {
  updateOverlayPosition();
}

function updateDropdownTxt() {
  if (props.multiple) {
    let textArr: string[] = [];
    if (selectedOptions.value) {
      selectedOptions.value.forEach((opt) => {
        textArr.push(opt.label);
      });
      dropdownTxt.value = textArr.join(',');
    }
  } else {
    if (selectedOption.value) {
      dropdownTxt.value = selectedOption.value.label;
    }
  }
}
onMounted(() => {
  // 填入預設內容
  if (props.modelValue) {
    // 單選
    if (!props.multiple) {
      selectedOption.value = props.optionValue as OptionValueType;
    } else {
      // 多選
      selectedOptions.value = [...(props.optionValue as OptionValueType[])];
    }
  }
  updateDropdownTxt();
});
// paginator需使用傳統props + emits，先特殊處理props改變時的更新
watch(
  () => props.optionValue,
  (newVal) => {
    if (props.optionValue) {
      // 單選
      if (!props.multiple) {
        selectedOption.value = newVal as OptionValueType;
      } else {
        // 多選
        selectedOptions.value = [...(newVal as OptionValueType[])];
      }
      updateDropdownTxt();
    } else {
      dropdownTxt.value = '';
    }
  }
);

// 選取選項
function onSelect(action: IAction, optionValue: OptionValueType) {
  // 單選
  if (optionValue.disabled) return;
  if (!props.multiple) {
    selectedOption.value = optionValue;
    // console.log('單選', optionValue);
    emit('change', optionValue);
    emit('update:optionValue', optionValue);
    emitUpdateModelValue(optionValue);
    hide(action);
  } else {
    let selectedIndex = selectedOptions.value.findIndex(i => i.value == optionValue.value);
    // 點擊已選的選項，取消選取
    if (selectedIndex > -1) {
      selectedOptions.value = delArrItem(selectedOptions.value, selectedIndex);
    } else {
      // 點擊未選的選項，選取
      selectedOptions.value.push(optionValue);
    }
    // console.log('多', selectedOptions.value);

    emit('change', selectedOptions.value);
    emit('update:optionValue', selectedOptions.value);
    emitUpdateModelValue(selectedOptions.value);
  }
  updateDropdownTxt();
  action.done();
}

function emitUpdateModelValue(option: OptionValueType | OptionValueType[]) {
  if (props.multiple) {
    let val: string[] = [];
    let options = option as OptionValueType[];
    options.forEach((opt) => {
      val.push(opt.value);
    });
    emit('update:modelValue', val.join(','));
  } else {
    let opt = option as OptionValueType;
    emit('update:modelValue', opt.value);
  }
}
</script>

<style scoped lang="scss">
@import 'dropdown.scss';
@import '../form.scss';
</style>

<!-- 
  暫留：多選情景時，已選內容以「tags + 刪除icon 」呈現
  <template v-if="multi">
    <div class="dropdown-tags-wrapper">
      <div class="dropdown-tag">
        123
        <XIcon name="close" size="14px"></XIcon>
      </div>
    </div>
  </template> 
-->
