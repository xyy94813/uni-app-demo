<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="text-area">
      <up-text type="info" :text="subTitle" class="title" />
    </view>
    <view style="display: flex; gap: 8px;">
      <up-button type="info" text="切换主题" @click="showThemePicker = true"></up-button>
      <up-button type="info" text="切换语言" @click="showLangPicker = true"></up-button>
    </view>
    <u-list>
      <u-list-item v-for="item in pageConfList" :key="item.path">
        <navigator :url="item.path">
          <u-cell :title="item.label">
          </u-cell>
        </navigator>
      </u-list-item>
    </u-list>
  </view>
  <theme-action-sheet :show="showThemePicker" @select="onThemePickerConfirm" />
  <lang-picker :show="showLangPicker" @confirm="onLangPickerConfirm" @cancel="showLangPicker = false"
    @close="showLangPicker = false" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ThemeActionSheet from "../../components/theme-action-sheet/theme-action-sheet.vue";
import LangPicker from "../../components/lang-picker/lang-picker.vue";
import useAPPStore from "../../stores/app-stores";
import pagesConf from '../../pages.json'

const appStore = useAPPStore();

const title = '基于 uni-app 的 demo';
const subTitle = computed(() =>
  `当前平台：${appStore.systemInfo.uniPlatform}
当前主题：${appStore.theme}
当前语言：${appStore.lang}
`)

const pageConfList = pagesConf
  .pages
  .slice(1)
  .map((conf) => ({
    path: '/' + conf?.path,
    label: conf?.style?.navigationBarTitleText || ''
  }))


const showThemePicker = ref(false);
const onThemePickerConfirm = (selected: any) => {
  appStore.changeTheme(selected.key)
  showThemePicker.value = false;
}
const showLangPicker = ref(false);
const onLangPickerConfirm = (selected: any) => {
  appStore.changeLanguage(selected.value[0])
  showLangPicker.value = false;
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 50rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
