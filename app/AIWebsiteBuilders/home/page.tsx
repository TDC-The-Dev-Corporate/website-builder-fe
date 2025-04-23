"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Menu,
  Home,
  User,
  Settings,
  Layout,
  LogOut,
  Globe,
  Palette,
} from "lucide-react";
import { GlassMorphism } from "@/app/components/animations/GlassMorphism";
import ViewProfile from "../profile/page";
import ProfileURLCard from "../profile/profileUrl";
import TemplateViewer from "@/app/components/TemplatesViewer/templateViewer";
import { getPortfolioByUserName } from "@/lib/redux/api/portfolio";
import AppLoader from "@/app/components/loader/AppLoader";
import { logoutUser } from "@/lib/utils";
import MotionBox from "@/app/components/animations/MotionBox";

const DRAWER_WIDTH = 280;

export default function Dashboard() {
  const [username, setUsername] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("templates");
  const [user, setUser] = useState<any>(null);

  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username);
        setUser(parsedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    async function fetchPortfolio() {
      if (!username) return;
      try {
        const response = getPortfolioByUserName(username);
        if (!response) {
          localStorage.setItem("published", "false");
          throw new Error("Failed to fetch portfolio");
        }
        const data = await response;
        setPortfolio(data);
        setLoading(false);
        data
          ? localStorage.setItem("published", "true")
          : localStorage.setItem("published", "false");
      } catch (error) {
        localStorage.setItem("published", "false");
        console.error("Error fetching portfolio:", error);
      }
    }
    fetchPortfolio();
  }, [username]);

  const menuItems = [
    { text: "Templates", icon: <Layout size={20} />, id: "templates" },
    { text: "Profile", icon: <User size={20} />, id: "profile" },
    { text: "Website", icon: <Globe size={20} />, id: "website" },
    { text: "Appearance", icon: <Palette size={20} />, id: "appearance" },
    { text: "Settings", icon: <Settings size={20} />, id: "settings" },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "profile":
        return (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassMorphism
              blur={10}
              opacity={0.1}
              sx={{ p: 0, overflow: "hidden" }}
            >
              <ViewProfile />
            </GlassMorphism>
          </MotionBox>
        );
      case "templates":
        return <TemplateViewer />;
      case "website":
        return (
          portfolio && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassMorphism blur={10} opacity={0.1}>
                <ProfileURLCard
                  url={`http://localhost:3000/AIWebsiteBuilders/portfolio/${username}`}
                />
              </GlassMorphism>
            </MotionBox>
          )
        );
      default:
        return <TemplateViewer />;
    }
  };

  return (
    <AppLoader loading={loading}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 0}px)` },
            ml: { md: `${drawerOpen ? DRAWER_WIDTH : 0}px` },
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, color: "white" }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              {selectedSection.charAt(0).toUpperCase() +
                selectedSection.slice(1)}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(10px)",
              border: "none",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={user?.profileImage}
              alt={user?.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "white", fontWeight: 600 }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {user?.tradeSpecialization}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

          <List sx={{ flex: 1, pt: 2 }}>
            {menuItems.map((item) => (
              <ListItem
                // button
                key={item.id}
                onClick={() => setSelectedSection(item.id)}
                sx={{
                  mb: 1,
                  mx: 2,
                  borderRadius: 2,
                  backgroundColor:
                    selectedSection === item.id
                      ? "rgba(59, 130, 246, 0.2)"
                      : "transparent",
                  color:
                    selectedSection === item.id
                      ? "#3b82f6"
                      : "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      selectedSection === item.id
                        ? "#3b82f6"
                        : "rgba(255, 255, 255, 0.7)",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

          <List>
            <ListItem
              // button
              onClick={() => logoutUser()}
              sx={{
                mx: 2,
                mb: 2,
                borderRadius: 2,
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ef4444", minWidth: 40 }}>
                <LogOut size={20} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            mt: 8,
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </AppLoader>
  );
}
