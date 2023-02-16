import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChanged } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onUserStateChanged((user) => {
      if (user) {
        const {
          displayName: name,
          email: username,
          photoURL: image,
          uid,
        } = user;
        setCurrentUser({ name, username, image, uid });
        console.log(currentUser);
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
