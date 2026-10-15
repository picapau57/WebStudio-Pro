import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string;
  login: (password: string) => boolean;
  quickLogin: () => void;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  isRemembered: boolean;
  setIsRemembered: (val: boolean) => void;
}

const MASTER_EMAIL = 'picapauinformatica@gmail.com';
const STORAGE_KEY_AUTH = 'webstudio_auth_token';
const STORAGE_KEY_PASS = 'webstudio_master_password';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRemembered, setIsRemembered] = useState<boolean>(true);

  // Check saved session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEY_AUTH);
    if (savedToken === 'master_authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const getStoredPassword = (): string => {
    return localStorage.getItem(STORAGE_KEY_PASS) || 'admin123';
  };

  const login = (password: string): boolean => {
    const currentPass = getStoredPassword();
    if (password === currentPass) {
      setIsAuthenticated(true);
      if (isRemembered) {
        localStorage.setItem(STORAGE_KEY_AUTH, 'master_authenticated');
      }
      return true;
    }
    return false;
  };

  const quickLogin = () => {
    setIsAuthenticated(true);
    if (isRemembered) {
      localStorage.setItem(STORAGE_KEY_AUTH, 'master_authenticated');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  const changePassword = (oldPass: string, newPass: string): { success: boolean; error?: string } => {
    const currentPass = getStoredPassword();
    if (oldPass !== currentPass) {
      return { success: false, error: 'Senha atual incorreta.' };
    }
    if (!newPass || newPass.length < 4) {
      return { success: false, error: 'A nova senha deve ter no mínimo 4 caracteres.' };
    }
    localStorage.setItem(STORAGE_KEY_PASS, newPass);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail: MASTER_EMAIL,
        login,
        quickLogin,
        logout,
        changePassword,
        isRemembered,
        setIsRemembered,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return ctx;
};
