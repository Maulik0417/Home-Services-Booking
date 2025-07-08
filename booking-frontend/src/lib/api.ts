export const API_URL = 'http://localhost:8080/api';

export async function fetchBookings() {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
}

export async function createBooking(data: any) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
