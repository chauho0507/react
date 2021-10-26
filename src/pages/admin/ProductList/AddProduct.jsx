import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../UI/Modal';
import { addProductAction } from '../../../redux/actions';
import { Card, Form, Button, Input, Space, Row, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AddProduct = ({ setIsAdd }) => {
  const dispatch = useDispatch();
  const handleAddProduct = values => {
    dispatch(addProductAction(values));
    setIsAdd(false);
  };

  return (
    <Modal onClose={setIsAdd}>
      <Card title="Add Product">
        <Form
          name="product"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={values => handleAddProduct(values)}
          initialValues={{ image: 'https://via.placeholder.com/800x600' }}
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Bạn chưa nhập ID.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            validateFirst
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Bạn chưa nhập tên sản phẩm!',
              },
              {
                min: 6,
                max: 32,
                message: 'Tên sản phẩm phải nằm trong khoảng 6-32 kí tự',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Bạn chưa nhập giá.' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="New" name="isNew" valuePropName="checked">
            <Checkbox checked />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            // rules={[{ required: true, message: 'Bạn chưa nhập hình ảnh.' }]}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Form.Item>
          <Row justify="end">
            <Space size="large">
              <Button type="primary" htmlType="submit">
                Ok
              </Button>
              <Button danger onClick={() => setIsAdd(false)}>
                Cancel
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default AddProduct;
