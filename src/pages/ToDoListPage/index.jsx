import React, { useState, useRef } from 'react';
import { Form, Input, Button } from 'antd';

import ListTasks from './ListTasks';
import EditTask from './EditTask';

const ToDoListPage = () => {
  const [listTasks, setListTasks] = useState([]);

  const [editActive, setEditActive] = useState(false);

  // const titleInputRef = useRef();
  // const descriptionInputRef = useRef();

  const submitHandler = values => {
    setListTasks(() => {
      return [
        ...listTasks,
        {
          id: listTasks.length + 1,
          title: values.title,
          description: values.description,
        },
      ];
    });
  };

  const removeTaskHandler = id => {
    setListTasks(() => {
      return listTasks.filter(task => task.id !== id);
    });
  };

  return (
    <div>
      <h1>To Do List</h1>
      <Form
        name="add"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={submitHandler}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              min: 6,
              max: 24,
              message: 'Title trong khoảng 6 đến 24 kí tự.',
            },
            { required: true, message: 'Please input your title!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              min: 12,
              max: 36,
              message: 'Description trong khoảng 12 đến 36 kí tự.',
            },
            { required: true, message: 'Please input your description!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button style={{ width: '56%' }} type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      {!editActive && (
        <ListTasks
          setEditActive={setEditActive}
          listTasks={listTasks}
          onRemove={removeTaskHandler}
        />
      )}
      {editActive && (
        <EditTask
          setEditActive={setEditActive}
          listTasks={listTasks}
          onRemove={removeTaskHandler}
        />
      )}
    </div>
  );
};

export default ToDoListPage;
