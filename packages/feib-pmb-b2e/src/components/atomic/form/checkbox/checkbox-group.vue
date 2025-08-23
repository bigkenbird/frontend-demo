<template>
  <div :class="checkboxGroupClass">
    <XCheckboxMulti
      v-for="item in options"
      v-model="newModelValue"
      :value="item.value"
      :checked="item.checked"
      :disabled="item.disabled"
      v-model:error="item.error"
      :indeterminate="item.indeterminate"
      :className="[item.className]"
      @change="handleChange"
      @update:modelValue="onUpdateModelValue"
      @update:error="clearError"
      >{{ item.label }}
    </XCheckboxMulti>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
type ValueType = string | number | null;
// =================================
// class and style
// =================================
const checkboxGroupClass = computed(() => {
  return {
    "checkbox-group": true,
    "is-error": props.error,
    "checkbox-group-tab-separated": isTabSeparated.value,
    "checkbox-group-normal": !isTabSeparated.value && !props.vertical,
    "checkbox-group-vertical": !isTabSeparated.value && props.vertical,
  };
});

interface OptionValueType {
  label: string;
  value: ValueType;
  disabled?: boolean;
  error?: any;
  checked?: boolean;
  indeterminate?: boolean;
  className?: string;
}

interface Props {
  options: OptionValueType[];
  modelValue?: ValueType[];
  error?: any;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
});
const emit = defineEmits<{
  (event: "update:modelValue", value: ValueType[] | null): void;
  (event: "update:error", value: any): void;
  (event: "change", value: ValueType[] | null): void;
}>();

// 透過props.options內傳入的checked，初始化newModelValue(控制元件)、modelValue(丟給外面)
const newModelValue = ref(props.modelValue);
props.options.forEach((option: OptionValueType) => {
  if (option.checked && !newModelValue.value.includes(option.value)) {
    newModelValue.value.push(option.value);
  }
});

// 更新modelValue，同步更新newModelValue
watch(
  () => props.modelValue,
  (newVal) => {
    newModelValue.value = newVal;
  }
);

// 清除錯誤訊息、樣式
const clearError = () => {
  emit("update:error", null);
};
function onUpdateModelValue(value: ValueType[] | null) {
  emit("update:modelValue", value);
}
function handleChange(value: ValueType[] | null) {
  emit("change", value);
}
// 當checkbox-box有加tab-separated時，樣式差距太大無法共用。需在checkbox-group上再加class
// 抓options的className判斷是為了支援舊寫法：在每個option裡加className
const isTabSeparated = computed(() => {
  if (props.options && props.options.length > 0) {
    return props.options[0]?.className?.indexOf("tab-separated") >= 0;
  } else {
    return false;
  }
});
</script>

<style scoped lang="scss">
@import "checkbox.scss";
</style>
