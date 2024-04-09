<template>
    <slot></slot>
    <view :class="['mode-mask', themeClazz]">
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useAPPStore from '../../stores/app-stores';

const appStore = useAPPStore();

const themeClazz = computed(() => `mode-mask-${appStore.theme}`)
</script>

<style lang="scss" scoped>
.content {
    color: #fff
}

.mode-mask {
    position: fixed;
    display: block;
    inset: 0;
    pointer-events: none;

    @media (prefers-color-scheme: light) {
        &.mode-mask-light {
            display: none;
        }

        &.mode-mask-dark {
            mix-blend-mode: difference;
            color: #f5f5f5;
            background-color: #000000;
        }
    }

    @media (prefers-color-scheme: dark) {
        &.mode-mask-light {
            mix-blend-mode: difference;
            background-color: #f5f5f5;
        }

        &.mode-mask-dark {
            display: none;
        }
    }
}
</style>
