"use client";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { brandPrimaryColor, colorModeStorageKey } from "./theme-config";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: brandPrimaryColor },
      },
    },
    dark: {
      palette: {
        primary: { main: brandPrimaryColor },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "background-color 200ms ease, color 200ms ease",
        },
      },
    },
  },
});

function ColorModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const activeMode = mode === "system" ? systemMode : mode;
  const isDark = activeMode === "dark";
  const nextMode = isDark ? "light" : "dark";

  return (
    <Tooltip title={`Switch to ${nextMode} mode`}>
      <IconButton
        onClick={() => setMode(nextMode)}
        aria-label={`Switch to ${nextMode} mode`}
        sx={{
          position: "fixed",
          top: { xs: 12, sm: 24 },
          right: { xs: 12, sm: 24 },
          zIndex: 40,
          width: 44,
          height: 44,
          p: 0,
          display: "grid",
          placeItems: "center",
          bgcolor: "background.paper",
          color: "text.primary",
          border: 1,
          borderColor: "divider",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.24)",
          "& .MuiSvgIcon-root": { display: "block", width: 24, height: 24, m: 0 },
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        {isDark ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey={colorModeStorageKey}
    >
      <CssBaseline />
      <ColorModeToggle />
      {children}
    </ThemeProvider>
  );
}
