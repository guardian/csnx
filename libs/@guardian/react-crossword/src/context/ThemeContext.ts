import { createContext } from 'react';
import type { Theme } from '../@types/crossword';
import { defaultTheme } from '../theme';

export const ThemeContext = createContext<Theme>(defaultTheme);
