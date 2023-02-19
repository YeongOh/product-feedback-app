import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChanged } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onUserStateChanged((user) => {
      if (user) {
        const { displayName: name, photoURL: image, email, uid } = user;
        const username = email.substring(0, email.indexOf('@'));
        setCurrentUser({ name, username, image, uid });
      } else {
        setCurrentUser();
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
