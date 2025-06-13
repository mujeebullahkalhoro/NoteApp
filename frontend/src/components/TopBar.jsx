import React, { useState, useEffect } from "react";
import { LogOut, User, Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import NoteModal from "./NoteModal";
import { useNavigate } from "react-router-dom";
import { fetchWithRefresh } from "../utils/fetchWithRefresh";
const gradientButtonStyle =
  "bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-3 py-1.5 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-1 whitespace-nowrap text-sm";

function TopBar({ searchValue, onSearchChange, addNoteToState }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reminder, setReminder] = useState("");
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetchWithRefresh("http://localhost:5000/user/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      const response = await fetchWithRefresh("http://localhost:5000/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content, reminder }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving note:", errorData.message);
        return;
      }

      const savedNote = await response.json();
      addNoteToState(savedNote);

      setTitle("");
      setContent("");
      setReminder("");
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save note:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetchWithRefresh("http://localhost:5000/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed");
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="w-full bg-gray-100 shadow-md px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
        {/* User Info */}
        <div className="flex items-center gap-2 text-gray-700">
          <User size={20} className="text-gray-500 shrink-0" />
          <span className="text-sm font-medium">{user?.name || "User"}</span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow min-w-[150px] max-w-full">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setShowModal(true)}
            className={gradientButtonStyle}
          >
            + Add Note
          </button>
          <button onClick={handleLogout} className={gradientButtonStyle}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <button
          className="md:hidden p-2 text-gray-600 hover:text-teal-500 shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2">
          <button
            onClick={() => {
              setShowModal(true);
              setMobileMenuOpen(false);
            }}
            className={gradientButtonStyle}
          >
            + Add Note
          </button>
          <button onClick={handleLogout} className={gradientButtonStyle}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

      <NoteModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        reminder={reminder}
        setReminder={setReminder}
        handleSave={handleSave}
        handleUpdate={() => {}}
        editingNote={null}
        setEditingNote={() => {}}
      />
    </header>
  );
}

export default TopBar;
