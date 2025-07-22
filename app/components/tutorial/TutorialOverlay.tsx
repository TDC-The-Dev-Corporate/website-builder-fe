// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   LinearProgress,
//   IconButton,
//   Fade,
//   Zoom,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";
// import {
//   ArrowForward,
//   ArrowBack,
//   Close,
//   PlayArrow,
//   CheckCircle,
// } from "@mui/icons-material";
// import { keyframes } from "@emotion/react";

// const pulseAnimation = keyframes`
//   0% {
//     transform: scale(1);
//     box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
//   }
//   50% {
//     transform: scale(1.05);
//     box-shadow: 0 0 0 20px rgba(59, 130, 246, 0.1);
//   }
//   100% {
//     transform: scale(1);
//     box-shadow: 0 0 0 40px rgba(59, 130, 246, 0);
//   }
// `;

// const spotlightAnimation = keyframes`
//   0% {
//     opacity: 0;
//     transform: scale(0.8);
//   }
//   100% {
//     opacity: 1;
//     transform: scale(1);
//   }
// `;

// interface TutorialStep {
//   selector: string;
//   message: string;
//   title?: string;
//   triggerBefore?: () => void;
// }

// interface EnhancedTutorialOverlayProps {
//   steps: TutorialStep[];
//   currentStep: number;
//   onNext: () => void;
//   onPrev: () => void;
//   onClose: () => void;
// }

// export default function TutorialOverlay({
//   steps,
//   currentStep,
//   onNext,
//   onPrev,
//   onClose,
// }: EnhancedTutorialOverlayProps) {
//   const [isVisible, setIsVisible] = useState(true);
//   const [highlightedElement, setHighlightedElement] =
//     useState<HTMLElement | null>(null);

//   const current = steps[currentStep];
//   const progress = ((currentStep + 1) / steps.length) * 100;

//   useEffect(() => {
//     const element = document.querySelector(current.selector) as HTMLElement;
//     if (element) {
//       setHighlightedElement(element);

//       // Scroll element into view
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [currentStep, current.selector]);

