<!-- radio 目前設定： -->
<!-- 在 html 寫上 checked 或是使用 ref 設定預設已選選項 -->
<template>
  <label :class="['radio-box', error ? 'is-error' : '']">
    <input
      type="radio"
      :value="value"
      :name="name"
      :checked="checked || modelValue === value"
      :disabled="disabled"
      @change="handleChange"
      @click="handleClick"
    />
    <span class="radio-widget"></span>
    <div class="radio-text" v-if="hasSlots">
      <slot></slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import { onMounted, useSlots } from "vue";

interface Props {
  name?: string;
  disabled?: boolean;
  error?: boolean | any;
  checked?: boolean;
  value?: string;
  modelValue?: string;
}
const hasSlots = useSlots().default;

const props = withDefaults(defineProps<Props>(), {
  value: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "update:error", value: boolean | any): void;
  (event: "change", value: string): void;
  (event: "clearError"): void;
}>();

onMounted(() => {
  if (props.checked) {
    emit("update:modelValue", props.value);
  }
});

function handleChange() {
  emit("update:modelValue", props.value);
  emit("change", props.value);
}

const handleClick = () => {
  if (props.disabled) {
    return;
  }

  // 清除錯誤訊息、樣式
  emit("update:error", null);
  emit("clearError");
};
</script>

<style scoped lang="scss">
@import "../form.scss";
@import "radio.scss";
</style>
