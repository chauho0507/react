import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAction } from '../../../redux/actions';
import TaskItem from './TaskItem';

import { getTaskListAction } from '../../../redux/actions';
import { TO_DO_LIST } from '../../../api/toDoList';

import { Form, Button, Input, Card, Row } from 'antd';

const ToDoListPageAntD = () => {
  useEffect(() => {
    dispatch(getTaskListAction(TO_DO_LIST));
  }, []);

  const [toDoListForm] = Form.useForm();
  const { taskList } = useSelector(state => state.toDoListReducer);
  const dispatch = useDispatch();

  const handleAddTask = values => {
    dispatch(addTaskAction(values));
    toDoListForm.resetFields();
  };

  const renderTaskItem = useMemo(() => {
    return taskList.map((taskItem, taskIndex) => {
      return <TaskItem key={taskIndex} data={taskItem} index={taskIndex} />;
    });
  }, [taskList]);

  return (
    <div>
      <Card title="To Do List" style={{ maxWidth: 700, width: '100%' }}>
        <Form
          form={toDoListForm}
          name="addTask"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ username: 'Tuấn' }}
          onFinish={values => handleAddTask(values)}
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
          <Row justify="center">
            <Button type="primary" htmlType="submit">
              Thêm Task
            </Button>
          </Row>
        </Form>
      </Card>
      {renderTaskItem}
    </div>
  );
};

export default ToDoListPageAntD;
