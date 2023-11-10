<script setup lang="ts">
import { provide, reactive } from "vue";
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import AppContext from './components/app-context'

const systemInfo = uni.getSystemInfoSync();

const appContextData = reactive({
  systemInfo,
});

provide(AppContext, appContextData);

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
