<template>
  <div class="form-item">
    <div :class="textareaClass">
      <QuillEditor
        content-type="html"
        :content="modelValue"
        :enable="!disabled"
        @focus="onFocus"
        @blur="onBlur"
        @update:content="handleInput"
      />
    </div>
    <div v-if="maxlength" class="mt-1 text-body-02 text-secondary text-right">
      {{ contentLength }}/ {{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { QuillEditor } from "./quillEditor";

const isFocus = ref(false);

interface Props {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean | any;
  rows?: number;
  maxlength?: number;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  rows: 5,
});
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "update:htmlContentValue", value: string): void;
  (event: "update:error", value: boolean | any): void;
  (event: "input", value: string): void;
  (event: "blur"): void;
  (event: "getEditorInfo", value: string): void;
}>();

const textareaClass = computed(() => {
  return {
    "is-disabled": props.disabled,
    "is-error": props.error,
    "is-focus": isFocus.value,
  };
});

const stripHtmlTagsLength = (str: string) => str.replace(/<[^>]*>/g, "").length;
const stripHtmlTagsStr = (str: string) => str.replace(/<[^>]*>/g, "");

const contentLength = computed(() => stripHtmlTagsLength(props.modelValue));

const onFocus = () => {
  isFocus.value = true;
  // 清除錯誤訊息、樣式
  emit("update:error", null);
};
const onBlur = () => {
  emit("blur");
  isFocus.value = false;
};

function handleInput(content: string) {
  let htmlTagsStr = stripHtmlTagsStr(content);
  if (props.maxlength && htmlTagsStr.length > props.maxlength) {
    emit("update:htmlContentValue", htmlTagsStr);
    return;
  }
  emit("update:modelValue", content);
}
</script>

<style scoped lang="scss">
@import "../form.scss";
@import "textarea.scss";
</style>
