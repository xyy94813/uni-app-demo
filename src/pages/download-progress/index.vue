<template>
  <view>
    <up-text v-if="!!selectedResource" :text="selectedResource"></up-text>
    <up-text v-else type="error" text="请选选中资源"></up-text>
  </view>
  <view>
    当前进度：{{ progress }}
    <u-line-progress :percentage="(progress * 100).toFixed(2)" activeColor="green"></u-line-progress>
  </view>
  <view>
    <up-button type="primary" @click="showPicker = true">切换资源</up-button>
    <up-picker :show="showPicker" :columns="resourcePickerCols" @confirm="handleResourceChange"
      @cancel="showPicker = false" closeOnClickOverlay="true" @close="showPicker = false" />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import sleep from '../../utils/sleep'

const resourceList = [
  'https://pic4.zhimg.com/80/v2-7aedaf1862b3c043fdce5122df30963f.webp',
  'https://pic1.zhimg.com/80/v2-cceadf7b009f6f267e5fa6bf115f0a78.webp',
  'https://pic4.zhimg.com/80/v2-91c5dd1ca488a5d76c6558698f91d5eb.webp',
]

const showPicker = ref(false);
const selectedResource = ref<string | null>(null);
const resourcePickerCols = reactive([resourceList.map((item, index) => `资源 ${index}`)])

const progress = ref(0);
const handleResourceChange = async (selected) => {
  // 关闭 picker
  showPicker.value = false;
  // 进度重置
  progress.value = 0;

  selectedResource.value = resourceList[selected.indexs[0]];

  await sleep(2_000) // delay 便于查看效果
  let done = false
  const updateProgress = async () => {
    if (done) { return }
    await sleep(50); // 只能模拟 
    const newProgress = progress.value + 0.1;
    progress.value = Math.min(0.95, newProgress)
    await updateProgress()
  }

  // 获取请求资源
  uni.request({
    url: selectedResource.value + '?' + performance.now(),
    success(res) {
      done = true;
      progress.value = 1;
    },
    progressUpdate: (res) => {
      console.log('onProgressUpdate', res)
      progress.value = res.progress;
    }
  })
}
// fetch 仅能在 web 环境，以下行为微信浏览器下会失效
// const handleResourceChange = async (selected) => {
//   // 关闭 picker
//   showPicker.value = false;
//   // 进度重置
//   progress.value = 0;

//   await sleep(200) // delay 便于查看效果
//   // 获取请求资源
//   const newResourceURL = resourceList[selected.indexs[0]];
//   const response = await fetch(newResourceURL + '?' + performance.now());
//   // 资源总大小
//   const contentLen = parseFloat(response.headers.get('Content-Length') ?? '0')
//   // 基于 reader 获取当前的字节大小
//   const reader = await response.body!.getReader();

//   let receivedLength = 0;
//   const updateProgress = async () => {
//     const result = await reader.read();
//     if (result.done) {
//       progress.value = 1;
//       return
//     }
//     // receivedLength += result.value.length;
//     receivedLength += result.value.byteLength;
//     progress.value = receivedLength / contentLen;
//     await sleep(50)
//     await updateProgress()
//   }

//   await updateProgress();
// }
</script>

<style></style>
