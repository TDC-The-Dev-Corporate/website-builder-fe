"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Paper } from "@mui/material";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
) as typeof import("react-draft-wysiwyg").Editor;

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (value) {
      const contentBlock = htmlToDraft(value);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, []);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    onChange(html);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        overflow: "visible",
        position: "relative",
        zIndex: 1,
        // Add these new styles
        "& .rdw-editor-toolbar": {
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          zIndex: 100,
        },
      }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "link",
            "emoji",
            "image",
            "history",
          ],
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
              "superscript",
              "subscript",
            ],
          },
          blockType: {
            inDropdown: true,
            options: [
              "Normal",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
              "Blockquote",
              "Code",
            ],
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          },
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],
          },
          textAlign: {
            inDropdown: false,
            options: ["left", "center", "right", "justify"],
          },
        }}
        editorStyle={{
          height: "200px",
          padding: "0 1rem",
          fontSize: "1rem",
          lineHeight: "1.5",
        }}
        toolbarStyle={{
          border: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          marginBottom: 0,
        }}
        wrapperStyle={{
          border: "none",
        }}
      />
    </Paper>
  );
};

export default RichTextEditor;
