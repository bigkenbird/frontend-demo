<template @click="emit('click')">
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XTabPanel',
  props: {
    title: null,
    bubble: null,
    disabled: Boolean,
  },
});
</script>
