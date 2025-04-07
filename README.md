# CRUD App with MongoDB, Axios & MUI

This is a simple full-stack CRUD (Create, Read, Update, Delete) project built as a learning exercise. It uses **MongoDB** as the database, **Axios** for HTTP requests, and **Material-UI (MUI)** for the user interface.

---

## 🚀 Tech Stack

- **MongoDB** – NoSQL database
- **Express.js** – Backend framework
- **React.js** – Frontend library
- **Axios** – For making API calls
- **Material-UI (MUI)** – UI components
- **Concurrently** – To run both frontend and backend together

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AmirHosseinKhedmatgozar/mern-crud-app
.git
cd mern-crud-app

```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variable

Inside the `server` folder, create a `.env` file:

```env
MONGO_URI=mongodb+srv://amirhosein138134:13810424@cluster0.7mad5.mongodb.net/CRUD
```

### 4. Run the project

```bash
npm start
```

This command will run both the frontend and backend concurrently, using the following script:

```json
"start": "concurrently \"npm run server\" \"npm run dev\""
```

---

---

## ✅ Features

- Add new items
- Display all items
- Update existing items
- Delete items

---

## 💡 Notes

- Make sure MongoDB is running (locally or via MongoDB Atlas).
- Don't forget to add your `.env` file with the correct connection string.

---

## 📸 Demo (optional)

![Screenshot](./src/image/screenshot.png)

---
