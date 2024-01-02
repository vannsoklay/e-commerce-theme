import { type Component } from "solid-js";
import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";
import { createSignal, createEffect, Setter } from "solid-js";

interface Props {
  data: string;
}

async function run(value: string, callback: Setter<string>) {
  return new Promise((resolve) => {
    const editor = createHeadlessEditor({
      namespace: "Editor",
      nodes: [],
      onError: () => {},
    });

    editor.setEditorState(editor.parseEditorState(value));

    editor.update(() => {
      let html = $generateHtmlFromNodes(editor, null);
      callback(html);
    });
  });
}
const empty =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
export const LexicalViewer: Component<Props> = ({ data = empty }) => {
  const [content, setContent] = createSignal("");

  createEffect(async () => {
    await run(data, setContent);
  });
  return <div innerHTML={content()}></div>;
};
