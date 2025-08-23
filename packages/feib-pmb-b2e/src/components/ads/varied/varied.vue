<template>
  <!-- 熱門產品版位 -->
  <template v-if="model.adType === null">
    <div class="ads ads-varied">
      <div v-for="(data) in model.adList" @click="handleClick(data)" class="ads-card border"
        :class="{ 'is-full': isFull(data) }">
        <div class="ads-card-tag">{{ data.title }}</div>
        <div class="ads-card-body py-2">
          <div class="flex items-center w-full">
            <div class="shrink-0 w-48px h-48px">
              <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
            </div>
            <div class="grow ml-1">
              <div class="text-body-02" v-html="data.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <!-- 功能引導版位 -->
  <template v-if="model.adType === null">
    <div class="ads ads-varied">
      <div v-for="(data) in model.adList" @click="handleClick(data)" class="ads-card border"
        :class="{ 'is-full': isFull(data) }">
        <div class="ads-card-body" v-if="isFull(data)">
          <div class="flex items-center w-full">
            <div class="shrink-0 w-84px h-84px">
              <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
            </div>
            <div class="grow ml-3">
              <div class="text-heading-06 mb-2">{{ data.title }}</div>
              <div class="text-body-02 mb-2" v-html="data.content"></div>
              <div class="text-right" v-if="data.btnName">
                <button type="button" class="button button-primary button-m">
                  <span class="button-txt" data-dismiss="modal">{{
                    data.btnName
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="ads-card-body h-full" v-else>
          <div class="flex flex-col h-full">
            <div class="text-heading-06 mb-1">{{ data.title }}</div>
            <div class="flex items-center w-full mb-2">
              <div class="shrink-0 w-40px h-40px">
                <img class="ads-img" :src="data.imageUrl" :alt="data.imageUrlAlt" />
              </div>
              <div class="grow ml-1">
                <div class="text-body-02" v-html="data.content"></div>
              </div>
            </div>
            <div class="text-right" v-if="data.btnName">
              <button type="button" class="button button-secondary button-m">
                <span class="button-txt" data-dismiss="modal">{{
                  data.btnName
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
<script lang="ts">
export default {
  name: 'AdVaried',
};
</script>

<script lang="ts" setup>
import { AdBlock, AdItem } from '@/model/ad-model';

withDefaults(
  defineProps<{
    model: AdBlock;
  }>(),
  {}
);

const emit = defineEmits(['click']);

const isFull = (item: AdItem) => {
  return item.width === '2';
};

function handleClick(item: AdItem): void {
  emit('click', item);
}
</script>

<style scoped lang="scss">
@import 'varied.scss';
</style>
