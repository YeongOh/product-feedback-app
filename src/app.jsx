import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
