import { createContext, useContext, useState } from 'react';

type AuthContextProps = {
  children: JSX.Element;
};

type User = {
  username: string;
};

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: AuthContextProps) {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (user: User) => {
    setCurrentUser({
      username: user.username
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser({});
    setIsAuthenticated(false);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    currentUser,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}