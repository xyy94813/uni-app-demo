<template>
    <up-picker :columns="columns" :closeOnClickOverlay="true" :show="$props.show" @confirm="$emit('confirm', $event)"
        @cancel="$emit('cancel', $event)" @close="$emit('close', $event)" />
</template>

<script setup lang="ts">
// vue 的透传行为在小程序中不生效
defineProps(['show'])
defineEmits([
    'confirm',
    'cancel',
    'close',
])

const columns = [
    ['en', 'zh-CN'],
]
</script>

<style lang="scss" scoped></style>