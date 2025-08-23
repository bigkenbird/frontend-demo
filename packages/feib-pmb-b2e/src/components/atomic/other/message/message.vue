<template>
  <Transition>
    <div class="message" v-if="show">
      <div class="left">
        <XIcon name="triangle-error" />
        <slot />
      </div>
      <div class="right">
        <XIcon
          name="close"
          size="24px"
          v-bind-click="(action: IAction) => emit('hide', action)"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { IAction } from "@twix/ix-lib-base";

withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: true,
  }
);

const emit = defineEmits<{
  (event: "hide", action: IAction): void;
}>();
</script>

<style scoped lang="scss">
.message {
  @include text-body-01;
  color: $text-error;
  border: 1px solid $text-error;
  border-radius: 4px;
  background-color: #fff0f0;
  display: flex;
  justify-content: space-between;
  padding: 12px 16px 12px 24px;
  .left {
    display: flex;
    gap: 8px;
  }
  .right {
    cursor: pointer;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
