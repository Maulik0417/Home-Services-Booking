'use client';
import { useState } from 'react';
import BookingForm from '../../components/bookingform';
import BookingList from '../../components/bookinglist';

export default function BookingsPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Bookings</h1>
      <BookingForm onBookingCreated={() => setRefresh(!refresh)} />
      <BookingList refresh={refresh} />
    </main>
  );
}
