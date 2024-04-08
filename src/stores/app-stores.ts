import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  createTransformerConf,
  createTransformer,
  transformData,
 } from '../utils/dataTransform';

export type APPTheme = 'light' | 'dark';

export type APPLang = 'zh-CN' | 'en';

export type APPStore = {
  systemInfo: UniApp.GetSystemInfoResult;
  theme: APPTheme;
  lang: APPLang;
  changeTheme: (newTheme: APPTheme) => void;
};

const langTransformer = createTransformer<string, APPLang>([
  // 无论简体/繁体，新加坡，台湾、统一转换成 zh-CN
  createTransformerConf(/^zh[-_]/i, () => 'zh-CN' as APPLang),
]);

const themeTransformer = createTransformer<string, APPTheme>([
  createTransformerConf(/^dark$/i, () => 'dark' as APPTheme),
  createTransformerConf(/^light$/i, () => 'light' as APPTheme),
  createTransformerConf(/^.*?/, () => 'light' as APPTheme), // 未知主题转换成 light
]);
// 无论简体/繁体，新加坡，台湾、统一转换成 zh-CN

export default defineStore('app', () => {
  const systemInfo = uni.getSystemInfoSync();
  const defaultTheme = transformData(
    themeTransformer,
    systemInfo.hostTheme 
    || systemInfo.osTheme 
    || systemInfo.theme
    || 'light' // TODO:
  );
  const theme = ref<APPTheme>(defaultTheme);

  const defaultLanguage = transformData(
    langTransformer,
    systemInfo.language 
    || systemInfo.appLanguage
    || systemInfo.hostLanguage
    || systemInfo.osLanguage
    || 'zh-CN' // TODO:
  );

  const lang = ref<APPLang>(defaultLanguage);

  const changeTheme = (newTheme: APPTheme) => {
    theme.value = newTheme;
  };

  const changeLanguage =(newLang: APPLang) => {
    lang.value = newLang;
  }

  return {
    systemInfo,
    theme,
    lang,
    // actions
    changeTheme,
    changeLanguage,
  };
});
