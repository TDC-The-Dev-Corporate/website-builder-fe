import React from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Facebook, Instagram, Twitter, Send } from "@mui/icons-material";

export const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const productLinks = [
    { name: "Templates", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Examples", href: "#" },
  ];

  const resourceLinks = [
    { name: "Blog", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Legal", href: "#" },
  ];

  const socialLinks = [
    { icon: <Facebook fontSize="small" />, href: "#" },
    { icon: <Twitter fontSize="small" />, href: "#" },
    { icon: <Instagram fontSize="small" />, href: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "#1e1e1e",
        mt: "140px",
        pt: "50px",
        pb: "30px",
        px: isMobile ? 2 : 4,
        color: "white",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: isMobile ? 2 : 4,
          maxWidth: "1280px !important",
        }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Montserrat', Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "33.42px",
                  color: "white",
                }}
              >
                TRADES BUILDER
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Montserrat', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#949494",
                  maxWidth: 307,
                }}
              >
                The Ultimate Website Builder For Tradesmen. Showcase Your
                Craftsmanship Online With Professional Websites.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
            lg={2}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              >
                Products
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      sx={{
                        fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                        fontwe: 400,
                        fontSize: "14px",
                        color: "white",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        display: "block",
                        py: 0.5,
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
            lg={2}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              >
                Resources
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
                {resourceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      sx={{
                        fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "white",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        display: "block",
                        py: 0.5,
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
            lg={2}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              >
                Company
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", pl: 0, m: 0 }}>
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      sx={{
                        fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "white",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                        display: "block",
                        py: 0.5,
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                }}
              >
                Join the newsletter
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  maxWidth: 298,
                }}
              >
                <TextField
                  type="email"
                  placeholder="email@website.com"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      px: 2,
                      py: 1,
                      flex: 1,
                      fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                    },
                  }}
                  sx={{ flex: 1 }}
                />
                <IconButton
                  sx={{
                    mr: 1,
                    color: "black",
                  }}
                >
                  <Send fontSize="small" />
                </IconButton>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Inter', Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: "20px",
                  mt: 2,
                }}
              >
                Follow us
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      "&:hover": { bgcolor: "grey.200" },
                      width: 36,
                      height: 36,
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider
          // data-aos="fade-in"
          // data-aos-delay="600"
          sx={{
            mt: 8,
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderBottomWidth: "1px",
          }}
        />

        <Box
          // data-aos="fade-up"
          // data-aos-delay="700"
          sx={{
            pt: 4,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Inter', Helvetica, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "white",
            }}
          >
            © TradesBuilder 2025
          </Typography>

          {/* <Typography
            variant="body2"
            sx={{
              fontFamily: "'Inter', Helvetica, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
            }}
          >
            © TradesBuilder 2025
          </Typography> */}
          <Link
            href="#"
            sx={{
              fontFamily: "'Inter', Helvetica, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "white",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};
