<script setup lang="ts">
import { reactive } from "vue";
import { onLaunch, onShow, onHide, onPageNotFound, onError } from "@dcloudio/uni-app";

import { type APPContext, provideAPPContext } from './components/app-context'

const systemInfo = uni.getSystemInfoSync();

const appContextData = reactive<APPContext>({
  systemInfo,
});

const pages = getCurrentPages();
if (pages.length > 0) {
  console.log(pages);
}

provideAPPContext(appContextData);

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});

onPageNotFound(() => {
  uni.redirectTo({
    url: 'home?id=1'
  });
})

onError(() => {
  // 错误日志上报
})
</script>

<style lang="scss">
/** */
</style>
