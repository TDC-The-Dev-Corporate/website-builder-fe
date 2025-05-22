import { Box, Button, styled } from "@mui/material";

export const AppHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.appleGray.dark,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
  position: "relative",
  color: "white",
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  textTransform: "none",
  fontWeight: 500,
  borderRadius: "8px",
  padding: theme.spacing(1, 2),
}));

export const LoadingScreen = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
}));

export const grapesJsStyles = `
      .modal {
          display: block;
          position: relative;
          background: #fff;
          border: 1px solid #ccc;
          padding: 20px;
          background-color: rgba(59, 130, 246, 0.1);
        }
        .modal-content {
          display: block;
        }
        .gjs-dragging {
          outline: 2px dashed #3b82f6 !important;
          background-color: rgba(59, 130, 246, 0.1) !important;
        }

        .gjs-dragging * {
          pointer-events: none;
        }
        .gjs-dashed *[data-gjs-highlightable] {
          outline: 2px dashed #3b82f6 !important;
        }

        /* Dropzone styling */
        .gjs-assets-dropzone {
          border: 2px dashed #3b82f6;
          border-radius: 5px;
          padding: 20px;
          text-align: center;
          margin: 10px;
          background: rgba(59, 130, 246, 0.05);
          color: #3b82f6;
        }

        .gjs-assets-dropzone.active {
          background: rgba(59, 130, 246, 0.1);
          border-color: #2563eb;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Customize GrapesJS UI */
        .gjs-one-bg {
          background-color: #f8fafc !important;
        }

        .gjs-two-color {
          color: #1e293b !important;
        }

        .gjs-pn-panel {
          background-color: white !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }

        .gjs-block {
          border-radius: 8px !important;
          margin-bottom: 12px !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.2s ease;
        }

        .gjs-block:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
        }

        .gjs-block-category {
          font-weight: 500 !important;
          color: #334155 !important;
          padding: 12px 15px !important;
          background: #f1f5f9 !important;
          border-radius: 0 !important;
        }

        .gjs-cv-canvas {
          background: white !important;
        }

        /* Custom scrollbars */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Custom tabs */
        .custom-tabs {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 20px;
        }

        .custom-tab {
          padding: 12px 16px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          color: #64748b;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .custom-tab:hover {
          color: #334155;
        }

        .custom-tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }
      `;
