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
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Booking List:</h2>
      <ul className="space-y-4">
        {bookings.map((b) => (
          <li
            key={b.id}
            className={`p-4 pb-14 border rounded shadow bg-gray-50 dark:bg-gray-700 relative`}
          >
            <p className="text-gray-900 dark:text-gray-100">
              <strong>Customer ID:</strong> {b.customer?.id}
            </p>
            <p className="text-gray-900 dark:text-gray-100">
              <strong>Customer Name:</strong> {b.customer?.name}
            </p>
            <p className="text-gray-900 dark:text-gray-100">
              <strong>Customer Address:</strong> {b.customer?.address}
            </p>
            <p className="text-gray-900 dark:text-gray-100">
              <strong>Service:</strong> {b.serviceType?.name}
            </p>

            {editingId === b.id ? (
              <>
                <div className="mt-2">
                  <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Start:</label>
                  <input
                    type="datetime-local"
                    value={editStart}
                    onChange={(e) => setEditStart(e.target.value)}
                    className="input border-yellow-400 bg-yellow-100 rounded px-2 py-1 w-full sm:w-auto
                      dark:bg-yellow-300 dark:text-gray-900 dark:border-yellow-600"
                  />
                </div>
                <div className="mt-2">
                  <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">End:</label>
                  <input
                    type="datetime-local"
                    value={editEnd}
                    onChange={(e) => setEditEnd(e.target.value)}
                    className="input border-yellow-400 bg-yellow-100 rounded px-2 py-1 w-full sm:w-auto
                      dark:bg-yellow-300 dark:text-gray-900 dark:border-yellow-600"
                  />
                </div>
                <div className="mt-2">
                  <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Description:</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="input border-yellow-400 bg-yellow-100 rounded px-2 py-1 w-full
                      dark:bg-yellow-300 dark:text-gray-900 dark:border-yellow-600"
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="mt-2 text-gray-900 dark:text-gray-100">
                  <strong>Start:</strong> {formatDateTimeDisplay(b.startTime)}
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  <strong>End:</strong> {formatDateTimeDisplay(b.endTime)}
                </p>

                <p className="text-gray-900 dark:text-gray-100">
                  <strong>Description:</strong> {b.description}
                </p>
              </>
            )}

            <p className="text-gray-900 dark:text-gray-100">
              <strong>Status:</strong> {b.status}
            </p>

            <div className="absolute bottom-2 right-2 flex space-x-2">
              {editingId === b.id ? (
                <>
                  <button
                    onClick={() => saveEditing(b.id)}
                    className="text-sm text-green-700 border border-green-700 px-3 py-1 rounded hover:bg-green-100 transition
                      dark:text-green-500 dark:border-green-500 dark:hover:bg-green-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-sm text-gray-700 border border-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition
                      dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(b)}
                    className="text-sm text-blue-700 border border-blue-700 px-3 py-1 rounded hover:bg-blue-100 transition
                      dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-sm text-red-700 border border-red-700 px-3 py-1 rounded hover:bg-red-100 transition
                      dark:text-red-400 dark:border-red-400 dark:hover:bg-red-600"
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
