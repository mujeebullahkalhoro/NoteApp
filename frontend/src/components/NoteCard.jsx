import React from 'react';
import { Trash2, Edit3, Star, StarOff, AlertCircle, AlertTriangle } from 'lucide-react';

function NoteCard({ title, content, onDelete, onEdit, onToggleFavorite, onToggleImportant, favorite, important }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition relative">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <div className="flex gap-2">
          <button
            onClick={onToggleFavorite}
            className={`p-1 rounded-md transition-colors ${favorite ? 'text-yellow-500 bg-yellow-100' : 'text-gray-400 hover:text-yellow-500'}`}
            aria-label="Toggle favorite"
          >
            {favorite ? <Star size={18} /> : <StarOff size={18} />}
          </button>

          <button
            onClick={onToggleImportant}
            className={`p-1 rounded-md transition-colors ${important ? 'text-red-500 bg-red-100' : 'text-gray-400 hover:text-red-500'}`}
            aria-label="Toggle important"
          >
            {important ? <AlertCircle size={18} /> : <AlertTriangle size={18} />}
          </button>
        </div>
      </div>

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
