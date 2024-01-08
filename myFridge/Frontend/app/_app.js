import { createContext, useContext, useState } from 'react';

var tokenContext = createContext()

function credentialsData(){
  var [token] = useState()

  
  return (
    <tokenContext.Provider value={{ isOpen }}>
    </tokenContext.Provider>
  );
}


export {tokenContext , credentialsData};