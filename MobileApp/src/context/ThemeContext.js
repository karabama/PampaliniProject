import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import ThemeColors from '../constants/ThemeColors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // mode: 'auto' | 'light' | 'dark'
  const [mode, setMode] = useState('auto');
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    if (mode === 'auto') {
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme);
      });
      setColorScheme(Appearance.getColorScheme());
      return () => listener.remove();
    }
  }, [mode]);

  const theme =
    mode === 'auto'
      ? ThemeColors[colorScheme || 'light']
      : ThemeColors[mode];

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
