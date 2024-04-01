<template>
  <view class="content" v-if="!pageLoading">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="text-area">
      <text class="title">{{ subTitle }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, } from 'vue'
import { injectAPPContext } from '../../components/app-context'
import { providePageContext } from '../../components/page-context'
import sleep from '../../utils/sleep'
import onInterval from '../../composition/onInterval'

const appContext = injectAPPContext();

const pageLoading = ref(false);

const reloaders: Function[] = [];
const registryReloads = (reloader) => {
  reloaders.push(reloader);
  return () => {
    reloaders.splice(reloaders.indexOf(reloader), 1);
  }
}

registryReloads(() => sleep(1_000))

const refetchPage = async () => {
  pageLoading.value = true;
  await Promise.allSettled(reloaders.map(fn => fn()));
  pageLoading.value = false;
}

onInterval(refetchPage, 3000)

const title = ref('这是一个轻量级的调音器');
const subTitle = ref(`当前平台：${appContext.systemInfo.uniPlatform}`);

const pageCtx: any = {
  pageId: 'page-1',
  isLoading: pageLoading.value,
  // pagePath: 'pages/page-1/index',
  refetchPage,
  registryReloads,
}

providePageContext(pageCtx);
</script>

<style>
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
