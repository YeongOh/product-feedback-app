import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ScrollToTop from './hooks/scrollToTop';

export default function App() {
  return (
    <AuthContextProvider>
      <ScrollToTop>
        <Outlet />
      </ScrollToTop>
    </AuthContextProvider>
  );
}
