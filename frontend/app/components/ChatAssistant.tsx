"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ChatIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Message = { role: "user" | "model"; text: string };
const backendUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const chatShadow = "0 6px 20px rgba(0, 0, 0, 0.35)";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hi! Ask me about Rondale's experience, skills, or education." },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        { role: "model", text: response.ok ? data.text : data.error },
      ]);
    } catch {
      setMessages((current) => [...current, { role: "model", text: "I could not connect right now." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ position: "fixed", right: { xs: 12, sm: 24 }, bottom: { xs: 12, sm: 24 }, zIndex: 30 }}>
      <Grow
        in={open}
        timeout={{ enter: 240, exit: 180 }}
        style={{ transformOrigin: "bottom right" }}
        mountOnEnter
        unmountOnExit
      >
        <Paper
          elevation={0}
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 1,
            width: { xs: "calc(100vw - 24px)", sm: 360 },
            overflow: "hidden",
            boxShadow: chatShadow,
            border: 1,
            borderColor: "divider",
          }}
        >
          <Box
            role="button"
            tabIndex={0}
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") setOpen(false);
            }}
            sx={{
              position: "relative",
              bgcolor: "purple",
              color: "#ffffff",
              px: 2,
              py: 1.5,
              cursor: "pointer",
              "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: -2 },
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Ask about Rondale</Typography>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>AI portfolio assistant</Typography>
          </Box>
          <Stack spacing={1} sx={{ height: 320, overflowY: "auto", p: 1.5, bgcolor: "background.default" }}>
            {messages.map((message, index) => (
              <Box key={`${message.role}-${index}`} sx={{ alignSelf: message.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%", bgcolor: message.role === "user" ? "primary.main" : "background.paper", color: message.role === "user" ? "primary.contrastText" : "text.primary", border: 1, borderColor: message.role === "user" ? "transparent" : "divider", borderRadius: 2, px: 1.5, py: 1, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.14)" }}>
                <Box
                  sx={{
                    overflowWrap: "anywhere",
                    "& p": { m: 0, fontSize: "0.875rem", lineHeight: 1.45 },
                    "& p + p": { mt: 1 },
                    "& ul": { display: "block", listStyleType: "disc", mt: 0.75, mb: 0.75, pl: 2.25 },
                    "& ol": { display: "block", listStyleType: "decimal", mt: 0.75, mb: 0.75, pl: 2.25 },
                    "& li": { display: "list-item", mb: 0.35, fontSize: "0.875rem", lineHeight: 1.4 },
                    "& li::marker": { color: "currentColor" },
                    "& hr": { border: 0, borderTop: "1px solid", borderColor: "divider", my: 1.25 },
                    "& strong": { fontWeight: 700 },
                  }}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </Box>
              </Box>
            ))}
            {loading && (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "background.paper",
                  color: "text.secondary",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  px: 1.5,
                  py: 1,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.14)",
                }}
              >
                <Typography variant="body2">Thinking…</Typography>
              </Box>
            )}
            <Box ref={messagesEndRef} sx={{ height: 0 }} />
          </Stack>
          <Box component="form" onSubmit={sendMessage} sx={{ display: "flex", gap: 1, p: 1.5 }}>
            <TextField value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question…" size="small" fullWidth disabled={loading} />
            <IconButton type="submit" color="primary" disabled={!input.trim() || loading} aria-label="Send question"><SendIcon /></IconButton>
          </Box>
        </Paper>
      </Grow>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          startIcon={<ChatIcon />}
          variant="contained"
          aria-label="Ask about Rondale"
          sx={{
            ml: "auto",
            display: "flex",
            minWidth: { xs: 48, sm: "auto" },
            px: { xs: 1.5, sm: 2 },
            bgcolor: "purple",
            color: "#ffffff",
            boxShadow: chatShadow,
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
            "& .MuiButton-startIcon": { m: { xs: 0, sm: "0 8px 0 -4px" } },
          }}
        >
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Ask about Rondale
          </Box>
        </Button>
      )}
    </Box>
  );
}
