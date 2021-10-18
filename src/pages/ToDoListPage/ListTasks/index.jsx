import React from 'react';

import Tasks from './Tasks';
import { List } from 'antd';

const ListTasks = ({ listTasks, onRemove, setEditActive }) => {
  return (
    <List itemLayout="vertical">
      {listTasks.length > 0 &&
        listTasks.map((task, idx) => (
          <Tasks
            key={idx}
            setEditActive={setEditActive}
            {...task}
            onRemove={onRemove}
          />
        ))}
    </List>
  );
};

export default ListTasks;
