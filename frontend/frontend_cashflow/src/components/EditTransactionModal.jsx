import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import TagChip from './TagChip';

export default function EditTransactionModal({ transaction, tags, onClose, onSave }) {
  React.useEffect(() => {
    console.log('EditTransactionModal opened for:', transaction);
  }, [transaction]);
  const [form, setForm] = useState({
    type: transaction.amount > 0 ? 'income' : 'expense',
    description: transaction.description,
    amount: Math.abs(transaction.amount),
    tagIds: transaction.tags ? transaction.tags.map(t => t.id) : [],
  });

  useEffect(() => {
    setForm({
      type: transaction.amount > 0 ? 'income' : 'expense',
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      tagIds: transaction.tags ? transaction.tags.map(t => t.id) : [],
    });
  }, [transaction]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleTagToggle = id => {
    setForm(f => ({
      ...f,
      tagIds: f.tagIds.includes(id)
        ? f.tagIds.filter(tid => tid !== id)
        : [...f.tagIds, id],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Compose payload
    const updatedTxn = {
      ...transaction,
      type: form.type,
      description: form.description,
      amount: form.type === 'income' ? +form.amount : -Math.abs(form.amount),
      tag_ids: form.tagIds,
    };
    await onSave(updatedTxn);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form className="p-6" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
        <div className="mb-4">
          <label className="block mb-1">Transaction Type</label>
          <label className="mr-4">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={form.type === 'expense'}
              onChange={handleChange}
            /> Expense
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="income"
              checked={form.type === 'income'}
              onChange={handleChange}
            /> Income
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <input
            className="w-full border rounded px-2 py-1"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Amount</label>
          <input
            className="w-full border rounded px-2 py-1"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tags (Select at least one)</label>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <TagChip
                key={tag.id}
                label={tag.name}
                color={tag.color}
                selected={form.tagIds.includes(tag.id)}
                onClick={() => handleTagToggle(tag.id)}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Update Transaction
        </button>
      </form>
    </Modal>
  );
}
