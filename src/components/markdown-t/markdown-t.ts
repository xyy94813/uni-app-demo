import { defineComponent, h } from "vue";
import UText from "uview-plus/components/u--text/u--text.vue";
import { safeExecuteDecorator } from "../../utils/safeExecute";
import { injectAPPContext } from "../app-context";
import mdTextToVNode from "./mdTextToVNode";

const safeMdTextToVNode = safeExecuteDecorator(
  mdTextToVNode,
  h(UText, { type: "error", text: "解析 Markdown 失败" })
);

export default defineComponent({
  __name: "markdown-t",
  props: ["content"],
  setup(props) {
    const appCtx = injectAPPContext();
    const uniPlatform = appCtx.systemInfo.uniPlatform;
    return () => safeMdTextToVNode(props.content, uniPlatform);
  },
});
