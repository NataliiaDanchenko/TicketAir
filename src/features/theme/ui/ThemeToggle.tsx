import { Switch, FormControlLabel } from '@mui/material';
import { useThemeContext } from '@/app/providers/themeProvider/ui/ThemeProvider';

export const ThemeToggle = () => {
  const { mode, toggle } = useThemeContext();

  return (
    <FormControlLabel
      control={<Switch checked={mode === 'dark'} onChange={toggle} />}
      label={mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
    />
  );
};