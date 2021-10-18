import React from 'react';
import { Form, Input, Button } from 'antd';

const EditTask = ({ listTasks, setEditActive }) => {
  return (
    <Form
      name="edit"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      // onFinish={submitHandler}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Button ghost style={{ color: 'red' }} onClick={() => {}}>
        Delete
      </Button>

      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            min: 6,
            max: 24,
            message: 'Tiêu đề trong khoảng 6 đến 24 kí tự.',
          },
          { required: true, message: 'Bạn phải nhập tiêu đề!' },
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
            message: 'Mô tả trong khoảng 12 đến 36 kí tự.',
          },
          { required: true, message: 'Cần nhập mô tả!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button ghost style={{ color: 'blue' }} htmlType="submit">
          Ok
        </Button>
        <Button
          ghost
          style={{ color: 'red' }}
          onClick={() => setEditActive(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTask;
