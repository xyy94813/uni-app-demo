<template>
    <view class="markdown-body" v-if="renderedMarkdown" v-html="renderedMarkdown"></view>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { computed } from 'vue';

const props = defineProps(['content'])

const markdown = new MarkdownIt({
    html: true,
    highlight(str, lang) {
        let content: string;
        if (lang && hljs.getLanguage(lang)) {
            try {
                content = hljs.highlight(lang, str, true).value
            } catch (__) {
                content = markdown.utils.escapeHtml(str); // 防止 XSS 攻击
            }
        } else {
            content = markdown.utils.escapeHtml(str); // 防止 XSS 攻击
        }
        return `<pre class="hljs"><code>${content}</code></pre>`;
    },
});

const renderedMarkdown = computed(() => {
    if (!props.content) {
        return ''
    }
    return markdown.render(props.content)
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
