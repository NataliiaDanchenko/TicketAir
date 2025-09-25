import {
  type ReactNode,
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';

type ThemeMode = 'light' | 'dark';

interface THemeContextProps {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<THemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('theme') as ThemeMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggle = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
};
