'use client';
import { useState } from 'react';
import BookingForm from '../components/bookingform';
import BookingList from '../components/bookinglist';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Manage Bookings
      </h1>
      <BookingForm onBookingCreated={() => setRefresh(!refresh)} />
      <BookingList refresh={refresh} />
    </main>
  );
}
