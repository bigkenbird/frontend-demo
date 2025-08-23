import { ref } from "vue";

export const messageShow = ref(false);
export const message = ref<string>("");

export function showMessage(content: string) {
  message.value = content;
  window.scrollTo(0, 0);
  messageShow.value = true;
}

export function closeMessage() {
  messageShow.value = false;
}
