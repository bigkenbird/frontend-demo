import { InjectionKey, Ref } from 'vue';

export type ActiveKeyType = string | string[] | readonly string[];

export const ActiveKeyName = Symbol() as InjectionKey<Ref<ActiveKeyType>>;
export const OnChangeName = Symbol() as InjectionKey<
  (val: ActiveKeyType) => void
>;
