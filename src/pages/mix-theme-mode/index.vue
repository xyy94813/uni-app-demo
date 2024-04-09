<template>
  <base-layout>
    <view :class="$style.page">
      <view :class="$style.content">
        <image :class="$style.logo" src="/static/logo.png" />
        <view :class="$style['text-area']">
          <text :class="$style.title">基于 mix-blend-mode 切换暗黑模式</text>
        </view>
        <view :class="$style['text-area']">
          <text>参考 Drakmode.js</text>
        </view>
        <view :class="$style['text-area']">
          <text>https://github.com/sandoche/Darkmode.js</text>
        </view>
      </view>
      <view style="display: flex; gap: 8px;">
        <up-button type="info" text="切换主题" @click="showThemePicker"></up-button>
      </view>
    </view>
  </base-layout>
  <theme-action-sheet :show="themePickerShowed" @select="onThemePickerConfirm" @close="hideThemePicker" />
</template>

<script setup lang="ts">
import BaseLayout from "../../components/theme-mask-layout/theme-mask-layout.vue";
import useShowControl from "../../composition/useShowControl";
import ThemeActionSheet from "../../components/theme-action-sheet/theme-action-sheet.vue";
import useAPPStore from "../../stores/app-stores";

const appStore = useAPPStore();

const {
  showed: themePickerShowed,
  show: showThemePicker,
  hide: hideThemePicker,
} = useShowControl(false)

const onThemePickerConfirm = (selected: any) => {
  hideThemePicker();
  appStore.changeTheme(selected.key)
}
</script>

<style lang="scss" module>
@import 'uview-plus/theme.scss';

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $u-info;

  @media (prefers-color-scheme: dark) {
    & {
      color: $u-info-dark;
    }
  }
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
  color: $u-info;
}
</style>