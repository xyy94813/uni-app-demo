<template>
    <u-action-sheet :actions="actions" :title="title"></u-action-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('切换主题')
const actions = [
    {
        name: '浅色主题',
        key: 'light',
    },
    {
        name: '深色主题',
        key: 'dark'
    },
]
</script>

<style lang="scss" scoped></style>