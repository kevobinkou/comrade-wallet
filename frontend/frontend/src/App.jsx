import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* If the URL doesn't match anything, go to Login */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;