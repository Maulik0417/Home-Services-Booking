'use client';
import { useEffect, useState } from 'react';
import { fetchBookings, deleteBooking } from '../lib/api';

interface Booking {
  id: number;
  customer: {
    id: number;
    name: string;
    address: string;
  };
  serviceType: {
    name: string;
  };
  startTime: string;
  endTime: string;
  description: string;
  status: string;
}


export default function BookingList({ refresh }: { refresh: boolean }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings().then(setBookings);
  }, [refresh]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmed) return;

    try {
      await deleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      alert('Failed to delete booking');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Bookings</h2>
      <ul className="space-y-2">
        {bookings.map((b: any) => (
          <li key={b.id} className="p-4 border rounded shadow bg-gray-50 relative">
            <p><strong>Customer ID:</strong> {b.customer?.id}</p>
            <p><strong>Customer Name:</strong> {b.customer?.name}</p>
            <p><strong>Customer Address:</strong> {b.customer?.address}</p>
            <p><strong>Service:</strong> {b.serviceType?.name}</p>
            <p><strong>Start:</strong> {b.startTime}</p>
            <p><strong>End:</strong> {b.endTime}</p>
            <p><strong>Description:</strong> {b.description}</p>
            <p><strong>Status:</strong> {b.status}</p>

            <button
              onClick={() => handleDelete(b.id)}
              className="absolute bottom-2 right-2 text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-100 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
