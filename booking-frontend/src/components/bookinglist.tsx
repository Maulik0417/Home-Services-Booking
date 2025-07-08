'use client';
import { useEffect, useState } from 'react';
import { fetchBookings } from '../lib/api';

export default function BookingList({ refresh }: { refresh: boolean }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings().then(setBookings);
  }, [refresh]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Bookings</h2>
      <ul className="space-y-2">
        {bookings.map((b: any) => (
          <li key={b.id} className="p-2 border rounded shadow bg-gray-50">
            <p><strong>Customer ID:</strong> {b.customer?.id}</p>
            <p><strong>Service:</strong> {b.serviceType?.name}</p>
            <p><strong>Start:</strong> {b.startTime}</p>
            <p><strong>End:</strong> {b.endTime}</p>
            <p><strong>Status:</strong> {b.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
