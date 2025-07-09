export const API_URL = 'https://booking-api-592876999331.us-central1.run.app/api';


type BookingCreateData = {
  customer: { id: string | number };
  serviceType: { id: string | number };
  startTime: string;
  endTime: string;
  description?: string;
};

export async function fetchBookings() {
  try {
    const res = await fetch(`${API_URL}/bookings`);
    const text = await res.text();

    if (!res.ok) {
      console.error('Backend error:', res.status, text);
      throw new Error('Backend error');
    }

    if (!text) {
      console.warn('Empty response received from backend');
      return [];  // return empty array if backend returns no content
    }

    return JSON.parse(text);
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}


export async function createBooking(data: BookingCreateData) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}


export async function fetchServiceTypes() {
  const res = await fetch(`${API_URL}/service-types`);
  if (!res.ok) {
    throw new Error("Failed to fetch service types");
  }
  return res.json();
}

export async function fetchCustomers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function deleteBooking(id: number) {
  const res = await fetch(`http://localhost:8080/api/bookings/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete booking");
  }
  
}

export async function createCustomer(data: { name: string; address: string }) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create customer');
  }

  return res.json();
}

export async function updateBooking(id: number, data: Partial<{startTime: string; endTime: string; description: string;}>) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update booking');
  return res.json();
}
