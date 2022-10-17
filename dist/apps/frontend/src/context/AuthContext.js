import { createContext, useContext, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';
const AuthContext = createContext({});
export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useSessionStorage('authStatus', false);
  const login = (user) => {
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
  return React.createElement(AuthContext.Provider, { value: context }, children);
}
