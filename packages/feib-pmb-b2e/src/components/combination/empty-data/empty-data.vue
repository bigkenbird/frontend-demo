<template>
  <div>
    <XIcon name="empty" size="64px" />
    <p class="text-placeholder text-body-01E">{{ msg }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    msg: string;
  }>(),
  {
    msg: '查無資料',
  }
);
</script>
