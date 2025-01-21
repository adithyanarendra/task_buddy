import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme.ts'
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
