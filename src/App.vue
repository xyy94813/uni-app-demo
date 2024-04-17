<script setup lang="ts">
import { watchEffect } from "vue";
import { onLaunch, onShow, onHide, onPageNotFound, onError, onThemeChange } from "@dcloudio/uni-app";
import useAPPStore from "./stores/app-stores";

const appStores = useAPPStore();

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

// 监听系统主题变化
onThemeChange(res => {
  appStores.changeTheme(res.theme)
})

const noNavPlatform: string[] = [
  'web',
];

// 相比 React hooks，Vue Composition API 可以提前 return
if (!noNavPlatform.includes(appStores.systemInfo.uniPlatform)) {
  const updateNav = () => {
    let navigationBarColor: Parameters<typeof uni.setNavigationBarColor>[0];
    // TODO: 通过配置文件或 scss 修改样式
    if (appStores.theme === 'dark') {
      navigationBarColor = {
        frontColor: '#ffffff', // 前景颜色
        backgroundColor: '#000000' // 背景颜色
      }
    } else {
      navigationBarColor = {
        frontColor: '#000000', // 前景颜色
        backgroundColor: '#ffffff' // 背景颜色
      }
    }
    uni.setNavigationBarColor(navigationBarColor);
  }
  // watch effect 至少执行一次进行依赖收集
  watchEffect(updateNav)
}
</script>

<style lang="scss">
/** */
</style>
