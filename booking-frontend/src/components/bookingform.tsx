'use client';
import { useState, useEffect } from 'react';
import { createBooking, fetchServiceTypes, fetchCustomers } from '../lib/api';

export default function BookingForm({ onBookingCreated }: { onBookingCreated: () => void }) {
  const [customerId, setCustomerId] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [serviceTypes, setServiceTypes] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchServiceTypes().then(setServiceTypes).catch(console.error);
    fetchCustomers().then(setCustomers).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBooking({
      customer: { id: customerId },
      serviceType: { id: serviceTypeId },
      startTime: start,
      endTime: end,
      description,
    });
    onBookingCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create a New Booking</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
        <select
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select a customer</option>
          {customers.map((cust: any) => (
            <option key={cust.id} value={cust.id}>
              {cust.name} – {cust.address}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
        <select
          value={serviceTypeId}
          onChange={e => setServiceTypeId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select a service</option>
          {serviceTypes.map((type: any) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={start}
            onChange={e => setStart(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <input
            type="datetime-local"
            value={end}
            onChange={e => setEnd(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Describe what needs to be done"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Create Booking
      </button>
    </form>
  );
}
