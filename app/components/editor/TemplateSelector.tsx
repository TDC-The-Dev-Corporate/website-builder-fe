"use client";

import { Template } from "@/app/types";
import Image from "next/image";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

interface TemplateSelectorProps {
  templates: Template[];
  onSelect: (template: Template) => void;
}

export default function TemplateSelector({
  templates,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <Grid container spacing={3} padding={3}>
      {templates.map((template) => (
        <Grid item xs={12} sm={6} md={4} key={template.id}>
          <Card
            sx={{
              cursor: "pointer",
              "&:hover": { boxShadow: 6 },
              transition: "0.3s",
            }}
            onClick={() => onSelect(template)}
          >
            <CardActionArea>
              {/* Thumbnail Image */}
              <CardMedia sx={{ height: 140 }}>
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  width={300}
                  height={200}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </CardMedia>

              {/* Template Name */}
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {template.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
