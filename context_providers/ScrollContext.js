import { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrolls, setScrolls] = useState({});

  const saveScroll = (path) => {
    setScrolls((prev) => ({ ...prev, [path]: window.scrollY }));
  };

  const getScroll = (path) => {
    return scrolls[path] || 0;
  };

  return (
    <ScrollContext.Provider value={{ saveScroll, getScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
