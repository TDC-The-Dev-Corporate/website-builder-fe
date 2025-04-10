"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import {
  Box,
  ButtonGroup,
  Button,
  Stack,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  Link as LinkIcon,
  Title,
  FormatQuote,
  Undo,
  Redo,
  FormatColorText,
  FormatClear,
  Code as CodeIcon,
} from "@mui/icons-material";
import { useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "30px",
  "36px",
  "48px",
  "60px",
];

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Monaco",
];

const colors = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d74242",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Typography,
      Color,
      Highlight.configure({ multicolor: true }),
      FontFamily,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  //   const setFontSize = useCallback(
  //     (size: string) => {
  //       editor?.chain().focus().setFontSize(size).run();
  //     },
  //     [editor]
  //   );

  const setFontFamily = useCallback(
    (family: string) => {
      editor?.chain().focus().setFontFamily(family).run();
    },
    [editor]
  );

  const setColor = useCallback(
    (color: string) => {
      editor?.chain().focus().setColor(color).run();
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <Stack spacing={1}>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <ButtonGroup size="small" variant="outlined">
          <Tooltip title="Bold">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={editor.isActive("bold") ? "primary" : "inherit"}
            >
              <FormatBold />
            </Button>
          </Tooltip>
          <Tooltip title="Italic">
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={editor.isActive("italic") ? "primary" : "inherit"}
            >
              <FormatItalic />
            </Button>
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined">
          <Select
            size="small"
            value=""
            onChange={(e) => setFontFamily(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="" disabled>
              Font Family
            </MenuItem>
            {fontFamilies.map((font) => (
              <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </MenuItem>
            ))}
          </Select>

          {/* <Select
            size="small"
            value=""
            onChange={(e) => setFontSize(e.target.value)}
            displayEmpty
            sx={{ minWidth: 80 }}
          >
            <MenuItem value="" disabled>
              Size
            </MenuItem>
            {fontSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select> */}
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined">
          <Tooltip title="Text Color">
            <Select
              size="small"
              value=""
              onChange={(e) => setColor(e.target.value)}
              displayEmpty
              sx={{ width: 50 }}
              IconComponent={() => <FormatColorText />}
            >
              <MenuItem value="" disabled>
                Color
              </MenuItem>
              <Box
                sx={{
                  p: 1,
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 1fr)",
                  gap: 0.5,
                }}
              >
                {colors.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: color,
                      cursor: "pointer",
                      border: "1px solid #ddd",
                      "&:hover": { opacity: 0.8 },
                    }}
                    onClick={() => setColor(color)}
                  />
                ))}
              </Box>
            </Select>
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined">
          <Tooltip title="Bullet List">
            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color={editor.isActive("bulletList") ? "primary" : "inherit"}
            >
              <FormatListBulleted />
            </Button>
          </Tooltip>
          <Tooltip title="Numbered List">
            <Button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color={editor.isActive("orderedList") ? "primary" : "inherit"}
            >
              <FormatListNumbered />
            </Button>
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined">
          <Tooltip title="Link">
            <Button
              onClick={() => {
                const url = window.prompt("Enter URL");
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              color={editor.isActive("link") ? "primary" : "inherit"}
            >
              <LinkIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Heading">
            <Button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              color={editor.isActive("heading") ? "primary" : "inherit"}
            >
              <Title />
            </Button>
          </Tooltip>
          <Tooltip title="Code">
            <Button
              onClick={() => editor.chain().focus().toggleCode().run()}
              color={editor.isActive("code") ? "primary" : "inherit"}
            >
              <CodeIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Quote">
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              color={editor.isActive("blockquote") ? "primary" : "inherit"}
            >
              <FormatQuote />
            </Button>
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup size="small" variant="outlined">
          <Tooltip title="Clear Formatting">
            <Button
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
            >
              <FormatClear />
            </Button>
          </Tooltip>
          <Tooltip title="Undo">
            <Button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo />
            </Button>
          </Tooltip>
          <Tooltip title="Redo">
            <Button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          "& .ProseMirror": {
            minHeight: 200,
            maxHeight: 500,
            overflowY: "auto",
            p: 2,
            "&:focus": {
              outline: "none",
              borderColor: "primary.main",
              boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
            },
            "& h1": { fontSize: "2em", fontWeight: 600, my: 1 },
            "& h2": { fontSize: "1.5em", fontWeight: 600, my: 1 },
            "& h3": { fontSize: "1.17em", fontWeight: 600, my: 1 },
            "& ul, & ol": { pl: 2 },
            "& a": { color: "primary.main", textDecoration: "underline" },
            "& blockquote": {
              borderLeft: "3px solid",
              borderColor: "divider",
              pl: 2,
              my: 1,
              color: "text.secondary",
              fontStyle: "italic",
            },
            "& code": {
              bgcolor: "action.selected",
              p: 0.5,
              borderRadius: 0.5,
              fontFamily: "monospace",
            },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Stack>
  );
};

export default RichTextEditor;
