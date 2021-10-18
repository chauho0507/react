import React from 'react';

const UsersContext = React.createContext({
  users: [],
  admin: [],

  addUsers: values => {},
});

export default UsersContext;
