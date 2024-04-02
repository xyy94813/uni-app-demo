<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="text-area">
      <up-text type="info" :text="subTitle" class="title" />
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
</template>

<script setup lang="ts">
import { injectAPPContext } from '../../components/app-context'
import pagesConf from '../../pages.json'

const appContext = injectAPPContext();

const title = '基于 uni-app 的 demo';
const subTitle = `当前平台：${appContext.systemInfo.uniPlatform}`

// console.log(import.meta.url)
const pageConfList = pagesConf
  .pages
  .slice(1)
  .map((conf) => ({
    path: '/' + conf?.path,
    label: conf?.style?.navigationBarTitleText || ''
  }))
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
