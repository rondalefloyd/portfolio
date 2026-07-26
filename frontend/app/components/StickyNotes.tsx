"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Note = {
  id: number;
  title: string;
  content: string;
  updated_at: string;
};

type Position = { x: number; y: number };
type DragState = { id: number | "draft"; offsetX: number; offsetY: number };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const noteColor = "#fff4a8";

function sortNotes(notes: Note[]) {
  return [...notes].sort(
    (first, second) => new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime(),
  );
}

function getStackPosition(index: number, count: number, viewportHeight: number): Position {
  return {
    x: 16,
    y: Math.max(16, viewportHeight - 206 - (count - 1) * 14 + index * 14),
  };
}

function getComposerPosition(viewportHeight: number): Position {
  return { x: 16, y: Math.max(16, viewportHeight - 206) };
}

function getNoteRotation(index: number, count: number) {
  return (count + index) % 2 === 0 ? "1deg" : "-1deg";
}

export default function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [positions, setPositions] = useState<Record<number, Position>>({});
  const [rotations, setRotations] = useState<Record<number, string>>({});
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });
  const [draftPosition, setDraftPosition] = useState<Position>(() => getComposerPosition(800));
  const [draftRotation, setDraftRotation] = useState("-1deg");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dragState = useRef<DragState | null>(null);

  useEffect(() => {
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/notes`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load notes.");
        return response.json();
      })
      .then((loadedNotes: Note[]) => {
        const sortedNotes = sortNotes(loadedNotes);
        const viewportHeight = window.innerHeight;
        const nextPositions = Object.fromEntries(
          sortedNotes.map((note, index) => [
            note.id,
            getStackPosition(index, sortedNotes.length, viewportHeight),
          ]),
        );
        const nextRotations = Object.fromEntries(
          sortedNotes.map((note, index) => [
            note.id,
            getNoteRotation(index, sortedNotes.length),
          ]),
        );
        setNotes(sortedNotes);
        setRotations(nextRotations);
        setPositions(nextPositions);
        if (sortedNotes.length === 0) {
          setDraftPosition(getComposerPosition(viewportHeight));
        }
      })
      .catch(() => setError("Notes are unavailable"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const moveNote = (event: globalThis.PointerEvent) => {
      const drag = dragState.current;
      if (!drag) return;

      const nextPosition = {
        x: Math.max(8, Math.min(viewport.width - 268, event.clientX - drag.offsetX)),
        y: Math.max(16, Math.min(viewport.height - 198, event.clientY - drag.offsetY)),
      };

      if (drag.id === "draft") {
        setDraftPosition(nextPosition);
      } else {
        setPositions((current) => ({ ...current, [drag.id]: nextPosition }));
      }
    };

    const stopDragging = () => {
      dragState.current = null;
    };

    window.addEventListener("pointermove", moveNote);
    window.addEventListener("pointerup", stopDragging);
    return () => {
      window.removeEventListener("pointermove", moveNote);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, [viewport]);

  function startDragging(event: PointerEvent<HTMLDivElement>, note: Note) {
    const position = positions[note.id] ?? getStackPosition(notes.indexOf(note), notes.length, viewport.height);
    dragState.current = {
      id: note.id,
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
  }

  function startDraggingDraft(event: PointerEvent<HTMLDivElement>) {
    dragState.current = {
      id: "draft",
      offsetX: event.clientX - draftPosition.x,
      offsetY: event.clientY - draftPosition.y,
    };
  }

  function startEditing(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setDraftPosition(positions[note.id] ?? getStackPosition(notes.indexOf(note), notes.length, viewport.height));
    setDraftRotation(rotations[note.id] ?? "-1deg");
    setIsAdding(true);
  }

  function startNewNote() {
    setEditingId(null);
    setTitle("");
    setContent("");
    const topmostExistingPosition = notes.reduce((topmost, note, index) => {
      const position = positions[note.id] ?? getStackPosition(index, notes.length, viewport.height);
      return Math.min(topmost, position.y);
    }, viewport.height - 206);
    setDraftPosition({
      x: 16,
      y: Math.max(16, topmostExistingPosition - 14),
    });
    const firstNoteRotation = notes[0] ? rotations[notes[0].id] : undefined;
    setDraftRotation(firstNoteRotation === "-1deg" ? "1deg" : "-1deg");
    setIsAdding(true);
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setDraftPosition(getComposerPosition(viewport.height));
    setDraftRotation("-1deg");
    setIsAdding(false);
  }

  async function saveNote() {
    if (!title.trim() || !content.trim()) return;
    const isEditing = editingId !== null;
    const endpoint = isEditing ? `${apiUrl}/notes/${editingId}` : `${apiUrl}/notes`;

    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });
      if (!response.ok) throw new Error("Could not save note.");

      const savedNote: Note = await response.json();
      setPositions((current) => ({ ...current, [savedNote.id]: draftPosition }));
      if (!isEditing) {
        const firstNoteRotation = notes[0] ? rotations[notes[0].id] : undefined;
        setRotations((current) => ({
          ...current,
          [savedNote.id]: firstNoteRotation === "-1deg" ? "1deg" : "-1deg",
        }));
      }
      setNotes((current) =>
        sortNotes(isEditing ? current.map((note) => (note.id === savedNote.id ? savedNote : note)) : [savedNote, ...current]),
      );
      resetForm();
    } catch {
      setError("Could not save note");
    }
  }

  async function deleteNote(noteId: number) {
    try {
      const response = await fetch(`${apiUrl}/notes/${noteId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Could not delete note.");
      if (notes.length === 1) {
        setDraftPosition(getComposerPosition(viewport.height));
        setDraftRotation("-1deg");
      }
      setNotes((current) => current.filter((note) => note.id !== noteId));
    } catch {
      setError("Could not delete note");
    }
  }

  const composerPosition = draftPosition;

  return (
    <Box sx={{ position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none" }}>
      {isAdding || (!loading && !error && notes.length === 0) ? (
        <Paper
          elevation={6}
          onPointerDown={(event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            startDraggingDraft(event);
          }}
          sx={{
            position: "fixed",
            left: composerPosition.x,
            top: composerPosition.y,
            width: { xs: "calc(100vw - 32px)", md: 252 },
            height: 190,
            boxSizing: "border-box",
            overflowY: "auto",
            p: 2,
            bgcolor: noteColor,
            color: "#202020",
            pointerEvents: "auto",
            zIndex: 20,
            transform: `rotate(${draftRotation})`,
            cursor: "grab",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          <Stack spacing={1.25} sx={{ height: "100%" }}>
            <Box
              component="input"
              type="text"
              placeholder="Untitled note"
              aria-label="Note title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              onPointerDown={(event) => event.stopPropagation()}
              sx={{
                display: "block",
                width: "100%",
                border: 0,
                borderBottom: "1px solid rgba(0, 0, 0, 0.35)",
                outline: 0,
                bgcolor: "transparent",
                color: "inherit",
                fontFamily: "inherit",
                fontSize: "1rem",
                fontWeight: 800,
                lineHeight: "28px",
                height: "28px",
                boxSizing: "border-box",
                p: 0,
                m: 0,
                "&:focus": { borderBottomColor: "rgba(0, 0, 0, 0.7)" },
              }}
            />
            <Box
              component="textarea"
              placeholder="Write something..."
              aria-label="Note content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
              rows={3}
              onPointerDown={(event) => event.stopPropagation()}
              sx={{
                display: "block",
                width: "100%",
                height: "90px",
                flex: "none",
                resize: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                border: 0,
                borderBottom: "1px solid rgba(0, 0, 0, 0.35)",
                outline: 0,
                bgcolor: "transparent",
                color: "inherit",
                fontFamily: "inherit",
                fontSize: "0.875rem",
                lineHeight: "21.7px",
                p: 0,
                m: 0,
                "&:focus": { borderBottomColor: "rgba(0, 0, 0, 0.7)" },
              }}
            />
            <Stack direction="row" spacing={0.5} sx={{ position: "absolute", right: 8, bottom: 8 }}>
              <IconButton aria-label="Save note" size="small" onPointerDown={(event) => event.stopPropagation()} onClick={() => void saveNote()}>
                <SaveIcon fontSize="small" />
              </IconButton>
              {notes.length > 0 ? (
                <IconButton aria-label="Cancel note" size="small" onPointerDown={(event) => event.stopPropagation()} onClick={resetForm}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : null}
            </Stack>
          </Stack>
        </Paper>
      ) : null}

      {!loading ? (
        notes.map((note, index) => {
          const position = positions[note.id] ?? getStackPosition(index, notes.length, viewport.height);
          return (
            <Paper
              key={note.id}
              elevation={5}
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                startDragging(event, note);
              }}
              sx={{
                position: "fixed",
                left: position.x,
                top: position.y,
                width: { xs: "calc(100vw - 32px)", md: 252 },
                height: 190,
                boxSizing: "border-box",
                overflowY: "auto",
                p: 2,
                bgcolor: noteColor,
                color: "#202020",
                pointerEvents: "auto",
                zIndex: 11 + notes.length - index,
                cursor: "grab",
                userSelect: "none",
                transform: `rotate(${rotations[note.id] ?? "-1deg"})`,
                touchAction: "none",
              }}
            >
              <Stack spacing={1.25} sx={{ height: "100%" }}>
                <IconButton
                  aria-label="Add another note"
                  size="small"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={startNewNote}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <Typography
                  component="div"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    lineHeight: "28px",
                    height: "28px",
                    boxSizing: "border-box",
                    pr: 1,
                    m: 0,
                  }}
                >
                  {note.title}
                </Typography>
                <Typography
                  component="div"
                  sx={{
                    fontSize: "0.875rem",
                    lineHeight: "21.7px",
                    whiteSpace: "pre-wrap",
                    m: 0,
                  }}
                >
                  {note.content}
                </Typography>
                <Stack direction="row" spacing={0.5} sx={{ position: "absolute", right: 8, bottom: 8 }}>
                  <IconButton aria-label={`Edit ${note.title}`} size="small" onPointerDown={(event) => event.stopPropagation()} onClick={() => startEditing(note)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label={`Delete ${note.title}`} size="small" onPointerDown={(event) => event.stopPropagation()} onClick={() => void deleteNote(note.id)}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          );
        })
      ) : null}
    </Box>
  );
}
