import React from "react";
import dynamic from "next/dynamic";

import { Box, Typography } from "@mui/material";

import { getFontSize } from "@/lib/utils";

const RichTextEditor = dynamic(() => import("../TextEditor/RichTextEditor"), {
  ssr: false,
});

interface SectionRendererProps {
  section: Section;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "hero":
      return (
        <Box
          sx={{
            background: section.styles.backgroundColor,
            py: 5,
            px: 3,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {section.content.image && (
            <Box
              component="img"
              src={section.content.image}
              alt="Hero"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.7,
              }}
            />
          )}
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                color: section.styles.textColor,
                mb: 2,
                fontSize: section.styles.fontSize
                  ? getFontSize(section.styles.fontSize)
                  : getFontSize("4xl"),
                fontStyle: section.styles.fontStyle || "normal",
                fontFamily: section.styles.fontFamily || "Helvetica",
                fontWeight: section.styles.fontWeight || "800",
              }}
            >
              {section.content.heading}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: section.styles.textColor,
                fontSize: section.styles.fontSize
                  ? getFontSize(section.styles.fontSize)
                  : getFontSize("4xl"),
                fontStyle: section.styles.fontStyle || "normal",
                fontFamily: section.styles.fontFamily || "Helvetica",
                fontWeight: section.styles.fontWeight || "800",
              }}
            >
              {section.content.subheading}
            </Typography>
          </Box>
        </Box>
      );
    case "about":
      return (
        <Box
          sx={{
            backgroundColor: section.styles.backgroundColor || "white",
            py: 4,
            px: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: section.styles.textColor,
              mb: 3,
              fontSize: section.styles.fontSize
                ? getFontSize(section.styles.fontSize)
                : getFontSize("lg"),
              fontStyle: section.styles.fontStyle || "normal",
              fontFamily: section.styles.fontFamily || "Helvetica",
              fontWeight: section.styles.fontWeight || "500",
            }}
          >
            {section.content.heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: section.styles.textColor || "black",
              fontFamily: section.styles.fontFamily || "Helvetica",
            }}
          >
            {section.content.description}
          </Typography>
        </Box>
      );
    case "projects":
      return (
        <Box
          sx={{
            backgroundColor: section.styles.backgroundColor || "white",
            py: 4,
            px: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: section.styles.textColor || "black",
              mb: 4,
              fontSize: section.styles.fontSize
                ? getFontSize(section.styles.fontSize)
                : getFontSize("xl"),
              fontStyle: section.styles.fontStyle || "normal",
              fontFamily: section.styles.fontFamily || "Helvetica",
              fontWeight: section.styles.fontWeight || "600",
            }}
          >
            {section.content.heading}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 3,
            }}
          >
            {section.content.projects.map((project: any, index: number) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: 1,
                }}
              >
                <Box
                  component="img"
                  src={project.image}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontSize: section.styles.fontSize
                        ? getFontSize(section.styles.fontSize)
                        : getFontSize("xl"),
                      fontStyle: section.styles.fontStyle || "normal",
                      fontFamily: section.styles.fontFamily || "Helvetica",
                      fontWeight: section.styles.fontWeight || "600",
                      color: section.styles.textColor || "black",
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: section.styles.textColor || "black",
                      fontFamily: section.styles.fontFamily || "Helvetica",
                    }}
                  >
                    {project.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      );
    default:
      return null;
  }
}
