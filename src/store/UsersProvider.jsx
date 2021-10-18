import UsersContext from './users-context';

const UsersProvider = props => {
  const usersContext = {
    users: [
      {
        id: 1,
        name: 'Tuấn',
        email: 'tuan@gmail.com',
        password: '123123',
        role: 'user',
      },
    ],
    admin: [
      {
        id: 2,
        name: 'Tuấn Admin',
        email: 'tuanadmin@gmail.com',
        password: '123123',
        role: 'admin',
      },
      {
        id: 3,
        name: 'Châu',
        email: 'chaumap@gmail.com',
        password: '123123',
        role: 'admin',
      },
    ],

    addUsers: user => {
      console.log('hello');
    },
  };

  return (
    <UsersContext.Provider value={usersContext}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
