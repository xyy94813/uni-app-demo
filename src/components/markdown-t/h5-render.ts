import { h, createTextVNode, type VNode } from "vue";
import { toMarkdown } from "mdast-util-to-markdown";
import type { MDNodeRenderer, NodeRenderer, MDAstNodeType } from "./shared";

const defaultRender: NodeRenderer<VNode> = (node) =>
  createTextVNode(toMarkdown(node));

const renderBlockquote: NodeRenderer<VNode> = (node) =>
  h("blockquote", {}, safeRenderAstNodeChildren(node?.children));

const renderBreak: NodeRenderer<VNode> = () => h("br");

const renderCode: NodeRenderer<VNode> = (node) =>
  h("pre", {}, [h("code", {}, createTextVNode(node.value))]);

// const renderDefinition: NodeRenderer<VNode> = (node) => defaultRender(node);

const renderEmphasis: NodeRenderer<VNode> = (node) =>
  h("em", {}, safeRenderAstNodeChildren(node?.children));

const renderHeading: NodeRenderer<VNode> = (node) =>
  h("h" + node.depth, {}, safeRenderAstNodeChildren(node?.children));

// const renderHtml: NodeRenderer<VNode> = (node) => defaultRender(node);

const renderImage: NodeRenderer<VNode> = (node) =>
  h("img", { src: node.url, alt: node.alt, title: node?.title });

// const renderImageReference: NodeRenderer<VNode> = (node) => defaultRender(node);

const renderInlineCode: NodeRenderer<VNode> = (node) =>
  h("code", {}, createTextVNode(node.value));

const renderLink: NodeRenderer<VNode> = (node) =>
  h(
    "a",
    {
      href: node.url,
    },
    safeRenderAstNodeChildren(node?.children)
  );

const renderLinkReference: NodeRenderer<VNode> = (node) =>
  h(
    "a",
    {
      href: "#" + node.identifier,
      alt: node.label,
      title: node.label,
    },
    safeRenderAstNodeChildren(node?.children)
  );

const renderList: NodeRenderer<VNode> = (node) =>
  h(node.ordered ? "ol" : "ul", {}, safeRenderAstNodeChildren(node?.children));

const renderListItem: NodeRenderer<VNode> = (node) =>
  h("li", {}, safeRenderAstNodeChildren(node?.children));

const renderParagraph: NodeRenderer<VNode> = (node) =>
  h("p", {}, safeRenderAstNodeChildren(node?.children));

const renderRoot: NodeRenderer<VNode> = (node) =>
  h("block", {}, safeRenderAstNodeChildren(node?.children));

const renderStrong: NodeRenderer<VNode> = (node) =>
  h("strong", {}, safeRenderAstNodeChildren(node?.children));

const renderText: NodeRenderer<VNode> = (node) => createTextVNode(node.value);

const renderThematicBreak: NodeRenderer<VNode> = () => h("hr", {});

const nodeRender: MDNodeRenderer<VNode> = {
  blockquote: renderBlockquote,
  break: renderBreak,
  code: renderCode,
  definition: defaultRender,
  emphasis: renderEmphasis,
  heading: renderHeading,
  html: defaultRender,
  image: renderImage,
  imageReference: defaultRender,
  inlineCode: renderInlineCode,
  link: renderLink,
  linkReference: renderLinkReference,
  list: renderList,
  listItem: renderListItem,
  paragraph: renderParagraph,
  root: renderRoot,
  strong: renderStrong,
  text: renderText,
  thematicBreak: renderThematicBreak,
};

const renderAstNode = (node: { type: MDAstNodeType }): VNode => {
  const renderer = nodeRender[node.type] || defaultRender;
  return renderer(node);
};

const safeRenderAstNodeChildren = (
  children?: any[],
  mapFn: any = renderAstNode
): undefined | any[] => {
  if (!Array.isArray(children) || !children.length) {
    return undefined;
  }
  return children.map(mapFn);
};

export default renderAstNode;
