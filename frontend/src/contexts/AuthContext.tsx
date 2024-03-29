import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User | null;
  authenticateUser: (user: User) => void;
  unAuthenticateUser: () => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  authenticateUser: () => {},
  unAuthenticateUser: () => {},
};

export interface User {
  userId: number;
  username: string;
}

const AuthContext = createContext(initialState);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);

  const authenticateUser = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const unAuthenticateUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        ...initialState,
        isAuthenticated,
        user,
        authenticateUser,
        unAuthenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
