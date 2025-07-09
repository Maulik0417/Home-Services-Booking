import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
        Welcome to Home Services Booking
      </h1>
      <Link
        href="/bookings"
        className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
      >
        Go to Bookings
      </Link>
    </main>
  );
}
