import React, { useState, useEffect, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  addTaskAction,
  getTaskListAction,
  deleteTaskAction,
  editTaskAction,
} from '../../../redux/actions';

import TaskItem from './TaskItem';
import { Form, Button, Input, Card, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const ToDoListPageAntD = () => {
  useEffect(() => {
    dispatch(getTaskListAction());
  }, []);

  const [toDoListForm] = Form.useForm();
  const { taskList, actionLoading } = useSelector(
    state => state.toDoListReducer
  );
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState('');
  const filterTaskList = taskList.data.filter(task =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleAddTask = values => {
    dispatch(addTaskAction({ data: values }));
    toDoListForm.resetFields();
  };

  const handleEditTask = values => {
    dispatch(editTaskAction({ data: values }));
  };

  const handleDeleteTask = id => {
    dispatch(deleteTaskAction({ id }));
  };

  const renderTaskItem = useMemo(() => {
    return filterTaskList.map(taskItem => {
      return (
        <TaskItem
          key={taskItem.id}
          id={taskItem.id}
          data={taskItem}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      );
    });
  }, [filterTaskList]);

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
            <Button
              type="primary"
              htmlType="submit"
              loading={actionLoading.addTask}
            >
              Thêm Task
            </Button>
          </Row>
        </Form>
      </Card>
      <Input
        style={{ margin: '16px 0', maxWidth: 700, width: '100%' }}
        suffix={<SearchOutlined />}
        onChange={e => setSearchKeyword(e.target.value)}
      />
      {taskList.loading && <p>Loading...</p>}
      {!taskList.loading && renderTaskItem}
    </div>
  );
};

export default ToDoListPageAntD;
