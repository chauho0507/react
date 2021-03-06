import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAction } from '../../redux/actions/toDoList.action';
import TaskItem from './TaskItem';

import { Form, Button, Input, Card } from 'antd';

const ToDoListPage = () => {
  const { taskList } = useSelector(state => state.toDoListReducer);
  const dispatch = useDispatch();

  const handleAddTask = values => {
    const newTaskList = [values, ...taskList];
    dispatch(addTaskAction(newTaskList));
  };

  const renderTaskItem = useMemo(() => {
    return taskList.map((taskItem, taskIndex) => {
      return <TaskItem key={taskIndex} data={taskItem} index={taskIndex} />;
    });
  }, [taskList]);

  return (
    <div>
      <Card title="To Do List">
        <Form
          name="addTask"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
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

          <Button type="primary" htmlType="submit">
            Thêm Task
          </Button>
        </Form>
      </Card>
      {renderTaskItem}
    </div>
  );
};

export default ToDoListPage;
