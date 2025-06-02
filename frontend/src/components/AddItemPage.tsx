import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem as createItemAPI } from '../services/itemService';
import { User } from '../services/userService';

const AddItemPage: React.FC = () => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
    price: 0
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Get user from JWT
  function parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    const payload = parseJwt(token);
    if (payload && payload.id) userId = payload.id;
  }

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const itemToSend = {
        itemName: newItem.name,
        description: newItem.description,
        imageUrl: newItem.image,
        category: newItem.category,
        price: newItem.price,
        userId: userId
      };
      await createItemAPI(itemToSend as any);
      navigate('/user');
    } catch (err: any) {
      setFormError('Failed to create item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!userId) {
    return <div className="pt-32 text-center text-red-500">You must be logged in to add an item.</div>;
  }

  return (
    <div className="pt-32 w-full max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Item</h1>
      {formError && <div className="text-red-500 mb-4 text-center">{formError}</div>}
      <form onSubmit={handleCreateItem} className="space-y-4 bg-white shadow-md rounded-lg p-8">
        <input className="w-full border px-3 py-2 rounded" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
        <textarea className="w-full border px-3 py-2 rounded" placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} required />
        <input className="w-full border px-3 py-2 rounded" placeholder="Image URL" value={newItem.image} onChange={e => setNewItem({ ...newItem, image: e.target.value })} />
        <input className="w-full border px-3 py-2 rounded" placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
        <input type="number" min="0" step="0.01" className="w-full border px-3 py-2 rounded" placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} required />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? 'Creating...' : 'Create Item'}</button>
      </form>
    </div>
  );
};

export default AddItemPage;
