import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fontsource-variable/montserrat';
import './index.css';
import { NotesProvider } from './context/TodoContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { UserProvider } from './context/UserContext';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Categories from './Categories';
import Register from './components/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <NotesProvider>
        <CategoriesProvider>
          <Router>
            <Routes>
              {/* Protected Route for the main app */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <App />
                  </ProtectedRoute>
                }

              />
              {/* Protected Route for categories */}
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              {/* Public Route for login */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </CategoriesProvider>
      </NotesProvider>
    </UserProvider>
  </React.StrictMode>
);
