<template>
  <label
    :class="[
      'checkbox-box',
      error ? 'is-error' : '',
      className,
      { 'checkbox-has-text': hasSlots },
    ]"
  >
    <input
      type="checkbox"
      :value="value"
      v-model="newModelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @change="handleChange"
      :true-value="value"
      :false-value="null"
    />
    <span class="checkbox-widget"></span>
    <div class="checkbox-text" v-if="hasSlots" :class="checkboxTextClass">
      <slot></slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, watch } from "vue";

type ValueType = string | number | null;
interface Props {
  name?: string;
  disabled?: boolean;
  indeterminate?: boolean; // 不明確狀態
  error?: any;
  checked?: boolean;
  value?: ValueType;
  modelValue?: ValueType;
  className?: string;
  checkboxTextClass?: string;
}
const hasSlots = useSlots().default;

const props = withDefaults(defineProps<Props>(), {
  value: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", value: ValueType): void;
  (event: "update:error", value: any): void;
  (event: "change", value: ValueType): void;
}>();
// =================================
// 預設值：可由checked屬性 或 modelValue 控制
// =================================
// （vue本來會自動判斷，但都是數字時會將string 跟number是為同一個，因此自己使用 === 判斷）
const getDefaultValue = () => {
  if (props.checked) {
    return props.value;
  } else {
    if (props.modelValue === props.value) {
      return props.modelValue;
    } else {
      return null;
    }
  }
};
const newModelValue = ref<ValueType>(getDefaultValue());

// 由checked屬性控制時，需更新modelValue
onMounted(() => {
  // 一進來時根據props.checked 更新 modelValue
  // 觸發modelValue更新後，會接著更新 newModelValue
  if (props.checked) {
    emit("update:modelValue", props.value);
  }
});

// =================================
// 外部修改時：可透過修改chcked屬性 或 modelValue
// 同步勾選狀況、清除錯誤
// =================================
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal === props.value) {
      newModelValue.value = newVal;
    } else {
      newModelValue.value = null;
    }
    // 清除錯誤訊息、樣式
    if (props.error) {
      emit("update:error", null);
    }
  }
);
// =================================
// 內部勾選時：更新modelValue、清除錯誤
// =================================
const handleChange = () => {
  emit("update:modelValue", newModelValue.value);
  emit("change", newModelValue.value);
  // 清除錯誤訊息、樣式
  if (props.error) {
    emit("update:error", null);
  }
};
</script>

<style scoped lang="scss">
@import "checkbox.scss";
</style>
