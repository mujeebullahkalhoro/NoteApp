import React from 'react';
import { Trash2, Edit3 } from 'lucide-react';

function NoteCard({ title, content, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition relative">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{content}</p>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-teal-100 text-teal-600 hover:bg-teal-200 rounded-md p-1 transition-colors"
          aria-label="Edit note"
        >
          <Edit3 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="bg-cyan-100 text-cyan-600 hover:bg-cyan-200 rounded-md p-1 transition-colors"
          aria-label="Delete note"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
