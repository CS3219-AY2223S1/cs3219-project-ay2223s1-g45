import { createContext, useContext, useState } from 'react';

type AuthContextProps = {
  children: JSX.Element;
};

// type User = {
//     username: string;
// } | {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: AuthContextProps) {
  // const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    // currentUser,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}
