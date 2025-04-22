"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";
import { styled } from "@mui/material/styles";

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1),
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: "all 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}15`,
    transform: "translateY(-3px)",
  },
}));

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              TradeBuilder
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The ultimate website builder for tradesmen. Showcase your
              craftsmanship online with professional websites.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <SocialButton aria-label="Instagram">
                <Instagram size={20} />
              </SocialButton>
              <SocialButton aria-label="Twitter">
                <Twitter size={20} />
              </SocialButton>
              <SocialButton aria-label="Facebook">
                <Facebook size={20} />
              </SocialButton>
              <SocialButton aria-label="LinkedIn">
                <Linkedin size={20} />
              </SocialButton>
              <SocialButton aria-label="YouTube">
                <Youtube size={20} />
              </SocialButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Products
            </Typography>
            <FooterLink>Templates</FooterLink>
            <FooterLink>Features</FooterLink>
            <FooterLink>Pricing</FooterLink>
            <FooterLink>Examples</FooterLink>
            <FooterLink>Testimonials</FooterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Resources
            </Typography>
            <FooterLink>Blog</FooterLink>
            <FooterLink>Guides</FooterLink>
            <FooterLink>Tutorials</FooterLink>
            <FooterLink>Help Center</FooterLink>
            <FooterLink>Contact Us</FooterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Company
            </Typography>
            <FooterLink>About Us</FooterLink>
            <FooterLink>Careers</FooterLink>
            <FooterLink>Press</FooterLink>
            <FooterLink>Partners</FooterLink>
            <FooterLink>Legal</FooterLink>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TradeBuilder. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3, mt: { xs: 2, sm: 0 } }}>
            <Link
              // href="/privacy"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              // href="/terms"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Terms of Service
            </Link>
            <Link
              // href="/cookies"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
