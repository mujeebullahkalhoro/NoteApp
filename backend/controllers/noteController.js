import Note from "../models/note.js";


const createNote = async (req, res) => {
  try {
    const { title, content, reminder } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
      reminderAt: reminder || null,
      reminderSent: false,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getNotes = async (req, res) => {
  try {
    const notes = await Note.find(
      { user: req.user._id },
      'title content favorite important reminderAt reminderSent'
    );
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateNote = async (req, res) => {
  try {
    const { title, content, reminder } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title,
        content,
        reminderAt: reminder || null,
        reminderSent: false, 
      },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }
    note.favorite = !note.favorite;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleImportant = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }
    note.important = !note.important;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  toggleFavorite,
  toggleImportant
};
