import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTaskAction, editTaskAction } from '../../../redux/actions';

import { Card, Button, Row, Form, Input } from 'antd';

const TaskItem = ({ data, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editForm] = Form.useForm();

  const dispatch = useDispatch();

  const handleEditTask = (index, values) => {
    dispatch(editTaskAction({ index, values }));
  };

  const handleDeleteTask = index => {
    dispatch(deleteTaskAction({ index: index }));
  };

  const renderItemView = useMemo(() => {
    return (
      <>
        <h3>Tiêu đề: {data.title}</h3>
        <div>Nội dung: {data.description}</div>
      </>
    );
  }, [data]);

  const renderItemEdit = useMemo(() => {
    return (
      <Form
        form={editForm}
        name={`editTask-${index}`}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          title: data.title,
          description: data.description,
        }}
        onFinish={values => handleEditTask(index, values)}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          validateFirst
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Bạn chưa nhập tiêu đề!',
            },
            {
              min: 6,
              max: 32,
              message: 'Tiêu đề phải nằm trong khoảng 6-32 kí tự',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="description"
          rules={[{ required: true, message: 'Bạn chưa nhập nội dung' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }, [data]);

  return (
    <Card
      title={
        <Row justify="end">
          {isEdit ? (
            <>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                onClick={() => {
                  editForm.submit();
                  setIsEdit(false);
                }}
              >
                Xác nhận
              </Button>
              <Button
                type="primary"
                ghost
                style={{ marginRight: 8 }}
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              ghost
              style={{ marginRight: 8 }}
              onClick={() => setIsEdit(true)}
            >
              Sửa
            </Button>
          )}
          <Button danger onClick={() => handleDeleteTask(index)}>
            Xóa
          </Button>
        </Row>
      }
      style={{ marginTop: 8, maxWidth: 700, width: '100%' }}
    >
      {isEdit ? renderItemEdit : renderItemView}
    </Card>
  );
};

export default TaskItem;
