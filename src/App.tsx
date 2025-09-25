import { ThemeProvider } from './app/providers/themeProvider/ui/ThemeProvider';
import { AppRouter } from './app/providers/route/AppRouter/AppRouter';

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
