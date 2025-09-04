import React from 'react';
import { ThemeProvider } from '@mui/material';
import { useThemeMode } from '@/utils/hooks/useThemeMode';
import { AuthProvider } from '@/utils/providers/AuthProviders';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { theme } = useThemeMode();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <body style={{ backgroundColor: '#0A1929' }}>
          <main style={{ position: 'relative', zIndex: 1, margin: '24px' }}>{children}</main>
        </body>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default RootLayout;
