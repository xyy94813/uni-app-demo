<template>
    <markdown :content="desc"></markdown>
    <markdown :content="mdContent"></markdown>
</template>

<script setup>
import { ref } from 'vue'
import markdown from '../../components/markdown-t/markdown-t.ts'
import mdContent from './base-test.md?raw'

const desc = ref(`
# markdown to ast to vnode

当前实现仅 web 实现有效。
因为使用的是 createVNode 对应不同的平台应该使用不同的 creator

TODO List：

1. VNode 为自定义组件（样式控制）
2. 支持多端转换，实现上应基于不同平台构建 mdProcessor
3. 扩展 GFW
4. 提供可修改的插件


往下是测试 md 展示

-----
`)
</script>

<style lang="scss" scoped></style>