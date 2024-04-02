<template>
    <view class="markdown-body" v-if="renderedMarkdown" v-html="renderedMarkdown"></view>
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
            return hljs.highlight(code, { language }).value;

        },
    })
);

const renderedMarkdown = computed(() => {
    if (!props.content) {
        return ''
    }
    return markdown.parse(props.content)
});
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css');
@import url('highlight.js/scss/github.scss');

.markdown-body {
    padding: 24px;

    .hljs {
        padding: 24px !important; // trick way
    }
}
</style>
