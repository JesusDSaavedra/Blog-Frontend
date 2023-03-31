// import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
// import { FirebaseDB } from "../../firebase/config";
// import { fileUpload } from "../../helpers/fileUpload";
// import { loadNotes } from "../../helpers/loadNotes";
// import { deleteNoteById, addNewEmptyNew, savingNewNote, setActiveNote, setNote, setSaving, noteUpdated, setPhotosToActiveNote } from "./journalSlice";

import { updateArticles } from './blogSlice';

export const startUpdateArticles = (articles) => {
  return async (dispatch) => {
    dispatch(updateArticles(articles))
  };
};

