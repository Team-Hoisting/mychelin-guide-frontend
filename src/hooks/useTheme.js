import { useState, useEffect } from 'react';

// theme 변경할 때 toggleTheme 사용
const useTheme = () => {
  const getInitialState = () => {
    let initialTheme = localStorage.getItem('theme');

    if (!initialTheme) {
      initialTheme = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
      localStorage.setItem('theme', initialTheme);
    }

    return initialTheme;
  };

  const [theme, setTheme] = useState(getInitialState);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
  };

  return toggleTheme;
};

export default useTheme;
