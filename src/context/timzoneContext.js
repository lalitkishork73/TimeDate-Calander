import React, { createContext, useContext, useState } from 'react';

const TimezoneContext = createContext();

const TimezoneProvider = ({ children }) => {
  const [timezone, setTimezone] = useState('Europe/London');


  const setAppTimezone = (selectedTimezone) => {
    setTimezone(selectedTimezone);
  };

  return (
    <TimezoneContext.Provider value={{ timezone, setAppTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
};

const useTimezone = () => {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error('useTimezone must be used within a TimezoneProvider');
  }
  return context;
};

export { TimezoneProvider, useTimezone };
