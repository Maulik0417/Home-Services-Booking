export const API_URL = 'http://localhost:8080/api';

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


export async function createBooking(data: any) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
