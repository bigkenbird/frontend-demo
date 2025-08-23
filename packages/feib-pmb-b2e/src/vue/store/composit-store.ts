import { OptionValueType } from '@/components/atomic/form/dropdown/dropdown-option-value-type';
import { defineStore } from 'pinia';

export const useCompositDataStore = defineStore('composit-data', {
  state: () => ({
    taskList: null as OptionValueType[],
    adSpaceList: null as OptionValueType[],
  }),

  getters: {
    taskData: (state) => (state.taskList ? state.taskList : null),
    adSpaceData: (state) => (state.adSpaceList ? state.adSpaceList : null),
  },

  actions: {
    updateTaskData(taskData: OptionValueType[]) {
      this.taskList = taskData;
    },
    getTaskName(taskId: string) {
      const data = this.taskList.filter((i) => i.value == taskId);
      return data && data.length == 1 ? data[0].label : null;
    },

    updateAdSpaceData(adSpaceData: OptionValueType[]) {
      this.adSpaceList = adSpaceData;
    },
    getAdSpaceName(adSpaceId: string) {
      const data = this.adSpaceList.filter((i) => i.value == adSpaceId);
      return data && data.length == 1 ? data[0].label : null;
    },
  },
});
