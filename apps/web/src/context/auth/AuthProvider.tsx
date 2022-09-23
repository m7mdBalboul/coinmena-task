import * as React from 'react';
import { useLocalStorageState } from '@crypto/ui';

export type User = {
  email: string;
  name: string;
};

type UserData = User & { password: string };

type AuthState = {
  users: Array<UserData>;
  currentUser: null | User;
};

export type AuthContextType = {
  logout: () => void;
  login: (data: Omit<UserData, 'name'>) => Promise<any>;
  register: (data: UserData) => void;
} & Pick<AuthState, 'currentUser'>;

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AUTH_INITIAL_STATE: AuthState = {
  currentUser: null,
  users: [{ email: 'test@test.com', name: 'Test User', password: '123456' }],
};

function AuthProvider({ children }: React.PropsWithChildren) {
  const [{ users, currentUser }, setAuth] = useLocalStorageState<AuthState>(
    'users',
    AUTH_INITIAL_STATE
  );

  const login: AuthContextType['login'] = (data) => {
    return new Promise((resolve, reject) => {
      const userInStorage = users.find((user) => user.email === data.email);
      if (!userInStorage) {
        reject('Email Not Found');
      } else if (userInStorage.password !== data.password) {
        reject('Wrong Password');
      } else {
        setAuth((prevState) => ({
          ...prevState,
          currentUser: { email: data.email, name: userInStorage.name },
        }));
        setTimeout(() => {
          resolve('success');
        }, 500);
      }
    });
  };

  const logout: AuthContextType['logout'] = () => {
    setAuth((authState) => ({ ...authState, currentUser: null }));
  };

  const register: AuthContextType['register'] = (data) => {
    if (users.findIndex((user) => user.email === data.email)) {
      setAuth((prevState) => ({ ...prevState, error: 'User Already Exists' }));
    } else {
      setAuth((prevState) => ({ ...prevState, users: [...users, data] }));
    }
  };

  const value: AuthContextType = {
    login,
    logout,
    register,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

type UseAuthReturnType = Omit<AuthContextType, 'currentUser' | 'error'> &
  (
    | {
        isAuthenticated: true;
        currentUser: NonNullable<AuthContextType['currentUser']>;
      }
    | {
        isAuthenticated: false;
        currentUser: NonNullable<AuthContextType['currentUser']>;
      }
  );

const useAuth = (): UseAuthReturnType => {
  const authContext = React.useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('useAuth must be used within a AuthContext');
  }
  const isAuthenticated = authContext.currentUser != null;

  return {
    isAuthenticated,
    ...authContext,
  } as UseAuthReturnType;
};

export { AuthProvider, useAuth };
