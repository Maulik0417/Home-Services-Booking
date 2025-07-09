import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Welcome to Home Services Booking</h1>
      <Link href="/bookings" className="text-blue-600 hover:underline text-lg">
        Go to Bookings
      </Link>
    </main>
  );
}
