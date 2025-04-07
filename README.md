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
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variable

Inside the `server` folder, create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
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

## 📁 Project Structure

```
.
├── client/           # React frontend
├── server/           # Express backend & MongoDB connection
├── .env              # Environment variables (not included in repo)
├── package.json      # Main scripts and dependencies
└── README.md         # Project documentation
```

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

## 👨‍💻 Author

This project was created for learning purposes. Feel free to contribute, suggest improvements, or fork it for your own use!

---

## 📸 Demo (optional)

You can add a screenshot or GIF here to showcase your app UI.

---
