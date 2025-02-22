'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system' | null;
const ThemesList: {
  type: Theme;
  icon: React.ReactNode;
}[] = [
  {
    type: 'light',
    icon: <Sun className='size-18' strokeWidth={1} />,
  },
  {
    type: 'system',
    icon: <Monitor className='size-18' strokeWidth={1} />,
  },
  {
    type: 'dark',
    icon: <Moon className='size-18' strokeWidth={1} />,
  },
];

export let ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: 'system',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  let [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    setTheme((localStorage.getItem('currentTheme') ?? 'system') as Theme);
  }, []);

  let themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

function onChange(theme: Theme, setTheme: (theme: Theme) => void) {
  if (theme !== null) {
    localStorage.setItem('currentTheme', theme);
  } else {
    localStorage.removeItem('currentTheme');
  }
  (window as any)._updateTheme(theme);
  setTheme(theme);
}

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    onChange(theme, setTheme);
  };

  return (
    <div className='border-color relative z-0 inline-grid w-fit grid-cols-3 gap-1 rounded-full border p-2'>
      {ThemesList.map((el) => (
        <button
          key={el.type}
          onClick={() => handleThemeChange(el.type)}
          aria-label='System theme'
          className={cn(
            'flex h-32 w-32 items-center justify-center rounded-full p-2 opacity-60 hover:cursor-pointer hover:opacity-100',
            theme && theme === el.type && 'bg-black/10 opacity-100 dark:bg-white/10',
          )}
        >
          {el.icon}
        </button>
      ))}
    </div>
  );
}
