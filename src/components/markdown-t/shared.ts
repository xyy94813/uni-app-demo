export interface NodeRenderer<Result = any> {
  (node: any): Result;
}

export type MDAstNodeType =
  | "blockquote"
  | "break"
  | "code"
  | "definition"
  | "emphasis"
  | "heading"
  | "html"
  | "image"
  | "imageReference"
  | "inlineCode"
  | "link"
  | "linkReference"
  | "list"
  | "listItem"
  | "paragraph"
  | "root"
  | "strong"
  | "text"
  | "thematicBreak";

export type MDNodeRenderer<Result = any> = Record<
  MDAstNodeType,
  NodeRenderer<Result>
>;
