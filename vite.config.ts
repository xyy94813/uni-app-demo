import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

const ES_TARGET = 'ES2019'; // 支付宝小程序不支持 nullish coalescing operator。该功能是 es2020 标准推出的，但支付宝只支持 es2019。

// https://vitejs.dev/config/
const viteConf = defineConfig({
  plugins: [
    uni(),
  ],
  build: {
    target: ES_TARGET,
  },
  esbuild: {
    target: ES_TARGET,
    tsconfigRaw: {
      compilerOptions: {
        target: ES_TARGET,
      }
    }
  }
});

export default viteConf