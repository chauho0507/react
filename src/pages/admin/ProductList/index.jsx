import React, { useEffect, useState } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Button,
  Space,
  Image,
  Row,
  Popconfirm,
  Drawer,
  Form,
  Input,
  InputNumber,
  Checkbox,
} from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

// import { PRODUCT_LIST } from '../../../api/product';
import { ROUTER } from '../../../constants/router';

import {
  getProductListAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from '../../../redux/actions';

const AdminProductListPage = () => {
  // null: close
  // 'create': open with create form
  // 'update': open with update form
  const [isShowModifyProduct, setIsShowModifyProduct] = useState(null);
  const [initialUpdateValue, setInitialUpdateValue] = useState({});

  const [modifyProductForm] = Form.useForm();
  const history = useHistory();

  const { productList } = useSelector(state => state.productReducer);
  const dispatch = useDispatch();

  const initialValues = initialUpdateValue.id
    ? {
        name: initialUpdateValue?.name,
        price: initialUpdateValue?.price,
        isNew: initialUpdateValue?.isNew,
      }
    : {
        name: '',
        price: 0,
        isNew: false,
      };

  useEffect(() => {
    if (!!isShowModifyProduct) {
      modifyProductForm.resetFields();
    }
  }, [isShowModifyProduct]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getProductListAction(PRODUCT_LIST));
  //   }, 1000);
  // }, []);

  const handleDeleteProduct = id => {
    dispatch(deleteProductAction({ id }));
  };

  const handleSubmitForm = values => {
    if (isShowModifyProduct === 'update') {
      dispatch(
        updateProductAction({
          ...values,
          id: initialUpdateValue.id,
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
    setIsShowModifyProduct(null);
  };

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      render: (_, record) => {
        return (
          <Space size={16}>
            <Image height={40} width={40} src={record.image} />
            {record.name}
          </Space>
        );
      },
    },
    {
      title: 'New',
      dataIndex: 'isNew',
      key: 'isNew',
      width: '8%',
      render: (_, record) => {
        return <Space size={16}>{record.isNew ? <CheckOutlined /> : ''}</Space>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      render: item => `${item.toLocaleString()} ₫`,
    },
    {
      title: 'Action',
      key: 'action',
      width: '25%',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={() => {
              setIsShowModifyProduct('update');
              setInitialUpdateValue(record);
            }}
          >
            Sửa (Modal)
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() =>
              history.push(
                generatePath(ROUTER.ADMIN.UPDATE_PRODUCT, { id: record.id })
              )
            }
          >
            Sửa (Trang mới)
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này không?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tableData = productList.map(item => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 0 }}>Quản lý sản phẩm</h3>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyProduct('create');
              setInitialUpdateValue({});
            }}
          >
            Thêm sản phẩm (Modal)
          </Button>
          <Button
            type="primary"
            onClick={() => history.push(ROUTER.ADMIN.CREATE_PRODUCT)}
          >
            Thêm sản phẩm (Trang mới)
          </Button>
        </Space>
      </Row>
      <Table size="small" columns={tableColumns} dataSource={tableData} />
      <Drawer
        title={
          isShowModifyProduct === 'update' ? 'Sửa sản phẩm' : 'Thêm sản phẩm'
        }
        placement="right"
        onClose={() => setIsShowModifyProduct(null)}
        visible={!!isShowModifyProduct}
        width={500}
      >
        <Form
          form={modifyProductForm}
          name={
            isShowModifyProduct === 'update'
              ? 'update-product-form'
              : 'create-product-form'
          }
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
              {isShowModifyProduct === 'update' ? 'Sửa' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdminProductListPage;
