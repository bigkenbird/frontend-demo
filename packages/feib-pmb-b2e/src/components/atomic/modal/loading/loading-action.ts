import { ref } from "vue";

export const loadingShowRef = ref(false);

export function showLoading() {
  loadingShowRef.value = true;
}

export function hideLoading() {
  loadingShowRef.value = false;
}
