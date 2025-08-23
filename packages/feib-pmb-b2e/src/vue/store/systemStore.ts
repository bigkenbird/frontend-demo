import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', {
  state: () => ({
    loading: true,
    backTime: 0,
    backKxy: '',
  }),

  getters: {
    isLoading: (state) => {
      return state.loading === true;
    },
  },

  actions: {
    showLoading(): void {
      this.loading = true;
    },
    hideLoading(): void {
      this.loading = false;
    },
    setBack(): void {
      this.backTime = new Date().getTime();
    },
    isBack(): boolean {
      return new Date().getTime() - this.backTime < 100;
    },
    setBackDataKxy(x: string): void {
      this.backKxy = x;
    },
    getBackDataKxy(): string {
      return this.backKxy;
    },
  },
});
