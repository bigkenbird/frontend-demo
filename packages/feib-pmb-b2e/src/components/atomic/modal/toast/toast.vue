<template>
  <XModal
    v-model:isOpen="containerVisible"
    ref="XModalRef"
    :backdropTransparent="true"
    :backdropCloseable="false"
    :className="className"
    :appendTo="appendTo"
    :isInline="isInline"
    :customZIndex="customZIndex"
  >
    <Transition
      name="animate-toast"
      @before-enter="onToastBeforeEnter"
      @enter="onToastEnter"
      @after-leave="onToastAfterLeave"
    >
      <div :class="['toast-dialog', toastType]" v-show="isOpen">
        <div class="flex justify-between">
          <div class="flex items-center">
            <XIcon
              v-if="toastType === 'success'"
              name="success_fill"
              size="24px"
            ></XIcon>
            <XIcon
              v-if="toastType === 'error'"
              name="clean"
              size="24px"
            ></XIcon>
            <div class="toast-txt ml-2" v-if="toastTitle">{{ toastTitle }}</div>
          </div>
          <div class="close" @click="closeToast">
            <XIcon name="close" size="24px"></XIcon>
          </div>
        </div>
        <p v-if="toastContent" class="mt-2 mr-6">
          {{ toastContent }}
        </p>
      </div>
    </Transition>
  </XModal>
</template>

<script setup lang="ts">
import { ref, onUpdated, onMounted } from "vue";
import XModal from "../modal-base/modal-base.vue";

// =================================
// props emits var
// =================================
interface Props {
  // for toast dialog
  isOpen: boolean;
  toastType?: "success" | "error";
  toastTitle?: string;
  toastContent: string;

  // for modal base
  className?: string;
  appendTo?: string;
  isInline?: boolean;
  customZIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
  (event: "show"): void;
  (event: "after-hide"): void;
}>();

const XModalRef = ref<any>(null);
const containerVisible = ref(false);
// =================================
//  functions --打開
// =================================
function open() {
  if (props.isOpen) {
    // 同時打開toast與整個modal
    containerVisible.value = true;
    // 1.5秒關閉toast，並在動畫結束後自動執行onToastAfterLeave()，關閉整個modal
    setTimeout(() => {
      emit('update:isOpen', false);
    }, 1500);
  }
}
onMounted(open);
onUpdated(open);

function closeToast(): void {
  emit("update:isOpen", false);
}

// 動畫進來前，設定z-index
function onToastBeforeEnter(): void {
  if (props.isOpen) {
    XModalRef.value.onModalBeforeEnter();
  }
}

// 動畫進來,modal出現的時候，新增modal-in class,body class處理
function onToastEnter(): void {
  if (props.isOpen) {
    XModalRef.value.onModalEnter();
    emit("show");
  }
}

// =================================
// functions --關閉
// =================================

// 動畫結束後才可關閉整個modal：modal關閉、還原body class、modal-in
function onToastAfterLeave(): void {
  XModalRef.value.onModalAfterLeave();
  containerVisible.value = false;
  emit("after-hide");
}
</script>

<style scoped lang="scss">
@import "toast.scss";
</style>