//   const handleNext = () => {
//     if (currentStep === steps.length - 1) {
//       handleClose();
//     } else {
//       onNext();
//     }
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setTimeout(() => {
//       onClose();
//     }, 300);
//   };

//   return (
//     <Fade in={isVisible} timeout={300}>
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           background:
//             "linear-gradient(135deg, rgba(0, 0, 139, 0.8) 0%, rgba(30, 64, 175, 0.8) 100%)",
//           backdropFilter: "blur(8px)",
//           zIndex: 2000,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           pointerEvents: "none",
//         }}
//       >
//         {/* Spotlight Effect */}
//         {highlightedElement && (
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               background: `radial-gradient(circle at ${
//                 highlightedElement.offsetLeft +
//                 highlightedElement.offsetWidth / 2
//               }px ${
//                 highlightedElement.offsetTop +
//                 highlightedElement.offsetHeight / 2
//               }px, transparent 120px, rgba(0, 0, 139, 0.9) 200px)`,
//               animation: `${spotlightAnimation} 0.5s ease-out`,
//               pointerEvents: "none",
//             }}
//           />
//         )}

//         <Zoom in={isVisible} timeout={500}>
//           <Card
//             sx={{
//               maxWidth: 600,
//               width: "90%",
//               mx: "auto",
//               pointerEvents: "auto",
//               background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//               borderRadius: 4,
//               boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//               border: "1px solid rgba(255, 255, 255, 0.2)",
//               position: "relative",
//               overflow: "visible",
//             }}
//           >
//             {/* Progress Bar */}
//             <Box sx={{ p: 0 }}>
//               <LinearProgress
//                 variant="determinate"
//                 value={progress}
//                 sx={{
//                   height: 6,
//                   borderRadius: "4px 4px 0 0",
//                   backgroundColor: "rgba(59, 130, 246, 0.1)",
//                   "& .MuiLinearProgress-bar": {
//                     background:
//                       "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
//                     borderRadius: "4px",
//                   },
//                 }}
//               />
//             </Box>

//             {/* Close Button */}
//             <IconButton
//               onClick={handleClose}
//               sx={{
//                 position: "absolute",
//                 top: 16,
//                 right: 16,
//                 color: "rgba(0, 0, 0, 0.6)",
//                 backgroundColor: "rgba(255, 255, 255, 0.8)",
//                 "&:hover": {
//                   backgroundColor: "rgba(255, 255, 255, 1)",
//                 },
//                 zIndex: 1,
//               }}
//             >
//               <Close />
//             </IconButton>

//             <CardContent sx={{ p: 4 }}>
//               {/* Step Counter */}
//               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                 <Chip
//                   label={`Step ${currentStep + 1} of ${steps.length}`}
//                   size="small"
//                   sx={{
//                     background:
//                       "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
//                     color: "white",
//                     fontWeight: 600,
//                     mr: 2,
//                   }}
//                 />
//                 <Box sx={{ flexGrow: 1 }} />
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: "rgba(0, 0, 0, 0.6)",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {Math.round(progress)}% Complete
//                 </Typography>
//               </Box>

//               {/* Title */}
//               {current.title && (
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontWeight: 700,
//                     mb: 2,
//                     color: "#1e293b",
//                     lineHeight: 1.3,
//                   }}
//                 >
//                   {current.title}
//                 </Typography>
//               )}

//               {/* Message */}
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: "#475569",
//                   fontSize: "1.1rem",
//                   lineHeight: 1.6,
//                   mb: 4,
//                 }}
//               >
//                 {current.message}
//               </Typography>

//               {/* Action Buttons */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   gap: 2,
//                 }}
//               >
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   {currentStep > 0 && (
//                     <Button
//                       variant="outlined"
//                       onClick={onPrev}
//                       startIcon={<ArrowBack />}
//                       sx={{
//                         borderColor: "#e2e8f0",
//                         color: "#64748b",
//                         "&:hover": {
//                           borderColor: "#cbd5e1",
//                           backgroundColor: "#f8fafc",
//                         },
//                       }}
//                     >
//                       Previous
//                     </Button>
//                   )}
//                 </Box>

//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Button
//                     variant="text"
//                     onClick={handleClose}
//                     sx={{
//                       color: "#64748b",
//                       "&:hover": {
//                         backgroundColor: "#f8fafc",
//                       },
//                     }}
//                   >
//                     Skip Tutorial
//                   </Button>

//                   <Button
//                     variant="contained"
//                     onClick={handleNext}
//                     endIcon={
//                       currentStep === steps.length - 1 ? (
//                         <CheckCircle />
//                       ) : (
//                         <ArrowForward />
//                       )
//                     }
//                     sx={{
//                       background:
//                         "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
//                       boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//                       px: 3,
//                       py: 1.5,
//                       fontWeight: 600,
//                       textTransform: "none",
//                       "&:hover": {
//                         background:
//                           "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
//                         boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
//                         transform: "translateY(-1px)",
//                       },
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     {currentStep === steps.length - 1
//                       ? "Finish Tutorial"
//                       : "Next"}
//                   </Button>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Zoom>

//         {/* Step Indicators */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1,
//             mt: 3,
//             pointerEvents: "auto",
//           }}
//         >
//           {steps.map((_, index) => (
//             <Box
//               key={index}
//               sx={{
//                 width: 12,
//                 height: 12,
//                 borderRadius: "50%",
//                 backgroundColor:
//                   index <= currentStep ? "#3b82f6" : "rgba(255, 255, 255, 0.3)",
//                 transition: "all 0.3s ease",
//                 transform: index === currentStep ? "scale(1.2)" : "scale(1)",
//                 boxShadow:
//                   index === currentStep
//                     ? "0 0 0 4px rgba(59, 130, 246, 0.3)"
//                     : "none",
//               }}
//             />
//           ))}
//         </Box>
//       </Box>
//     </Fade>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  IconButton,
  Fade,
  Zoom,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  ArrowForward,
  ArrowBack,
  Close,
  PlayArrow,
  CheckCircle,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const spotlightAnimation = keyframes`
  0% { 
    opacity: 0;
    transform: scale(0.8);
  }
  100% { 
    opacity: 1;
    transform: scale(1);
  }
`;

interface TutorialStep {
  selector: string;
  message: string;
  title?: string;
  triggerBefore?: () => void;
}

interface EnhancedTutorialOverlayProps {
  steps: TutorialStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

export default function TutorialOverlay({
  steps,
  currentStep,
  onNext,
  onPrev,
  onClose,
}: EnhancedTutorialOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);

  const current = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    const element = document.querySelector(current.selector) as HTMLElement;
    if (element) {
      setHighlightedElement(element);
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentStep, current.selector]);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleClose();
    } else {
      onNext();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Fade in={isVisible} timeout={300}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(100, 149, 237, 0.6)", // Lighter blue background
          backdropFilter: "blur(2px)",
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {/* Spotlight Effect - Lighter and softer */}
        {highlightedElement && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at ${
                highlightedElement.offsetLeft +
                highlightedElement.offsetWidth / 2
              }px ${
                highlightedElement.offsetTop +
                highlightedElement.offsetHeight / 2
              }px, transparent 100px, rgba(255, 255, 255, 0.2) 300px)`,
              animation: `${spotlightAnimation} 0.5s ease-out`,
              pointerEvents: "none",
            }}
          />
        )}

        <Zoom in={isVisible} timeout={500}>
          <Card
            sx={{
              maxWidth: 600,
              width: "90%",
              mx: "auto",
              pointerEvents: "auto",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              borderRadius: 4,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              position: "relative",
              overflow: "visible", // Keep this to allow the close button
              pt: 6, // Add top padding to push content below the progress bar
            }}
          >
            {/* Fixed Progress Bar */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
                overflow: "hidden", // This ensures rounded corners clip the bar
                zIndex: 2,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 0,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    background:
                      "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
                  },
                }}
              />
            </Box>

            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "rgba(0, 0, 0, 0.6)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
                zIndex: 1,
              }}
            >
              <Close />
            </IconButton>

            <CardContent
              sx={{
                p: 4,
                pt: 3, // Added top padding adjustment
              }}
            >
              {/* Title */}
              {current.title && (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#1e293b",
                    lineHeight: 1.3,
                  }}
                >
                  {current.title}
                </Typography>
              )}

              {/* Message */}
              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                {current.message}
              </Typography>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap", // Allow wrapping on small screens
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  {currentStep > 0 && (
                    <Button
                      variant="outlined"
                      onClick={onPrev}
                      startIcon={<ArrowBack />}
                      sx={{
                        borderColor: "#e2e8f0",
                        color: "#64748b",
                        "&:hover": {
                          borderColor: "#cbd5e1",
                          backgroundColor: "#f8fafc",
                        },
                      }}
                    >
                      Previous
                    </Button>
                  )}
                </Box>

                <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, sm: 0 } }}>
                  <Button
                    variant="text"
                    onClick={handleClose}
                    sx={{
                      color: "#64748b",
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    Skip Tutorial
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={
                      currentStep === steps.length - 1 ? (
                        <CheckCircle />
                      ) : (
                        <ArrowForward />
                      )
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                      px: 3,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                        boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {currentStep === steps.length - 1
                      ? "Finish Tutorial"
                      : "Next"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Zoom>

        {/* Step Indicators */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 3,
            pointerEvents: "auto",
          }}
        >
          {steps.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor:
                  index <= currentStep ? "#3b82f6" : "rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s ease",
                transform: index === currentStep ? "scale(1.2)" : "scale(1)",
                boxShadow:
                  index === currentStep
                    ? "0 0 0 4px rgba(59, 130, 246, 0.3)"
                    : "none",
              }}
            />
          ))}
        </Box>
      </Box>
    </Fade>
  );
}
