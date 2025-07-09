# Home Service Booking

A full-stack web app for scheduling and managing home service bookings. Built with a modern frontend and a Spring Boot backend, it provides a seamless way to add, view, edit, and delete customer appointments — all from a clean and responsive interface. 🏠🛠️

---

## 🚀 Features

### 📅 Booking Management

- Create new service bookings by selecting customers and service types.
- Choose start/end time and add descriptions for context.
- View and edit existing bookings in a user-friendly list.
- Delete bookings with confirmation.

### 👥 Customer Management

- Select existing customers by name and address.
- Add new customers via a modal form, auto-selected after creation.

### 🧰 Service Types

- Dynamically fetched list of service types from the backend.
- Select service types when creating bookings.

### 🔁 Live Refresh

- Bookings list updates instantly when changes are made.

---

## 🛠 Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript, React (Hooks)
- **UI:** Tailwind CSS
- **Hosting:** Firebase Hosting

### Backend

- **Framework:** Spring Boot (Java)
- **Database:** H2 (in-memory for demo purposes)
- **Deployment:** Google Cloud Run (Dockerized)

---

## 📄 Usage

### 🧪 Run Locally

#### Frontend

```bash
cd booking-frontend
npm install
npm run dev
```

#### App runs at `http://localhost:3000`.

#### Backend

```bash
cd bookingapi
./mvnw spring-boot:run
```

#### Backend runs at http://localhost:8080.

## 🌍 Deployed URLs

- **Frontend:** [https://homeservicebooking-mann.web.app](https://homeservicebooking-mann.web.app)  
- **Backend:** [https://booking-api-592876999331.us-central1.run.app](https://booking-api-592876999331.us-central1.run.app)

---

## 🔐 CORS Config

To allow production frontend access to the backend, ensure your Spring Boot app includes the following:

```java
.allowedOrigins("https://homeservicebooking-mann.web.app")
```

## 💡 Future Improvements

- 🧾 Add booking status filters (upcoming, completed, canceled)
- 🧑‍🔧 Admin authentication and login
- 📦 Switch to persistent database (e.g., PostgreSQL)
- 📱 Mobile responsive refinements
- 🕹️ Drag-and-drop calendar interface
- 🧠 AI auto-fill based on customer history
