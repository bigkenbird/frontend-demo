<template>
  <label :class="['checkbox-box', error ? 'is-error' : '', className, { 'checkbox-has-text': hasSlots }]">
    <input type="checkbox" :value="value" :name="name" v-model="isCheck" :disabled="disabled"
      :indeterminate="indeterminate" @change="handleChange" />
    <span class="checkbox-widget"></span>
    <div class="checkbox-text" v-if="hasSlots" :class="checkboxTextClass">
      <slot></slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from 'vue';
type ValueType = string | number | null;

interface Props {
  name?: string;
  disabled?: boolean;
  error?: any;
  indeterminate?: boolean; // 不明確狀態
  checked?: boolean;
  value?: ValueType;
  modelValue?: ValueType[] | null;
  className?: string | string[];
  checkboxTextClass?: string;
}
const hasSlots = useSlots().default;

const props = withDefaults(defineProps<Props>(), {
  value: '',
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: ValueType[] | null): void;
  (event: 'update:error', value: any): void;
  (event: 'change', value: ValueType[] | null): void;
}>();

// modelValue = 丟進來的值
// newModelValue = 丟回去的值(需處理成array)
const newModelValue = computed(() => {
  let model = Array.isArray(props.modelValue) ? props.modelValue : [];
  let newModel = null;
  if (isCheck.value) {
    newModel = model.includes(props.value)
      ? [...model]
      : [...model, props.value];
  } else {
    newModel = model.filter((value: string | number) => value !== props.value);
  }
  return newModel;
});
// isCheck = 控制元件選取
// 勾選時更新modelValue
const isCheck = ref(props.checked);
watch(isCheck, () => {
  emit('update:modelValue', newModelValue.value);
});

// 更新 props.checked 時，同步勾選
watch(
  () => props.checked,
  () => {
    isCheck.value = props.checked;
  }
);

// 更新 modelValue 時同步勾選
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (newVal.indexOf(props.value) > -1) {
        isCheck.value = true;
      } else {
        isCheck.value = false;
      }
    } else {
      isCheck.value = false;
    }
    // 清除錯誤訊息、樣式
    emit('update:error', null);
  }
);

onMounted(() => {
  // 一進來時根據props.checked 更新 modelValue
  if (props.checked) {
    emit('update:modelValue', newModelValue.value);
  }
  // 一進來時根據 modelValue 狀況更新勾選
  if (props.modelValue && props.modelValue.indexOf(props.value) > -1) {
    isCheck.value = true;
  }
});

const handleChange = () => {
  emit('change', newModelValue.value);
  // 清除錯誤訊息、樣式
  emit('update:error', null);
};
</script>

<style scoped lang="scss">
@import 'checkbox.scss';
</style>
