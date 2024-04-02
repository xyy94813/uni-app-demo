<template>
    <markdown :content="readeMe"></markdown>
</template>

<script setup>
import readeMe from '../../../README.md?raw'
import { defineAsyncComponent } from 'vue'

const markdown = defineAsyncComponent(() =>
    import('../../components/markdown.vue')
)
</script>

<style lang="scss" scoped></style>
