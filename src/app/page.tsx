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
      <div className="mb-6 text-center p-2 bg-yellow-100 text-yellow-800 rounded-md dark:bg-yellow-900 dark:text-yellow-200">
        🕓 Please wait 10–30 seconds for the backend to connect (first load may take longer).
        <br />
        Backend will have connected when you see the booking entries in the list below.
      </div>

  

      <BookingForm onBookingCreated={() => setRefresh(!refresh)} />
      <BookingList refresh={refresh} />
    </main>
  );
}
