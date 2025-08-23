<template>
  <template v-if="model.adType === AdType.Modal">
    <div v-for="(data) in   model.adList  " :class="['ads modal', { 'modal-in': isOpen }]"
      style="z-index: 1000;">
      <div class="modal-backdrop"></div>
      <div class="dialog-center-area" style="">
        <div class="dialog ads-dialog">
          <div class="dialog-close-btn" @click="close()">
            <svg width="24px" height="24px" color="inherit" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg" style="--f2f051bd-cssSubColor: currentColor;">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </div>
          <div class="dialog-header">
            <div class="dialog-image">
              <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
            </div>

            <div class="dialog-title">{{ data.title }}</div>
          </div>

          <div class="dialog-body">
            <div>{{ data.content }}</div>
          </div>
          <div class="dialog-footer">
            <XButtonBlock class="flex justify-center pb-4">
              <XButton @click="handleClick">{{ data.btnName }}</XButton>
            </XButtonBlock>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
<script lang="ts">
export default {
  name: 'AdModal',
};
</script>

<script lang="ts" setup>
import { AdBlock, AdItem, AdType } from '@/model/ad-model';
import { ref } from 'vue';

withDefaults(
  defineProps<{
    model: AdBlock;
  }>(),
  {}
);

const emit = defineEmits(['click']);

function handleClick(item: AdItem): void {
  emit('click', item);
}

const isOpen = ref(true);
function close() {
  isOpen.value = false;
}
</script>

<style scoped lang="scss">
@import 'modal.scss';
</style>
