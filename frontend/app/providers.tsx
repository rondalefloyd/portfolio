"use client";

import { useEffect, useMemo, useState } from "react";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";

type ColorMode = "light" | "dark";
const colorModeStorageKey = "portfolio-color-mode";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ColorMode>("light");

  useEffect(() => {
    const savedMode = window.localStorage.getItem(colorModeStorageKey);
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#1976d2",
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
      }),
    [mode],
  );

  const toggleColorMode = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      window.localStorage.setItem(colorModeStorageKey, nextMode);
      return nextMode;
    });
  };

  const nextMode = mode === "light" ? "dark" : "light";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Tooltip title={`Switch to ${nextMode} mode`}>
        <IconButton
          onClick={toggleColorMode}
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
          {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
      </Tooltip>
      {children}
    </ThemeProvider>
  );
}
