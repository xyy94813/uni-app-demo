import { unified } from "unified";
import remarkParse from "remark-parse";
import { map } from "unist-util-map";
import renderH5Node from "./h5-render";

// 基于不同平台创建 mdProcessor
const mdProcessor = unified().use(remarkParse).freeze();

const supportUniPlatform = ["web"];

const mdTextToVNode = (mdText?: string, uniPlatform?: string) => {
  if (!supportUniPlatform.includes(uniPlatform!)) {
    throw new Error("不支持该平台：" + uniPlatform);
  }

  if (!mdText) return [];
  const mdAST = mdProcessor.parse(mdText);
  return map(mdAST, renderH5Node as any);
};

export default mdTextToVNode;
