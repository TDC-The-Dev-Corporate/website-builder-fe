"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useEffect } from "react";
import { fetchTemplates } from "@/lib/redux/slices/templatesSlice";
import { RootState } from "@/lib/redux/store";
import AppLoader from "@/app/components/loader/AppLoader";

export default function TemplateSelector() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { templates, loading } = useAppSelector(
    (state: RootState) => state.templates
  );

  useEffect(() => {
    dispatch(fetchTemplates());
  }, []);

  const handleTemplateSelect = (template: Template) => {
    localStorage.setItem("template", JSON.stringify(template));
    router.push("/AIWebsiteBuilders/editor");
  };
  return (
    <AppLoader loading={loading}>
      <Grid container spacing={5} padding={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={3} key={template.id}>
            <Card
              sx={{
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
                transition: "0.3s",
              }}
              onClick={() => handleTemplateSelect(template)}
            >
              <CardActionArea>
                <CardMedia sx={{ height: 140 }}>
                  <Image
                    src={template.thumbnail}
                    alt={template.name}
                    width={300}
                    height={200}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </CardMedia>

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
    </AppLoader>
  );
}
