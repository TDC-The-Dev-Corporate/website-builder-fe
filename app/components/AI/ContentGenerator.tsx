"use client";

import { useState } from "react";
import { Wand2, Copy, RefreshCw, Sparkles } from "lucide-react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

import axios from "axios";

import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import MotionBox from "@/app/components/animations/MotionBox";

interface ContentGeneratorProps {
  onInsertContent: (content: string, type: string) => void;
  onClose: () => void;
  userTrade?: string;
  businessName?: string;
}

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  prompt: string;
  category: string;
}

const ContentGenerator = ({
  onInsertContent,
  onClose,
  userTrade = "tradesman",
  businessName = "your business",
}: ContentGeneratorProps) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState<ContentTemplate | null>(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState("paragraph");

  const preProcessPrompt = (userPrompt: string) => {
    let processedPrompt = userPrompt;

    if (userPrompt.split(" ").length < 10) {
      processedPrompt = `${userPrompt}. Please provide a concise response (1-2 sentences maximum). Do not continue with additional explanations or examples.`;
    }

    if (
      userPrompt.toLowerCase().includes("create") ||
      userPrompt.toLowerCase().includes("write")
    ) {
      processedPrompt = `${processedPrompt} Provide only the requested content without introductory phrases or follow-up explanations.`;
    }

    return processedPrompt;
  };

  const filterResponse = (rawResponse: string, originalPrompt: string) => {
    let filtered = rawResponse.trim();

    if (filtered.startsWith(originalPrompt)) {
      filtered = filtered.slice(originalPrompt.length).trim();
    }

    return filtered;
  };

  const generateContent = async (userPrompt: string) => {
    setIsGenerating(true);
    try {
      const hfModel =
        process.env.HUGGINGFACE_MODEL || "mistralai/Mixtral-8x7B-Instruct-v0.1";
      const hfUrl = `https://api-inference.huggingface.co/models/${hfModel}`;
      const hfApiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || "";

      const processedPrompt = preProcessPrompt(userPrompt);

      const response = await axios.post(
        hfUrl,
        {
          inputs: processedPrompt,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.85,
            do_sample: true,
            return_full_text: false,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${hfApiKey}`,
          },
        }
      );

      const filteredResponse = filterResponse(
        response.data[0].generated_text,
        userPrompt
      );
      setGeneratedContent(filteredResponse);
    } catch (error) {
      console.error("Content generation failed:", error);
      setGeneratedContent(
        "Sorry, I couldn't generate that. Please try again with a different prompt."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomGenerate = () => {
    if (!customPrompt.trim()) return;
    generateContent(customPrompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const insertContent = () => {
    if (generatedContent) {
      onInsertContent(generatedContent, contentType);
      onClose();
    }
  };

  const regenerateContent = () => {
    if (selectedTemplate) {
      generateContent(selectedTemplate.prompt);
    } else if (customPrompt) {
      generateContent(customPrompt);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GlassMorphism blur={10} opacity={0.1}>
        <CardContent
          sx={{ p: 4, maxWidth: 800, maxHeight: "80vh", overflow: "auto" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Wand2 size={24} style={{ marginRight: 12, color: "#3b82f6" }} />
            <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
              AI Content Generator
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Custom Content Prompt
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={`Describe the content you need for your ${userTrade} business...`}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleCustomGenerate}
              disabled={!customPrompt.trim() || isGenerating}
              startIcon={<Wand2 size={16} />}
            >
              Generate Content
            </Button>
          </Box>

          {isGenerating && (
            <Box sx={{ mt: 3 }}>
              <LinearProgress sx={{ mb: 2 }} />
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}
              >
                Generating content with AI...
              </Typography>
            </Box>
          )}

          {generatedContent && !isGenerating && (
            <Box sx={{ mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  Generated Content
                </Typography>
                <Box>
                  <Tooltip title="Copy to clipboard">
                    <IconButton
                      onClick={copyToClipboard}
                      sx={{ color: "#3b82f6" }}
                    >
                      <Copy size={16} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Regenerate">
                    <IconButton
                      onClick={regenerateContent}
                      sx={{ color: "#3b82f6" }}
                    >
                      <RefreshCw size={16} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Card
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", mb: 3 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      color: "white",
                      "& h1, & h2, & h3": { color: "#3b82f6" },
                    }}
                    dangerouslySetInnerHTML={{ __html: generatedContent }}
                  />
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={insertContent}
                  startIcon={<Sparkles size={16} />}
                >
                  Insert Content
                </Button>
              </Box>
            </Box>
          )}

          {!generatedContent && !isGenerating && (
            <Alert severity="info" sx={{ mt: 3 }}>
              Write a custom prompt to generate AI-powered content for your{" "}
              {userTrade} website.
            </Alert>
          )}
        </CardContent>
      </GlassMorphism>
    </MotionBox>
  );
};

export default ContentGenerator;
