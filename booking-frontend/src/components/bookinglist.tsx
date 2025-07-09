'use client';
import { useEffect, useState } from 'react';
import { fetchBookings, deleteBooking, updateBooking } from '../lib/api';

type Booking = {
  id: number;
  customer: { id: number; name: string; address: string };
  serviceType: { id: number; name: string };
  startTime: string;
  endTime: string;
  description: string;
  status: string;
};

export default function BookingList({ refresh }: { refresh: boolean }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editStart, setEditStart] = useState('');
  const [editEnd, setEditEnd] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchBookings().then(setBookings);
  }, [refresh]);

  const startEditing = (b: Booking) => {
    setEditingId(b.id);
    setEditStart(b.startTime);
    setEditEnd(b.endTime);
    setEditDescription(b.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEditing = async (id: number) => {
    try {
      const updatedBooking = await updateBooking(id, {
        startTime: editStart,
        endTime: editEnd,
        description: editDescription,
      });
      setBookings((prev) => prev.map((b) => (b.id === id ? updatedBooking : b)));
      setEditingId(null);
    } catch {
      alert('Failed to update booking');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert('Failed to delete booking');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((b) => (
          <li
            key={b.id}
            className={`p-4 border rounded shadow bg-gray-50 relative ${
              editingId === b.id ? 'bg-yellow-50' : ''
            }`}
          >
            <p>
              <strong>Customer ID:</strong> {b.customer?.id}
            </p>
            <p>
              <strong>Customer Name:</strong> {b.customer?.name}
            </p>
            <p>
              <strong>Customer Address:</strong> {b.customer?.address}
            </p>
            <p>
              <strong>Service:</strong> {b.serviceType?.name}
            </p>

            {editingId === b.id ? (
              <>
                <div className="mt-2">
                  <label className="block mb-1 font-semibold text-gray-700">Start:</label>
                  <input
                    type="datetime-local"
                    value={editStart}
                    onChange={(e) => setEditStart(e.target.value)}
                    className="input border-yellow-400 bg-yellow-100"
                  />
                </div>
                <div className="mt-2">
                  <label className="block mb-1 font-semibold text-gray-700">End:</label>
                  <input
                    type="datetime-local"
                    value={editEnd}
                    onChange={(e) => setEditEnd(e.target.value)}
                    className="input border-yellow-400 bg-yellow-100"
                  />
                </div>
                <div className="mt-2">
                  <label className="block mb-1 font-semibold text-gray-700">Description:</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="input border-yellow-400 bg-yellow-100"
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="mt-2">
                <strong>Start:</strong> {formatDateTimeDisplay(b.startTime)}
                </p>
                <p>
                <strong>End:</strong> {formatDateTimeDisplay(b.endTime)}
                </p>

                <p>
                  <strong>Description:</strong> {b.description}
                </p>
              </>
            )}

            <p>
              <strong>Status:</strong> {b.status}
            </p>

            <div className="absolute bottom-2 right-2 flex space-x-2">
              {editingId === b.id ? (
                <>
                  <button
                    onClick={() => saveEditing(b.id)}
                    className="text-sm text-green-700 border border-green-700 px-3 py-1 rounded hover:bg-green-100 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-sm text-gray-700 border border-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(b)}
                    className="text-sm text-blue-700 border border-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-sm text-red-700 border border-red-700 px-3 py-1 rounded hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDateTimeDisplay(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // fallback if invalid date

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

