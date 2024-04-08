<template>
    <u-action-sheet title="切换主题" :actions="actions" :show="$props.show" @select="$emit('select', $event)"
        @close="$emit('close', $event)"></u-action-sheet>
</template>

<script setup lang="ts">
// vue 的透传行为在小程序中不生效
defineProps(['show'])
defineEmits(['select', 'close'])

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