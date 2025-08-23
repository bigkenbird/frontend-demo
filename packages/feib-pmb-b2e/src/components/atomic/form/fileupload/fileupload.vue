<template>
  <div class="border border-solid border-divider rounded-6px">
    <file-pond
      :label-idle="contentHTML"
      v-bind:allow-multiple="false"
      v-bind:files="innerFiles"
      :server="filePondServer"
      v-on:updatefiles="onupdatefiles"
      v-on:removefile="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

/* 接收前端參數 */
const props = withDefaults(
  defineProps<{
    filePondServer?: any;
    files?: string;
    commentText?: string;
    buttonText?: string;
  }>(),
  {
    filePondServer: null,
    files: "",
    commentText: "將你要上傳的檔案拖曳到這裡",
    buttonText: "上傳檔案",
  }
);

const innerFiles = ref(props.files ? [props.files] : []);

const contentHTML = `
  <div class='flex justify-center items-center h-14 w-14 rounded-full bg-blue-50 mx-auto'>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 18V20H19V18H5Z" fill="currentColor"/>
      <path d="M9 10L5 10L12 3L19 10L15 10L15 16L9 16L9 10Z" fill="currentColor"/>
    </svg>
  </div>
  <p class="my-2">${props.commentText}</p>
  <span>${props.buttonText}</span>
`;

const emit = defineEmits<{
  (event: "update:file", value: [object]): void;
  (event: "closed"): void;
}>();

function handleClose(n: any) {
  if (n === null) innerFiles.value = [];
  // TODO(jay), 處理多次觸發removefile的原因
  // emit('closed');
}

const onupdatefiles = (n: any) => {
  if (Array.isArray(n) && n.length > 0) innerFiles.value = n;
  emit("update:file", n);
};

const reset = function () {
  innerFiles.value = [];
};

watch(
  () => props.files,
  (n: string) => {
    if (!n) innerFiles.value = [];
    innerFiles.value = [n];
  }
);
defineExpose({ reset });
</script>

<style lang="scss">
@import "fileupload.scss";
</style>