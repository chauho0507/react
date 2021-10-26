import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProductAction } from '../../../redux/actions';

import { Card, Form, Button, Input, Space, Row, Checkbox } from 'antd';
import Modal from '../../../UI/Modal';
import { UploadOutlined } from '@ant-design/icons';

const EditProduct = ({ setIsEdit }) => {
  const { productDetail } = useSelector(state => state.productReducer);
  const dispatch = useDispatch();

  const handleEditProduct = values => {
    dispatch(editProductAction(values));
    setIsEdit(false);
  };

  return (
    <Modal onClose={setIsEdit}>
      <Card title="Edit Product">
        <Form
          name="product"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price,
            isNew: productDetail.isNew,
            image: 'https://via.placeholder.com/800x600',
          }}
          onFinish={values => handleEditProduct(values)}
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
              <Button danger onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </Modal>
  );
};

export default EditProduct;
