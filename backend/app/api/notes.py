from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config.database import get_db
from ..models import Note
from ..schemas import NoteCreate, NoteResponse, NoteUpdate

router = APIRouter(prefix="/notes", tags=["notes"])


@router.post(
    "",
    response_model=NoteResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_note(
    note_data: NoteCreate,
    db: Session = Depends(get_db),
):
    note = Note(**note_data.model_dump())
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


@router.get("", response_model=list[NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    statement = select(Note).order_by(Note.updated_at.desc())
    return db.scalars(statement).all()


@router.get("/{note_id}", response_model=NoteResponse)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)

    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")

    return note


@router.put("/{note_id}", response_model=NoteResponse)
def update_note(
    note_id: int,
    note_data: NoteUpdate,
    db: Session = Depends(get_db),
):
    note = db.get(Note, note_id)

    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")

    for field, value in note_data.model_dump(exclude_unset=True).items():
        setattr(note, field, value)

    db.commit()
    db.refresh(note)
    return note


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)

    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
