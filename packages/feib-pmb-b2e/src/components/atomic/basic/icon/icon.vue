<template>
  <svg
    ref="wrapperRef"
    :width="props.size"
    :height="props.size"
    :color="props.color"
  ></svg>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// =================================
// props
// =================================
const props = withDefaults(
  defineProps<{
    name: string;
    color?: string;
    size?: string;
  }>(),
  {
    color: 'inherit',
    size: '24px',
  }
);

const wrapperRef = ref<HTMLElement | null>(null);

// =================================
// 使用innerHTML填入svg內容，並移除最外層wrapper element
// =================================

function renderHtml(svghtml: string) {
  const div = wrapperRef.value;
  if (!div) {
    return;
  }
  div.innerHTML = svghtml;
  if (div.children.length === 0) {
    return;
  }
  const svg = div.children[0];
  for (let i = 0; i < svg.attributes.length; i++) {
    const svgAttrName = svg.attributes[i].name;
    if (!div.hasAttribute(svgAttrName)) {
      div.setAttribute(svgAttrName, svg.attributes[i].value);
    }
  }
  div.replaceChildren(...svg.children);
  // console.log(...svg.children);
}

// =================================
// inline svg with import.meta.glob (一次載入所有svg，再取需要的)
// =================================
const modules: any = import.meta.glob(`./svg/*.svg`, {
  as: 'raw',
  eager: true,
});

function showIcon() {
  const icon = modules['./svg/' + props.name + '.svg'];
  renderHtml(icon);
}

watch(
  () => props.name,
  (_: any, oldVal: any) => {
    // mounted之前不執行
    if (oldVal) {
      showIcon();
    }
  },
  { immediate: true }
);

onMounted(async () => {
  showIcon();
});
// =================================
//  functional component
// =================================
// const MyComponent = () => {
//   return h('span', {
//     style: { color: props.color },
//     width: props.size,
//     height: props.size,
//     innerHTML: `${rawHTML.value}`,
//   });
// };
</script>
<style scoped lang="scss">
@import 'icon.scss';
</style>
