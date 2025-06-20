"use client";

import { styled } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";

type MotionBoxProps = BoxProps &
  MotionProps & {
    component?: React.ElementType;
  };

const MotionBox = styled(motion.div)<MotionBoxProps>(({ theme }) => ({
  // Base styles can be added here
}));

export default MotionBox;
