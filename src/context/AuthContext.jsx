import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, onUserStateChanged } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onUserStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        console.log([user.displayName, user.email, user.uid]);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
