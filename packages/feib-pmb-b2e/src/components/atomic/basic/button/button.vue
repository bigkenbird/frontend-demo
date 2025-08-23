<template>
  <!-- 加上ontouchstart,:active才有效果 -->
  <button type="button" :class="classes" :disabled="disabled" ontouchstart>
    <span v-if="icon && iconPosition == 'left'" class="icon">
      <XIcon :name="icon" :size="iconSize"></XIcon>
    </span>
    <span v-if="hasSlots" class="button-txt">
      <slot></slot>
    </span>
    <span v-if="icon && iconPosition == 'right'" class="icon">
      <XIcon :name="icon" :size="iconSize"></XIcon>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

const hasSlots = useSlots().default;

const props = withDefaults(
  defineProps<{
    /*primary or secondary button*/
    type?: 'primary' | 'secondary' | 'negative' | 'outline' | 'icon' | 'text';
    disabled?: boolean;
    /*size of the button*/
    size?: 's' | 'm' | 'l';
    icon?: string;
    iconSize?: string;
    iconWithoutColor?: boolean;
    iconPosition?: 'left' | 'right';
    full?: boolean;
  }>(),
  {
    type: 'primary',
    disabled: false,
    size: 'l',
    iconSize: '24px',
    iconWithoutColor: false,
    iconPosition: 'left',
    full: false,
  }
);

const classes = computed(() => ({
  button: true,
  'button-icon': props.type == 'icon',
  'button-icon-without-color':
    props.type == 'icon' && props.iconWithoutColor == true,
  'button-primary': props.type == 'primary',
  'button-secondary': props.type == 'secondary',
  'button-negative': props.type == 'negative',
  'button-outline': props.type == 'outline',
  'button-text': props.type == 'text',
  'is-disabled': props.disabled,
  'button-s': props.size == 's' && props.type !== 'icon',
  'button-m': props.size == 'm' && props.type !== 'icon',
  'button-l': props.size == 'l' && props.type !== 'icon',
  'text-body-01': props.size == 's' || props.size == 'm',
  'text-body-01E': props.size == 'l',
  'w-full': props.full,
}));
</script>

<style scoped lang="scss">
@import 'button.scss';
</style>
