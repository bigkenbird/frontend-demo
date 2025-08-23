<template>
  <!-- 小版 -->
  <template v-if="model.adType === AdType.CarouselMini">
    <div class="ads ads-banner-carousel">
      <swiper
        :centeredSlidesBounds="false"
        :modules="modules"
        :slides-per-view="1.1"
        :centeredSlides="true"
        :loop="true"
        :spaceBetween="12"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        @beforeInit="onBeforeInit"
      >
        <swiper-slide
          v-for="(data, index) in adList"
          :key="index"
          :virtualIndex="index"
          @click="handleClick(data)"
        >
          <div class="ads-img-wrapper">
            <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </template>

  <!-- 手動 -->
  <template v-if="model.adType === AdType.CarouselManual">
    <div class="ads ads-manual-carousel">
      <swiper
        :centeredSlidesBounds="false"
        :modules="modules"
        :slides-per-view="1.45"
        :centeredSlides="false"
        :loop="true"
        :spaceBetween="12"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        @beforeInit="onBeforeInit"
      >
        <swiper-slide
          v-for="(data, index) in adList"
          :key="index"
          :virtualIndex="index"
          @click="handleClick(data)"
        >
          <div class="ads-card">
            <div class="ads-img-wrapper">
              <img
                class="ads-img"
                :src="data.imageUrl"
                :alt="data.imageUrlAlt"
              />
            </div>
            <div class="ads-title line-clamp-2">{{ data.title }}</div>
            <div class="ads-content line-clamp-2">{{ data.content }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </template>

  <!-- 滿版 -->
  <template v-if="model.adType === AdType.CarouselFull">
    <div class="ads ads-full-carousel">
      <swiper
        :centeredSlidesBounds="false"
        :modules="modules"
        :slides-per-view="1"
        :centeredSlides="false"
        :loop="false"
        :spaceBetween="12"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        @beforeInit="onBeforeInit"
        :pagination="({ el: '.swiper-pagination', dynamicBullets: true, dynamicMainBullets: 3 } as any)"
        @transitionEnd="onTransitionEnd"
        @beforeTransitionStart="onBeforeTransitionStart"
      >
        <swiper-slide
          v-for="(data, index) in adList"
          :key="index"
          :virtualIndex="index"
          @click="handleClick(data)"
        >
          <div class="ads-img-wrapper">
            <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
          </div>
        </swiper-slide>
        <div class="ads-card">
          <div class="ads-card-body">
            <div :class="['ads-title line-clamp-1', adsFullTitleClass]">
              {{ adsFullTitle }}
            </div>
            <div :class="['ads-content line-clamp-2', adsFullContentClass]">
              {{ adsFullContent }} 
            </div>
          </div>
          <div class="ads-card-side">
            <div class="swiper-pagination"></div>
            <div class="swiper-pagination-space" v-if="adList.length > 1"></div>
          </div>
        </div>
      </swiper>
    </div>
  </template>

  <!-- 大圖輪播廣告：至少要4則輪播才不會有問題 -->
  <template v-if="model.adType === AdType.CarouselLarge">
    <div class="ads ads-large-carousel">
      <swiper
        :centeredSlidesBounds="false"
        :modules="modules"
        :slides-per-view="1.2"
        :centeredSlides="true"
        :loop="true"
        :spaceBetween="12"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        @beforeInit="onBeforeInit"
        :pagination="({ clickable: true } as any)"
      >
        <swiper-slide
          v-for="(data, index) in adList"
          :key="index"
          :virtualIndex="index"
          @click="handleClick(data)"
        >
          <div class="ads-img-wrapper">
            <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
            <div class="ads-title line-clamp-1">{{ data.title }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </template>
</template>

<script lang="ts" setup>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

console.log(Swiper);

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { AdBlock, AdItem, AdType } from "@/model/ad-model";
import { ref } from "vue";

/* ==============================
props / emit
============================== */
const props = withDefaults(
  defineProps<{
    model: AdBlock;
  }>(),
  {}
);

const emit = defineEmits(["click"]);
let adList = <any>[];

/* ==============================
畫面互動邏輯
============================== */
/* ------------------------------
swiper
------------------------------ */
const onBeforeInit = (swiper: any) => {
  adList = props.model.adList;

  // 滿版
  if (props.model.adType === AdType.CarouselFull) {
    setAdsFullCardContent(swiper);
    return;
  }
  // 大圖輪播廣告，因為有pagination，不能重複投影片，所以至少右4張slide才不會有問題
  if (props.model.adType === AdType.CarouselLarge) {
    return;
  }
  /* ------------------------------
  slides-per-view 不為 1 時
  loop = true
  - 設定 loop 時，slide 數量必須 >= slidesPerView * 2
  - 當投影片數量小於這個數字時，重複一次投影片，loop 才會正常執行
  - slide 只有1張的時候不會輪播
  - 測試在3張slide時也會有問題，改為至少4張slide
  ------------------------------ */
  while (adList.length < 4 && adList.length > 1) {
    adList = adList.concat(props.model.adList);
  }
};

const onSwiper = (swiper: any) => {};

const onBeforeTransitionStart = (swiper: any) => {
  // 滿版
  if (props.model.adType === AdType.CarouselFull) {
    adsFullTitleClass.value = "opacity-0";
    adsFullContentClass.value = "opacity-0";
  }
};
const onTransitionEnd = (swiper: any) => {
  // 滿版
  if (props.model.adType === AdType.CarouselFull) {
    adsFullTitleClass.value = "";
    adsFullContentClass.value = "";
    setAdsFullCardContent(swiper);
  }
};

const onSlideChange = (swiper: any) => {};

const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay];

/* ------------------------------
滿版內容更換
------------------------------ */
const adsFullTitle = ref("");
const adsFullContent = ref("");
const adsFullTitleClass = ref("");
const adsFullContentClass = ref("");
function setAdsFullCardContent(swiper: any) {
  adsFullTitle.value = adList[swiper.activeIndex].title;
  adsFullContent.value = adList[swiper.activeIndex].content;
}

/* ------------------------------
handleClick
------------------------------ */
function handleClick(item: AdItem): void {
  emit("click", item);
}
</script>

<style scoped lang="scss">
@import "carousel.scss";
</style>
