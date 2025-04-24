import { Box, Typography, Button, Modal, Fade, useTheme } from "@mui/material";

import { motion } from "framer-motion";

import { GlassMorphism } from "../animations/GlassMorphism";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onDeploy?: () => void;
}

export default function SuccessModal({
  open,
  onClose,
  title,
  message,
  onDeploy,
}: SuccessModalProps) {
  const theme = useTheme();

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            delay: 0.1,
          }}
          sx={{
            width: { xs: "90%", sm: "480px" },
            maxWidth: "95vw",
            maxHeight: "90vh",
            overflow: "auto",
            outline: "none",
            mx: 2,
          }}
        >
          <GlassMorphism
            blur={15}
            opacity={0.9}
            borderColor="rgba(255, 255, 255, 0.25)"
            sx={{
              p: 0,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: 6,
                width: "100%",
                background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
              }}
            />

            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  mb: 3,
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.2,
                    },
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                    boxShadow: `0 8px 24px rgba(52, 199, 89, 0.25)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="svg"
                    sx={{
                      width: 44,
                      height: 44,
                      color: "#fff",
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={circleVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.path
                      d="M9 12L11 14L15 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={checkmarkVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </Box>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: [0, 0.5, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    },
                  }}
                  sx={{
                    position: "absolute",
                    top: -4,
                    left: -4,
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    border: `2px solid ${theme.palette.success.light}`,
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#111",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "text.secondary",
                  maxWidth: "90%",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                {message}
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    borderColor: "rgba(0, 0, 0, 0.12)",
                    color: "text.primary",
                    fontWeight: 500,
                    flex: { xs: 1, sm: "0 1 auto" },
                    "&:hover": {
                      borderColor: "text.primary",
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Not Now
                </Button>
                <Button
                  variant="contained"
                  onClick={onDeploy}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.warning.light} 0%, ${theme.palette.warning.main} 100%)`,
                    color: "#fff",
                    fontWeight: 600,
                    flex: { xs: 1, sm: "0 1 auto" },
                    boxShadow: "0px 4px 12px rgba(255, 149, 0, 0.2)",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                      boxShadow: "0px 6px 15px rgba(255, 149, 0, 0.3)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Deploy Portfolio
                </Button>
              </Box>
            </Box>
          </GlassMorphism>
        </Box>
      </Fade>
    </Modal>
  );
}
