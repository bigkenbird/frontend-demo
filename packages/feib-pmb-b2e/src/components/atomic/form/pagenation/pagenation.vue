<template>
  <div class="flex place-items-center gap-2">
    <button :class="['button', { disabled: isFirst }]" @click="goFirst">
      <XIcon name="step-backward" size="12px" />
    </button>
    <button :class="['button', { disabled: isFirst }]" @click="back">
      <XIcon name="backward" size="12px" />
    </button>
    <div>
      <XDropdown
        bgwhite
        v-model="currentPageNum"
        v-model:optionValue="currentPageOptionValue"
        :options="currentPageOptions"
        @change="currentChange"
      ></XDropdown>
    </div>
    <button :class="['button', { disabled: isLast }]" @click="forward">
      <XIcon name="forward" size="12px" />
    </button>
    <button :class="['button', { disabled: isLast }]" @click="goLast">
      <XIcon name="step-forward" size="12px" />
    </button>
    <div>
      <XDropdown
        bgwhite
        v-model="limit"
        v-model:optionValue="limitNumOptionValue"
        :options="limitNumOption"
        @change="limitChange"
      ></XDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import messages from './pagenation.messages';
import { OptionValueType } from '../dropdown/dropdown-option-value-type';
// i18n
const { t } = useI18n({
  messages,
});

interface Props {
  current: number | string;
  total: number | string;
  limit?: number | string;
  limitArrary?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  current: 1,
  total: 0,
  limit: 10,
  limitArrary: () => [10,50,100],
});

const emit = defineEmits<{
  (event: 'update:current', value: number): void;
  (event: 'update:limit', value: number): void;
}>();

const limit = ref(`${props.limit||props.limitArrary[0]}`);
const limitNumOption = computed(() => {
  return props.limitArrary.map((value) => {
    return {
      label: t('uicomponent.pagenation.limit', value),
      value: `${value}`,
    };
  });
});

const limitNumOptionValue = ref(
  limitNumOption.value.find((i) => i.value == props.limit)
);

const currentPageNum = ref(`${+props.current}`);
const optionArrLength = computed(() => {
  return  Math.floor(+props.total / +limit.value) + (+props.total % +limit.value > 0 ? 1 : 0)
})
const currentPageOptions = computed(() => {
  return Array(optionArrLength.value)
    .fill(1)
    .map((_, index) => {
      return {
        value: `${index + 1}`,
        label: t('uicomponent.pagenation.pageNo', index + 1),
      };
    });
});
const currentPageOptionValue = ref({ value: '1', label: t('uicomponent.pagenation.pageNo', 1)});

const isFirst = computed(() => props.current == 1);
const isLast = computed(
  () =>
    props.current ==
    currentPageOptions.value[currentPageOptions.value.length - 1].value
);

const currentChange = function (n: OptionValueType) {
  emit('update:current', +n.value);
  currentPageOptionValue.value = n;
};

const limitChange = function (n: OptionValueType) {
  emit('update:limit', +n.value);
  limitNumOptionValue.value = n;
  currentChange(currentPageOptions.value[0]);
};

const goFirst = function () {
  if (isFirst.value) return;
  currentChange(currentPageOptions.value[0]);
};

const back = function () {
  if (isFirst.value) return;
  currentChange(currentPageOptions.value[+props.current - 2]);
};

const forward = function () {
  if (isLast.value) return;
  currentChange(currentPageOptions.value[+props.current]);
};

const goLast = function () {
  if (isLast.value) return;
  currentChange(currentPageOptions.value[currentPageOptions.value.length - 1]);
};
watch(() => props.total, () => {
  currentPageOptionValue.value = currentPageOptions.value.find((i) => i.value == props.current)
})
</script>

<style scoped lang="scss">
@import 'pagenation.scss';
</style>
