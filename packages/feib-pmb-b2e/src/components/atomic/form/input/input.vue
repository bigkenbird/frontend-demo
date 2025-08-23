<template>
  <div class="form-item">
    <div :class="inputClass">
      <div class="form-item-enter-block-lt" v-if="hasLeftSide || hasSearch">
        <XIcon
          name="search"
          size="16px"
          v-if="hasSearch"
          :class="['form-item-enter-search-icon', { 'is-active': isFocus }]"
        />
        <slot name="enterGroupLt"></slot>
      </div>
      <label class="form-item-enter-block-inner">
        <input
          v-if="!multipleLine"
          :tabindex="tabindex"
          :class="['enter-txt']"
          ref="inputRef"
          :name="name"
          :type="type"
          v-model="inputModelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="!editable"
          :autoselect="autoselect"
          :autotextwidth="autotextwidth"
          :maxlength="maxlength"
          :autocapitalize="autocapitalize"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <textarea
          v-if="multipleLine"
          :class="['enter-txt']"
          :style="height ? `height: ${height}px` : ''"
          ref="inputRef"
          :name="name"
          :type="type"
          v-model="inputModelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="!editable"
          :autoselect="autoselect"
          :autotextwidth="autotextwidth"
          :maxlength="maxlength"
          :autocapitalize="autocapitalize"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <XIcon name="error" size="16px" v-if="error" class="ml-2" />
        <XIcon name="warning" size="16px" v-if="warning" class="ml-2" />
        <XButton
          icon="cross-circle"
          type="icon"
          iconSize="16px"
          v-if="isInputHasValue && isFocus && editable"
          @mousedown.prevent="onCleanInput"
          class="ml-2 clean-btn"
          color="#737373"
        />
      </label>
      <div class="form-item-enter-block-rt" v-if="hasRightSide">
        <slot name="enterGroupRt"></slot>
      </div>
    </div>
    <div class="form-msg-block" v-if="error && errorMsg">
      <div class="form-error-msg" v-if="error && errorMsg">{{ errorMsg }}</div>
    </div>

    <div class="form-msg-block" v-if="warning && warningMsg">
      <div class="form-warning-msg" v-if="warning && warningMsg">
        {{ warningMsg }}
      </div>
    </div>
    <div class="form-msg-block" v-if="helperMsg || hasHelperMsgSlot">
      <div class="form-helper-msg" v-if="helperMsg || hasHelperMsgSlot">
        <slot name="helperMsg">{{ helperMsg }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, watch, onMounted } from "vue";

// =================================
// props and emits
// =================================
interface Props {
  name?: string;
  type?: string;
  modelValue: string | number | null;
  placeholder?: string;
  disabled?: boolean;
  editable?: boolean;
  error?: any;
  errorMsg?: string;
  warning?: boolean;
  warningMsg?: string;
  helperMsg?: string;
  autoselect?: boolean;
  hasSearch?: boolean;
  maxlength?: number;
  autotextwidth?: "fullwidth" | "halfwidth" | "default";
  autocapitalize?: "none" | "sentences" | "words" | "characters";
  autoUppercase?: boolean;
  multipleLine?: boolean;
  height?: number;
  tabindex?: number;
}
const props = withDefaults(defineProps<Props>(), {
  editable: true,
  type: "text",
  autotextwidth: "default",
  errorMsg: "",
  hasSearch: false,
  autocapitalize: "none",
  multipleLine: false,
});
const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
  (event: "update:error", value: any): void;
  (event: "update:errorMsg", value: string): void;
  (event: "update:warning", value: any): void;
  (event: "update:warningMsg", value: string): void;
  (event: "input", value: string | number): void;
  (event: "blur", value: string | number): void;
  (event: "focus"): void;
}>();

// =================================
// classes
// =================================
const inputClass = computed(() => {
  return {
    "form-item-enter-block": true,
    "is-disabled": props.disabled,
    "is-error": props.error,
    "is-warning": props.warning,
    "is-focus": isFocus.value && props.editable,
  };
});

// =================================
// var
// =================================
const inputRef = ref<HTMLInputElement>();
const isFocus = ref(false);
const hasRightSide = useSlots().enterGroupRt;
const hasLeftSide = useSlots().enterGroupLt;
const hasHelperMsgSlot = useSlots().helperMsg;

//input v-model的值
const inputModelValue = ref();

//判斷 input 是否有值（顯示叉叉用）
const isInputHasValue = computed(() => {
  return inputModelValue.value ? inputModelValue.toString().length : 0;
});

onMounted(() => {
  //處理type = number時，瀏覽器不支援maxlength
  if (props.modelValue && props.maxlength && props.type == "number") {
    const maxLengthValue = setTypeNumberMaxLength(props.modelValue);
    inputModelValue.value = maxLengthValue;
    if (maxLengthValue !== props.modelValue) {
      emit("update:modelValue", maxLengthValue);
    }
  } else {
    inputModelValue.value = props.modelValue;
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    //處理type = number時，瀏覽器不支援maxlength
    if (newVal && props.maxlength && props.type == "number") {
      const maxLengthValue = setTypeNumberMaxLength(newVal);
      inputModelValue.value = maxLengthValue;
      if (maxLengthValue !== newVal) {
        emit("update:modelValue", maxLengthValue);
      }
    } else {
      inputModelValue.value = newVal;
    }
  }
);

const handleFocus = () => {
  // 自動選取
  if (props.autoselect) {
    if (inputRef.value) {
      inputRef.value.select();
    }
  }
  isFocus.value = true;
  // 清楚錯誤訊息、樣式
  emit("update:error", null);
  emit("update:errorMsg", null);
  emit("update:warning", null);
  emit("update:warningMsg", null);
  emit("focus");
};

const handleBlur = () => {
  isFocus.value = false;
  emit("blur", inputModelValue.value);
};

function handleInput() {
  if (inputModelValue) {
    // 全/半形轉換
    if (props.autotextwidth) {
      if ((props.autotextwidth as string) === "fullwidth") {
        inputModelValue.value = toFullWidth(inputModelValue.value);
      } else if ((props.autotextwidth as string) === "halfwidth") {
        inputModelValue.value = toHalfWidth(inputModelValue.value);
      }
    }
    //處理type = number時，瀏覽器不支援maxlength
    if (props.maxlength && props.type == "number") {
      inputModelValue.value = setTypeNumberMaxLength(inputModelValue.value);
    }
    //處理autoUppercase = true時，自動轉大寫
    if (props.autoUppercase) {
      inputModelValue.value = inputModelValue.value
        ? inputModelValue.value.toUpperCase()
        : inputModelValue.value;
    }
  }

  emit("update:modelValue", inputModelValue.value);
  emit("input", inputModelValue.value);
}

// 處理type = number時，瀏覽器不支援maxlength
function setTypeNumberMaxLength(value: string | number) {
  if (value.toString().length > props.maxlength) {
    const maxLengthValue = value.toString().substring(0, props.maxlength); //要用這個input內容才會同步更新。
    return typeof value == "number" ? Number(maxLengthValue) : maxLengthValue;
  } else {
    return value;
  }
}

// 轉換為全型文字
function toFullWidth(value: string): string {
  value = value.replace(/[\u0020-\u007e]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) + 65248);
  });
  return value;
}

// 轉換為半型文字
function toHalfWidth(value: string): string {
  value = value.replace(/[\uff01-\uff5e]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 65248);
  });
  return value;
}

// 清空
function onCleanInput() {
  emit("update:modelValue", "");
  emit("input", "");
}
</script>

<style scoped lang="scss">
@import "../form.scss";
@import "input.scss";
</style>
