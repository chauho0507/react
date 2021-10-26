import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Input, Button, InputNumber, Checkbox } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { ROUTER } from '../../../constants/router';

import {
  createProductAction,
  updateProductAction,
} from '../../../redux/actions';

const ModifyProductPage = () => {
  const history = useHistory();
  const { params } = useRouteMatch();
  console.log(params);
  const id = params?.id;
  console.log(id);

  const { productList } = useSelector(state => state.productReducer);
  const dispatch = useDispatch();
  console.log(productList);

  const productData = productList.find(item => item.id === id);
  console.log(productData);

  const initialValues = id
    ? {
        name: productData?.name,
        price: productData?.price,
        isNew: productData?.isNew,
      }
    : {
        name: '',
        price: 0,
        isNew: false,
      };

  const handleSubmitForm = values => {
    if (id) {
      dispatch(
        updateProductAction({
          ...values,
          id,
          image: 'https://via.placeholder.com/800x600',
        })
      );
    } else {
      dispatch(
        createProductAction({
          ...values,
          id: uuidv4(),
          image: 'https://via.placeholder.com/800x600',
        })
      );
    }
    history.push(ROUTER.ADMIN.PRODUCT_LIST);
  };

  return (
    <div>
      <h3>{id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</h3>
      <Card style={{ maxWidth: 700, width: '100%' }}>
        <Form
          name={id ? 'update-product-form' : 'create-product-form'}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={initialValues}
          onFinish={values => handleSubmitForm(values)}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Bạn chưa nhập tên' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[{ required: true, message: 'Bạn chưa nhập giá' }]}
          >
            <InputNumber
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="isNew"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 18 }}
          >
            <Checkbox>Sản phẩm mới</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 18 }}
            style={{ marginBottom: 0 }}
          >
            <Button type="primary" htmlType="submit">
              {id ? 'Sửa' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ModifyProductPage;
