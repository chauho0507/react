import React from 'react';

import { List, Button } from 'antd';

const Tasks = ({ id, title, description, onRemove, setEditActive }) => {
  return (
    <>
      <List.Item>
        <div>Task #{id}</div>
        <div>Title: {title}</div>
        <div style={{ marginBottom: '0.5rem' }}>Description: {description}</div>

        <Button onClick={() => setEditActive(true)} style={{ color: 'blue' }}>
          Edit
        </Button>
        <Button
          style={{ marginLeft: '1rem', color: 'red' }}
          onClick={() => onRemove(id)}
        >
          Delete
        </Button>
      </List.Item>
    </>
  );
};

export default Tasks;
