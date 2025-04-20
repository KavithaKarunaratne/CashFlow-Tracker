import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import TagChip from "../components/TagChip";
import Notification from "../components/Notification";

export default function AddTransactionPage() {
  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [notification, setNotification] = useState(null);

  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTags() {
      setLoadingTags(true);
      try {
        const response = await fetch("/api/tags/");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load tags." });
      } finally {
        setLoadingTags(false);
      }
    }
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || selectedTags.length === 0) {
      setNotification({ type: "error", message: "Please fill all fields and select at least one tag." });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          description,
          amount: parseFloat(amount),
          tags: selectedTags,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add transaction.");
      }
      setNotification({ type: "success", message: "Transaction added successfully!" });
      setDescription("");
      setAmount("");
      setSelectedTags([]);
      // setTimeout(() => navigate("/expenses", { state: { refresh: true } }), 500); // Pass refresh flag!
    } catch (err) {
      setNotification({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((t) => t !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Transaction Type</label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={() => setType("expense")}
                className="mr-2"
              />
              Expense
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === "income"}
                onChange={() => setType("income")}
                className="mr-2"
              />
              Income
            </label>
          </div>
        </div>
        {/* Description */}
        <Input
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="What was this transaction for?"
        />
        {/* Amount */}
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.00"
        />
        {/* Tags */}
        <div>
          <div className="mb-1 font-medium">Tags (Select at least one)</div>
          {loadingTags ? (
            <div>Loading tags...</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <TagChip
                  key={tag.id}
                  label={tag.name}
                  color={tag.color}
                  selected={selectedTags.includes(tag.id)}
                  onClick={() => toggleTag(tag.id)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>
        {/* Submit */}
        <Button type="submit" className="w-full" variant="primary" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </Button>
      </form>
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}