<template>
    <rich-text v-if="renderedMarkdown" :nodes="renderedMarkdown">
    </rich-text>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

const props = defineProps(['content'])

const markdown = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            try {
                return hljs.highlight(code, { language }).value;
            } catch (error) {
                return code
            }
        },
    })
);

const renderedMarkdown = computed(() => {
    if (!props.content) {
        return ''
    }
    return `<div class="markdown-body">${markdown.parse(props.content)}</div>` // to html str
});
</script>

<style lang="scss">
@import url('./github-markdown-light.scss');
@import url('./github-hightlight.scss'); // 样式来自于 hightlight.js v12 版本

.markdown-body {
    padding: 12px 24px;

    code.hljs {
        padding: 4px !important; // trick way
    }
}
</style>
