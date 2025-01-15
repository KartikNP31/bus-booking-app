
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import LandingPage from "./components/LandingPage";
import SearchBus from "./components/SearchBus";
import ToastProvider from "./components/ToastProvider";
import AdminDashboard from "./components/AdminDashboard";
import AddNewBus from "./components/AddNewBus";


function App() {



  return (
    <div className="max-h-screen w-full">
      <ToastProvider />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< LandingPage />} replace>
            <Route path='/' element={<Navigate to="/SearchBus" />} />
            <Route path='/SearchBus' element={<SearchBus />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />}>
              <Route path='/AdminDashboard' element={<Navigate to="/AdminDashboard/Home" />} />
              <Route path="/AdminDashboard/AddNewBus" element={<AddNewBus />} />
            </Route>

          </Route>

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

