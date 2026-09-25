import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

type User = {
  _id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<any>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<any>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        const data = await api.getProfile(storedToken);

        if (data.success) {
          setToken(storedToken);
          setUser(data.user);
        } else {
          await AsyncStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Load auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ) => {
    const data = await api.login(email, password);

    if (data.success) {
      await AsyncStorage.setItem('token', data.token);

      setToken(data.token);
      setUser(data.user);
    }

    return data;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    return await api.register(
      name,
      email,
      password
    );
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}