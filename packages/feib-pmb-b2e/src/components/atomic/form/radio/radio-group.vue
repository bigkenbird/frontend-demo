<template>
  <div :class="['radio-group', error ? 'is-error' : '']">
    <XRadio
      v-for="(item, index) in options"
      v-model="newModelValue"
      v-bind:key="index"
      :name="group"
      :value="item.value"
      :checked="item.checked"
      :error="item.error"
      :disabled="item.disabled"
      @change="handleChange"
      @clearError="clearError"
      >{{ item.label }}</XRadio
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
interface OptionValueType {
  label: string;
  value: string;
  disabled?: boolean;
  error?: boolean | any;
  checked?: boolean;
}

interface Props {
  options: OptionValueType[];
  modelValue: string | number;
  error?: boolean | any;
  group: string;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
  (event: "change", value: string | number): void;
  (event: "update:error", value: boolean | any): void;
}>();

onMounted(() => {
  if (newModelValue.value) {
    emit("update:modelValue", newModelValue.value);
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    newModelValue.value = newVal;

    emit("change", newModelValue.value);
  }
);

const newModelValue = ref("" as string | number);

function handleChange() {
  emit("update:modelValue", newModelValue.value);
  emit("change", newModelValue.value);
}

const clearError = () => {
  // 清除錯誤訊息、樣式
  emit("update:error", null);
};
</script>

<style scoped lang="scss">
@import "../form.scss";
@import "./radio.scss";
</style>
