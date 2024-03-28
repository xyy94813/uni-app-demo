import { provide, inject } from 'vue';

const contextKey = Symbol('appContext');

export type APPContext = {
  systemInfo: UniApp.GetSystemInfoResult;
};

export const provideAPPContext = (ctx: APPContext) =>
  provide<APPContext>(contextKey, ctx);

export const injectAPPContext = () => inject<APPContext>(contextKey)!;
// TODO
// export const injectAPPContext = () => inject(contextKey, defaultValue, xxxxx)
