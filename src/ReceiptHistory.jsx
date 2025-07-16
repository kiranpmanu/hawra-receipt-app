import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

const ReceiptHistory = () => {
  const [receipts, setReceipts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedReceipt, setEditedReceipt] = useState({ name: '', amount: '', date: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('receipts')) || [];
    setReceipts(stored.reverse()); // Latest first
  }, []);

  const handleDelete = (index) => {
    const updated = [...receipts];
    updated.splice(index, 1);
    setReceipts(updated);
    localStorage.setItem('receipts', JSON.stringify([...updated].reverse()));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedReceipt(receipts[index]);
  };

  const handleSave = () => {
    const updated = [...receipts];
    updated[editingIndex] = editedReceipt;
    setReceipts(updated);
    localStorage.setItem('receipts', JSON.stringify([...updated].reverse()));
    setEditingIndex(null);
    setEditedReceipt({ name: '', amount: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Receipt History</h2>

      {receipts.length === 0 ? (
        <p className="text-gray-500">No receipts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm bg-white shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">
                    {editingIndex === idx ? (
                      <input
                        type="text"
                        className="border p-1 rounded w-full"
                        value={editedReceipt.name}
                        onChange={(e) =>
                          setEditedReceipt({ ...editedReceipt, name: e.target.value })
                        }
                      />
                    ) : (
                      r.name
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingIndex === idx ? (
                      <input
                        type="text"
                        className="border p-1 rounded w-full"
                        value={editedReceipt.amount}
                        onChange={(e) =>
                          setEditedReceipt({ ...editedReceipt, amount: e.target.value })
                        }
                      />
                    ) : (
                      `₹${r.amount}`
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingIndex === idx ? (
                      <input
                        type="date"
                        className="border p-1 rounded w-full"
                        value={editedReceipt.date}
                        onChange={(e) =>
                          setEditedReceipt({ ...editedReceipt, date: e.target.value })
                        }
                      />
                    ) : (
                      r.date
                    )}
                  </td>
                  <td className="p-2 border text-center">
                    {editingIndex === idx ? (
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-800"
                        title="Save"
                      >
                        <FaSave />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(idx)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceiptHistory;
