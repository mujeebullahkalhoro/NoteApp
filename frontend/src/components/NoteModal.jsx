import React from "react";

const NoteModal = ({
  showModal,
  setShowModal,
  title,
  setTitle,
  content,
  setContent,
  reminder,
  setReminder,
  handleSave,
  handleUpdate,
  editingNote = null,
  setEditingNote = () => {},
}) => {
  if (!showModal) return null;

  const handleClose = () => {
    setShowModal(false);
    setEditingNote(null);
    setTitle("");
    setContent("");
    setReminder(""); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-2 transform transition-all duration-300 scale-100 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {editingNote ? "Edit Note" : "Add New Note"}
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-3 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows="4"
          className="w-full resize-none mb-3 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        
        <label className="block text-sm text-gray-700 mb-1">Reminder (optional)</label>
        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={editingNote ? handleUpdate : handleSave}
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
          >
            {editingNote ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
