'use client';
import { useEffect, useState } from 'react';
import { fetchBookings } from '../lib/api';

export default function BookingList({ refresh }: { refresh: boolean }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings().then(setBookings);
  }, [refresh]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((b: any) => (
          <li key={b.id} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p><strong>Customer ID:</strong> {b.customer?.id}</p>
              <p><strong>Customer Name:</strong> {b.customer?.name}</p>
              <p><strong>Customer Address:</strong> {b.customer?.address}</p>
              <p><strong>Service:</strong> {b.serviceType?.name}</p>
              <p><strong>Start:</strong> {b.startTime}</p>
              <p><strong>End:</strong> {b.endTime}</p>
              <p><strong>Status:</strong> <span className="capitalize">{b.status}</span></p>
              <p className="md:col-span-2"><strong>Description:</strong> {b.description}</p>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
