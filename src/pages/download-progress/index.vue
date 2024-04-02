<template>
  <view>
    当前进度：{{ progress.toFixed(2) }} %
    <u-line-progress :percentage="progress.toFixed(2)" activeColor="green"></u-line-progress>
  </view>
  <view>
    <up-text v-if="!!selectedResource" :text="selectedResource"></up-text>
    <up-text v-else type="error" text="请选选中资源"></up-text>
  </view>
  <view>
    <up-button type="primary" @click="showPicker = true">切换资源</up-button>
  </view>
  <up-picker :show="showPicker" :columns="resourcePickerCols" @confirm="handleResourceChange"
    @cancel="showPicker = false" closeOnClickOverlay="true" @close="showPicker = false" />
  <u-toast ref="uToastRef"></u-toast>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { injectAPPContext } from '../../components/app-context'
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
const safeUpdateProgress = (newVal: number) => {
  progress.value = Math.min(100, newVal);
}

const uToastRef = ref<any | null>(null)
function showToast(params: any) {
  uToastRef.value.show(params);
}

type RequestAndUpdateProgress = (reqURL: string) => Promise<void>;

const requestAndUpdateProgressRepo = new Map<string, RequestAndUpdateProgress>();
requestAndUpdateProgressRepo.set('default', async (reqURL: string) => {
  let done = false
  // uni.request 无法监听，只能模拟
  const updateProgress = async () => {
    if (done) { return }
    const newProgress = progress.value + 0.1;
    safeUpdateProgress(Math.min(95, newProgress))
    await sleep(50); // 只能模拟 
    await updateProgress()
  }

  // 获取请求资源
  uni.request({
    url: reqURL,
    success(res) {
      done = true;
      safeUpdateProgress(100)
    },
  })

  await updateProgress();
})
requestAndUpdateProgressRepo.set('web', async (reqURL: string) => {
  // fetch 仅能在 web 环境，以下行为微信浏览器下会失效
  const response = await fetch(reqURL);
  // 资源总大小
  const contentLen = parseFloat(response.headers.get('Content-Length') ?? '0')
  // 基于 reader 获取当前的字节大小
  const reader = await response.body!.getReader();

  let receivedLength = 0;
  const updateProgress = async () => {
    const result = await reader.read();
    if (result.done) {
      safeUpdateProgress(100)
      return
    }
    // receivedLength += result.value.length;
    receivedLength += result.value.byteLength;
    safeUpdateProgress((receivedLength / contentLen) * 100)
    await sleep(50)
    await updateProgress()
  }

  await updateProgress();
})

const appContext = injectAPPContext();
const uniPlatform = appContext.systemInfo.uniPlatform

let requestAndUpdateProgress: RequestAndUpdateProgress;
if (requestAndUpdateProgressRepo.has(uniPlatform)) {
  requestAndUpdateProgress = requestAndUpdateProgressRepo.get(uniPlatform)!
} else {
  requestAndUpdateProgress = requestAndUpdateProgressRepo.get('default')!
}


const handleResourceChange = async (selected: any) => {
  // 关闭 picker
  showPicker.value = false;
  // 进度重置
  progress.value = 0;

  selectedResource.value = resourceList[selected.indexs[0]];

  const reqURL = selectedResource.value + '?' + performance.now()

  await sleep(1_000) // delay 便于查看效果

  await requestAndUpdateProgress(reqURL)

  showToast({
    type: 'success',
    message: '下载完成',
    icon: false,
  })
}
</script>

<style></style>
