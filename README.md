

# 🌍 Country Explorer

A full-stack MERN application to explore countries, search/filter, view details, and manage user favorites with authentication.

---

## 🚀 Application Setup

### **Prerequisites**
- Node.js (v16+ recommended)
- npm (v7+ recommended)
- MongoDB (local or cloud instance)

---

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### **2. Backend Setup**

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` folder:
  ```
  MONGO_URI=mongodb://localhost:27017/countries_app
  JWT_SECRET=your_secret_key
  PORT=5000
  ```

- Start MongoDB (if running locally):
  ```bash
  mongod
  ```

- Start the backend server:
  ```bash
  npm run dev
  ```
  The backend will run on `http://localhost:5000`.

---

### **3. Frontend Setup**

```bash
cd ../frontend
npm install
```

- Start the frontend:
  ```bash
  npm start
  ```
  The frontend will run on `http://localhost:3000`.

---

## 🏗️ Build Process

- **Frontend:**  
  Uses React, Tailwind CSS, and React Testing Library.  
  Build for production:
  ```bash
  npm run build
  ```
  The build output will be in the `frontend/build` directory.

- **Backend:**  
  Uses Express, Mongoose, JWT, and bcryptjs.  
  No build step required for backend (runs with Node.js).

---

## 🧑‍💻 Usage Instructions

1. **Register or Login:**  
   - Click "Log in" and register a new account or use existing credentials.

2. **Browse Countries:**  
   - Search by name or filter by region.
   - Click a country to view details.

3. **Favorites:**  
   - When logged in, click the heart icon to add/remove favorites.
   - View your favorites list from the header.

4. **Logout:**  
   - Click "Logout" in the header to end your session.

---

## 🛠️ APIs Used

- **REST Countries API**  
  - `https://restcountries.com/v3.1/all`
  - `https://restcountries.com/v3.1/name/{name}`
  - `https://restcountries.com/v3.1/region/{region}`
  - `https://restcountries.com/v3.1/alpha/{code}`

- **Custom Backend API**  
  - `/api/auth/register` — Register a new user
  - `/api/auth/login` — Login and receive JWT
  - `/api/auth/favorites` — Add/remove favorite countries
  - `/api/auth/me` — Get current user and favorites

---

## 📝 Brief Report

### **Chosen APIs**
- **REST Countries API** was selected for its comprehensive, free, and reliable country data, including names, regions, flags, populations, and more.
- **Custom Node.js/Express API** was built for user authentication, session management, and storing user favorites.

### **Challenges Faced & Solutions**

1. **Authentication & Session Management**
   - **Challenge:** Securely managing user sessions and protecting favorite actions.
   - **Solution:** Implemented JWT-based authentication, storing tokens in localStorage, and using protected routes on the backend.

2. **Favorites Persistence**
   - **Challenge:** Ensuring favorites are user-specific and persist across sessions.
   - **Solution:** Favorites are stored in the MongoDB user document and fetched on login.

3. **API Rate Limits & CORS**
   - **Challenge:** REST Countries API has rate limits and CORS restrictions.
   - **Solution:** Handled errors gracefully in the UI and used client-side fetches with proper error handling.

4. **Responsive Design**
   - **Challenge:** Making the app look good on all devices.
   - **Solution:** Used Tailwind CSS utility classes and tested layouts on various screen sizes.

5. **Testing**
   - **Challenge:** Ensuring reliability with both unit and integration tests.
   - **Solution:** Used React Testing Library for unit tests and integration tests, mocking API calls for speed and reliability.

6. **Case Sensitivity Issues (Windows)**
   - **Challenge:** File imports with mismatched casing caused errors.
   - **Solution:** Standardized file naming and import statements to be case-consistent.

7. **Mocking APIs in Tests**
   - **Challenge:** Ensuring tests don't hit real APIs.
   - **Solution:** Used Jest to mock fetch and the auth service, providing controlled responses for all test scenarios.

---

## 📂 Project Structure
