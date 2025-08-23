<template>
  <div :class="classes">
    <div class="form-title-block">
      <div class="form-title">
        <span class="required-mark" v-if="required">*</span>
        <span>
          {{ title }}
        </span>
        <XButton
          v-if="info"
          type="icon"
          icon="info-circle"
          iconSize="16px"
          class="form-title-info-icon"
          v-bind-click="onInfoClick"
        ></XButton>
      </div>
      <div class="form-title-meta" v-if="hasTitleMeta">
        <slot name="formTitleMeta"></slot>
      </div>
    </div>
    <div class="form-inner-block">
      <slot></slot>
    </div>
    <div class="form-msg-block" v-if="helperMsg || errorMsg || warningMsg">
      <!-- helper msg 可能需折行，所以改傳入v-html -->
      <div class="form-helper-msg" v-if="helperMsg" v-html="helperMsg"></div>
      <div class="form-error-msg" v-if="errorMsg">{{ errorMsg }}</div>
      <div class="form-warning-msg" v-if="warningMsg">
        {{ warningMsg }}
      </div>
    </div>
    <div class="form-btn-block" v-if="hasBtn">
      <slot name="formBtn"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { IAction } from '@twix/ix-lib-base';

const slots = useSlots();
const hasTitleMeta = slots.formTitleMeta;
const hasBtn = slots.formBtn;
const props = withDefaults(
  defineProps<{
    title?: string;
    required?: boolean;
    disabled?: boolean;
    info?: boolean;
    helperMsg?: string;
    errorMsg?: string;
    warningMsg?: string;
  }>(),
  {}
);

const classes = computed(() => {
  return {
    'form-group': true,
    'is-disabled': props.disabled,
    'is-error': props.errorMsg ? true : false,
    'is-warning': props.warningMsg ? true : false,
  };
});

const emit = defineEmits<{
  (event: 'clickInfo', action: IAction): void;
}>();
function onInfoClick(action: IAction) {
  emit('clickInfo', action);
  action.done();
}
</script>

<style scoped lang="scss">
@import 'form-group.scss';
</style>
