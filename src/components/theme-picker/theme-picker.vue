<template>
    <up-picker :columns="columns" :closeOnClickOverlay="true" />
</template>

<script setup lang="ts">
const columns = [
    ['light', 'dark'],
]
</script>

<style lang="scss" scoped></style>