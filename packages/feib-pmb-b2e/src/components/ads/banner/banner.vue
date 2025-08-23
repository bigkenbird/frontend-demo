<template>
  <!-- 橫幅小版廣告 -->
  <template v-if="model.adType === AdType.BannerSmall" v-for="(data) in model.adList">
    <div class="ads ads-banner" v-if="isOpen" @click="handleClick(data)">
      <div class="ads-banner-btn">
        <svg data-v-f2f051bd="" data-v-1484a2e0="" width="24px" height="24px" color="inherit" class="relative"
          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          style="--f2f051bd-cssSubColor: currentColor;">
          <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"></path>
        </svg>
      </div>
      <div class="ads-img-wrapper">
        <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
      </div>
    </div>
  </template>


  <!-- 懸浮小圖 -->
  <template v-if="model.adType === AdType.FloatingImage" v-for="(data) in model.adList">
    <div class="ads ads-fixed-banner" v-if="isOpen" @click="handleClick(data)">
      <div class="ads-close-btn" @click="close()">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="8" fill="#323B44" fill-opacity="0.5" />
          <path d="M10 6L6 10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 6L10 10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
      <div class="ads-title">{{ data.title }}</div>
    </div>
  </template>

</template>
<script lang="ts">
export default {
  name: 'AdBanner',
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

const isOpen = ref(true);
function close() {
  isOpen.value = false;
}

function handleClick(item: AdItem): void {
  close();
  emit('click', item);
}
</script>

<style scoped lang="scss">
@import 'banner.scss';
</style>
