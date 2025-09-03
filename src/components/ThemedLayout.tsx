import React from 'react';
import { ThemeProvider } from '@mui/material';
import { useThemeMode } from '@/utils/hooks/useThemeMode';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <body style={{ backgroundColor: '#0A1929' }}>
        <main style={{ position: 'relative', zIndex: 1, margin: '24px' }}>{children}</main>
      </body>
    </ThemeProvider>
  );
};

export default RootLayout;
