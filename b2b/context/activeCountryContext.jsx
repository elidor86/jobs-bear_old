import { createContext, useContext, useState } from "react";

export const ActiveCountryContext = createContext(null);

const countries = {
  US: "US",
  UK: "UK",
  ZA: "ZA",
  CA: "CA",
};

export const useActiveCountry = () => {
  const useDialog = useContext(ActiveCountryContext);

  if (!useDialog) {
    throw Error("Cannot use ActiveCountryContext outside of ActiveCountryProvider");
  } else {
    return useDialog;
  }
};

const ActiveCountryProvider = ({ children }) => {
  const [activeCountry, setActiveCountry] = useState(countries.UK);

  return (
    <ActiveCountryContext.Provider value={{ activeCountry, setActiveCountry }}>
      {children}
    </ActiveCountryContext.Provider>
  );
};

export default ActiveCountryProvider;
