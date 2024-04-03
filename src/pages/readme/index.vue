<template>
  <markdown :content="readeMe"></markdown>
  <markdown :content="codeHightLight"></markdown>
</template>

<script setup>
import { ref } from 'vue'
import readeMe from '../../../README.md?raw'
import markdown from '../../components/markdown/markdown'

// weixin小程序、支付宝小程序必须用 ref 绑定
const codeHightLight = ref(`
---

#### 以下是 code 高亮测试

\`\`\`js
const fn = async (a: number): boolean => true;
\`\`\`

---

\`\`\`yml
version: 3

list:
  - a
  - b
  
\`\`\`
`)
</script>

<style lang="scss" scoped></style>
