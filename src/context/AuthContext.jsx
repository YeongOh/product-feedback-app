import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChanged } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onUserStateChanged((user) => {
      if (user) {
        const { displayName: name, photoURL: image, email, uid } = user;
        const username = email.substring(0, email.indexOf('@'));
        setCurrentUser({ name, username, image, uid });
      } else {
        setCurrentUser();
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        uid: currentUser && currentUser.uid,
        isLoading,
        login,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
