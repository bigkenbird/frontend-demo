<template>
  <label class="switch-toggle items-center">
    <input
      type="checkbox"
      :disabled="disabled"
      :checked="isChecked"
      @change="onChange"
    />
    <span class="switch-toggle-widget"></span>
    <span>
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = withDefaults(
  defineProps<{
    checked?: boolean;
    disabled?: boolean;
  }>(),
  {
    checked: false,
    disabled: false,
  }
);

const isChecked = ref(props.checked);

const emit = defineEmits<{
  (event: 'update:checked', value: boolean): void;
}>();

function onChange() {
  isChecked.value = !isChecked.value;
  // console.log('onChange');
  emit('update:checked', isChecked.value);
}
</script>

<style scoped lang="scss">
@import 'toggle.scss';
</style>
