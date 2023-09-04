import { createContext, useState } from "react";
export const Appcontext = createContext();
export const AppContextProvidor = (props) => {
  const [appdata, setappdata] = useState({});
  return (
    <Appcontext.Provider value={[appdata,setappdata]}>
        {props.children}
    </Appcontext.Provider>
  )
};
