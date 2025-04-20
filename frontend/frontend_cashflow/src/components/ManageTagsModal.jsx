import { useState, useEffect } from "react";
import Button from "./Button";
import Notification from "./Notification";
import Modal from "./Modal";

export default function ManageTagsModal({ isOpen, onClose }) {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // For add/edit
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#60a5fa");
  const [editingTag, setEditingTag] = useState(null);

  // Fetch tags from backend
  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tags/");
      if (!res.ok) throw new Error("Failed to fetch tags.");
      const data = await res.json();
      setTags(data);
    } catch (err) {
      setNotification({ type: "error", message: "Failed to load tags." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchTags();
  }, [isOpen]);

  // Add or update tag
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      setNotification({ type: "error", message: "Tag name required." });
      return;
    }
    try {
      let res;
      if (editingTag) {
        res = await fetch(`/api/tags/${editingTag.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tagName, color: tagColor }),
        });
      } else {
        res = await fetch("/api/tags/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tagName, color: tagColor }),
        });
      }
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData?.detail || errorData?.name?.[0] || "Failed to save tag."
        );
      }
      setNotification({
        type: "success",
        message: editingTag ? "Tag updated!" : "Tag added!",
      });
      setTagName("");
      setTagColor("#60a5fa");
      setEditingTag(null);
      fetchTags();
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    }
  };

  // Edit tag
  const handleEdit = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagColor(tag.color);
  };

  // Delete tag
  const handleDelete = async (tagId) => {
    if (!window.confirm("Delete this tag?")) return;
    try {
      const res = await fetch(`/api/tags/${tagId}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete tag.");
      setNotification({ type: "success", message: "Tag deleted!" });
      fetchTags();
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="right" title="Manage Tags">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Tag name"
          className="border rounded px-3 py-2 flex-1"
          style={{ minWidth: 0 }}
        />
        <input
          type="color"
          value={tagColor}
          onChange={(e) => setTagColor(e.target.value)}
          className="w-9 h-9 p-0 border-none rounded shadow"
          title="Pick tag color"
          style={{ minWidth: 36 }}
        />
        <Button type="submit" variant="primary" style={{ minWidth: 56 }}>
          {editingTag ? "Update" : "Add"}
        </Button>
        {editingTag && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setEditingTag(null);
              setTagName("");
              setTagColor("#60a5fa");
            }}
          >
            Cancel
          </Button>
        )}
      </form>
      {loading ? (
        <div className="text-gray-500">Loading tags...</div>
      ) : tags.length === 0 ? (
        <div className="text-gray-400 italic">No tags found. Add your first tag!</div>
      ) : (
        <div className="flex flex-col gap-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag.color }}
                ></span>
                <span className="font-medium">{tag.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-600 hover:underline"
                  type="button"
                  onClick={() => handleEdit(tag)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  type="button"
                  onClick={() => handleDelete(tag.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </Modal>
  );
}