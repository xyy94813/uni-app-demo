<script setup lang="ts">
import { onLaunch, onShow, onHide, onPageNotFound, onError } from "@dcloudio/uni-app";

const pages = getCurrentPages();
if (pages.length > 0) {
  console.log(pages);
}

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
    url: '/pages/index/index?fromPage=404'
  });
})

onError(() => {
  // 错误日志上报
})
</script>

<style lang="scss">
/** */
</style>
