"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import { Box } from "@mui/material";

import Navigation from "@/app/components/editor/Navigation";
import SectionRenderer from "@/app/components/editor/SectionRenderer";

interface WebsiteProps {
  template: TemplateLayout;
}

export default function Portfolio({ template }: WebsiteProps) {
  const [layout, setLayout] = useState<TemplateLayout>(template);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <Box sx={{ flex: 1, bgcolor: "grey.100", overflow: "auto" }}>
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            transition: "all 0.3s",
          }}
        >
          {layout.navigation && (
            <Navigation
              navigation={layout.navigation}
              //   drawerOpen={drawerOpen}
              //   onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
            />
          )}

          {layout.sections.map((section) => (
            <SectionRenderer section={section} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
