import type { Metadata } from "next";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const metadata: Metadata = {
  title: "Projects | Rondale Floyd M. Bufete",
  description: "Projects by Rondale Floyd M. Bufete.",
};

export default function ProjectsPage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "background.default",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                bgcolor: "black",
                color: "white",
              }}
            >
              <CodeRoundedIcon sx={{ fontSize: 36 }} />
            </Box>

            <Box>
              <Typography
                component="p"
                variant="overline"
                color="primary.main"
                sx={{ fontWeight: 700, letterSpacing: "0.14em" }}
              >
                Projects
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                sx={{ mt: 1, fontWeight: 800, letterSpacing: "-0.04em" }}
              >
                Projects are on the way.
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
                I&apos;m putting together a selection of things I&apos;ve built. Check back soon
                for project details, demos, and source code.
              </Typography>
            </Box>

            <Button
              component="a"
              href="/"
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ fontWeight: 700 }}
            >
              Back to portfolio
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
