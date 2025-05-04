# MERN CRUD App with Authentication 🔐

A full-stack MERN (MongoDB, Express, React, Node.js) CRUD application built as a learning exercise. This project allows users to **create, read, update, and delete** items, and includes **authentication features** such as login and logout. The UI is styled using **Material-UI (MUI)**, and **Axios** is used for API requests.

## 🚀 Tech Stack

- **MongoDB** – NoSQL database
- **Express.js** – Backend framework
- **Node.js** – Runtime environment
- **React.js** – Frontend library
- **Axios** – For API communication
- **Material-UI (MUI)** – UI components
- **Concurrently** – To run client and server together

## 🔐 New Features

- **User Authentication** using Express & MongoDB
- **Login and Logout** functionality
- **Protected Routes**
- **Form validation** with MUI

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AmirHosseinKhedmatgozar/mern-crud-app.git
cd mern-crud-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `/` directory:
The actual values ​​should be entered in the `.env` file, which should not be in Git.
Create a .env file like the env.example file

```env
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/CRUD
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the application

```bash
npm start
```

This will run both frontend and backend using:

```json
"start": "concurrently \"npm run server\" \"npm run dev\""
```

## ✅ Features

- Add new items
- Display all items
- Update existing items
- Delete items
- **User login/logout**
- **Secure routes using JWT**
- **Forms with MUI design**

## 💡 Notes

- Make sure MongoDB is running (locally or via MongoDB Atlas).
- Replace sensitive values in `.env` before pushing to GitHub.
- Use strong values for `JWT_SECRET`.

## 🧑‍💻 Author

[Amir Hossein Khedmatgozar](https://github.com/AmirHosseinKhedmatgozar)
