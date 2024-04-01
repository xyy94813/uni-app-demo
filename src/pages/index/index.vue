<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="text-area">
      <up-text type="info" :text="subTitle" class="title" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { injectAPPContext } from '../../components/app-context'

const appContext = injectAPPContext();
console.log(appContext.systemInfo.app)

const title = ref('这是一个轻量级的调音器');
const subTitle = ref(`当前平台：${appContext.systemInfo.uniPlatform}`);
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
  margin-top: 200rpx;
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
