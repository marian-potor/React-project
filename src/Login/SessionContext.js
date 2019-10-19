import React from 'react'

const SessionContext = React.createContext({
  user: {},
  setUser: () => {}
});

export default SessionContext;
