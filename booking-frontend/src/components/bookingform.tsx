'use client';
import { useState } from 'react';
import { createBooking } from '../lib/api';

export default function BookingForm({ onBookingCreated }: { onBookingCreated: () => void }) {
  const [customerId, setCustomerId] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBooking({
      customer: { id: customerId },
      serviceType: { id: serviceTypeId },
      startTime: start,
      endTime: end,
    });
    onBookingCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow">
      <input type="text" placeholder="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} className="input" required />
      <input type="text" placeholder="Service Type ID" value={serviceTypeId} onChange={e => setServiceTypeId(e.target.value)} className="input" required />
      <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="input" required />
      <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="input" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Booking</button>
    </form>
  );
}
