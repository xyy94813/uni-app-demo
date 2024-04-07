import { ref } from 'vue';
import { defineStore } from 'pinia';

export type APPTheme = 'light' | 'dark';

export type APPLang = 'zh-cn' | 'en';

export type APPStore = {
  systemInfo: UniApp.GetSystemInfoResult;
  theme: APPTheme;
  lang: APPLang;
  changeTheme: (newTheme: APPTheme) => void;
};

export default defineStore('app', () => {
  const systemInfo = uni.getSystemInfoSync();
  const theme = ref<APPTheme>('light');
  const lang = ref<APPLang>('zh-cn');

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
