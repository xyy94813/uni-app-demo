<template>
    <markdown :content="readeMe"></markdown>
    <markdown :content="codeHightLight"></markdown>
</template>

<script setup>
import readeMe from '../../../README.md?raw'
import markdown from '../../components/markdown/markdown'

const codeHightLight = `
---

以下是 code 高亮测试

\`\`\`js
const fn = async (a: number): boolean => true;
\`\`\`

---

\`\`\`yml
a: a
list:
  - a
  - b
\`\`\`
`
</script>

<style lang="scss" scoped></style>
