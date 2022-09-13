import { createContext, useContext, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

type AuthContextProps = {
  children: JSX.Element;
};

type User = {
  username: string;
  id: string;
};

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: AuthContextProps) {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useSessionStorage('authStatus', false);

  const login = (user: User) => {
    setCurrentUser({
      username: user.username,
      id: user.id
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
