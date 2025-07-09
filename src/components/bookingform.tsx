'use client';
import { useState, useEffect } from 'react';
import {
  createBooking,
  fetchServiceTypes,
  fetchCustomers,
  createCustomer
} from '../lib/api';

type Customer = {
  id: number;
  name: string;
  address: string;
};

interface ServiceType {
  id: number;
  name: string;
}

export default function BookingForm({ onBookingCreated }: { onBookingCreated: () => void }) {
  const [customerId, setCustomerId] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');

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

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCustomer = await createCustomer({
        name: newCustomerName,
        address: newCustomerAddress,
      });
      setCustomers(prev => [...prev, newCustomer]);
      setCustomerId(newCustomer.id); // auto-select
      setNewCustomerName('');
      setNewCustomerAddress('');
      setShowModal(false);
    } catch (err) {
      console.error('Failed to add customer:', err);
      alert('Failed to add customer');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg bg-white shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Create a New Booking</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer</label>
          <div className="flex gap-2">
            <select
              value={customerId}
              onChange={e => setCustomerId(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-400
                bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            >
              <option value="">Select a customer</option>
              {customers.map((cust: Customer) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name} – {cust.address}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              + New
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Type</label>
          <select
            value={serviceTypeId}
            onChange={e => setServiceTypeId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-400
              bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            required
          >
            <option value="">Select a service</option>
            {serviceTypes.map((type: ServiceType) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={start}
              onChange={e => setStart(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-400
                bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
            <input
              type="datetime-local"
              value={end}
              onChange={e => setEnd(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-400
                bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            placeholder="Describe what needs to be done"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-blue-400
              bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200
            dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Create Booking
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Customer</h3>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={newCustomerName}
                onChange={e => setNewCustomerName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2
                  bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                required
              />
              <input
                type="text"
                placeholder="Customer Address"
                value={newCustomerAddress}
                onChange={e => setNewCustomerAddress(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2
                  bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-700 border border-gray-300 px-4 py-2 rounded
                    dark:text-gray-300 dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded
                    dark:bg-green-500 dark:hover:bg-green-600"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
