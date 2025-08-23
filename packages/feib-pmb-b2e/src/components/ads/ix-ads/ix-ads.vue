<template>
  <carousel
    v-if="
      model.adType === AdType.CarouselMini ||
      model.adType === AdType.CarouselManual ||
      model.adType === AdType.CarouselFull ||
      model.adType === AdType.CarouselLarge
    "
    :model="model"
    @click="handleClick"
  ></carousel>

  <banner
    v-if="model.adType === AdType.BannerSmall  || model.adType === AdType.FloatingImage"
    :model="model"
    @click="handleClick"
  ></banner>

  <!-- <varied
    v-if="model.adType === '5' || model.adType === '6'"
    :model="model"
    @click="handleClick"
  ></varied> -->

  <modal
    v-if="model.adType === AdType.Modal"
    :model="model"
    @click="handleClick"
  ></modal>
</template>

<script setup lang="ts">
import banner from '@components/ads/banner/banner.vue';
import carousel from '@components/ads/carousel/carousel.vue';
import varied from '@components/ads/varied/varied.vue';
import modal from '@components/ads/modal/modal.vue';
import { AdBlock, AdItem, AdType } from '@/model/ad-model';

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
</script>

<style scoped lang="scss">
@import 'ix-ads.scss';
</style>
