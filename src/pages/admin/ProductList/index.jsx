import React, { useEffect, useState, useMemo } from 'react';
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
  Pagination,
  Select,
} from 'antd';
import { CheckOutlined, SearchOutlined } from '@ant-design/icons';

import { ROUTER } from '../../../constants/router';
import { PAGE_SIZE } from '../../../constants/pagination';
import classes from './productList.module.css';

import {
  getProductListAction,
  getCategoryListAction,
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
  const [productKeyword, setProductKeyword] = useState('');

  const [modifyProductForm] = Form.useForm();
  const history = useHistory();

  const { productList } = useSelector(state => state.productReducer);
  const { categoryList } = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data?.map(category => {
      return (
        <Select.Option key={category.id} value={category.id}>
          {category.name}
        </Select.Option>
      );
    });
  }, [categoryList.data]);

  const initialValues = initialUpdateValue.id
    ? {
        name: initialUpdateValue?.name,
        price: initialUpdateValue?.price,
        isNew: initialUpdateValue?.isNew,
        categoryId: initialUpdateValue?.categoryId,
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

  useEffect(() => {
    dispatch(getProductListAction({ limit: PAGE_SIZE.ADMIN_PRODUCT, page: 1 }));
    dispatch(getCategoryListAction({}));
  }, []);

  // const searchProductHandler = value => {
  //   dispatch(
  //     getProductListAction({
  //       limit: PAGE_SIZE.ADMIN_PRODUCT,
  //       page: 1,
  //       keyword: value,
  //     })
  //   );
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getProductListAction({
          limit: PAGE_SIZE.ADMIN_PRODUCT,
          page: 1,
          keyword: productKeyword,
        })
      );
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [productKeyword]);

  const handleDeleteProduct = id => {
    dispatch(deleteProductAction({ id }));
  };

  const handleSubmitForm = values => {
    console.log(values);
    if (isShowModifyProduct === 'update') {
      dispatch(
        updateProductAction({
          id: initialUpdateValue.id,
          data: {
            ...values,
            image: 'https://via.placeholder.com/800x600',
          },
          callback: {
            goBackList: () => setIsShowModifyProduct(null),
          },
        })
      );
    } else {
      dispatch(
        createProductAction({
          data: {
            ...values,
            image: 'https://via.placeholder.com/800x600',
          },
          callback: {
            goBackList: () => setIsShowModifyProduct(null),
          },
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
      title: 'Nhà sản xuất',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: '10%',
      render: (_, record) => {
        return <Space size={16}>{record.category?.name}</Space>;
      },
    },
    {
      title: 'New',
      dataIndex: 'isNew',
      key: 'isNew',
      width: '8%',
      render: (_, record) => {
        return (
          <Space size={16}>
            {record.isNew ? <CheckOutlined style={{ color: 'red' }} /> : ''}
          </Space>
        );
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
      title: '',
      key: 'action',
      width: '25%',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={() => {
              console.log(record);
              setIsShowModifyProduct('update');
              setInitialUpdateValue(record);
            }}
          >
            Sửa (Modal)
          </Button>
          <Button
            type="primary"
            ghost
            onClick={() => {
              history.push(
                generatePath(ROUTER.ADMIN.UPDATE_PRODUCT, { id: record.id })
              );
            }}
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

  const tableData = productList.data.map(item => ({
    ...item,
    key: item.id,
    id: item.id,
  }));

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 0 }}>Quản lý sản phẩm</h3>
        <Space>
          <Button
            onClick={() => {
              setIsShowModifyProduct('create');
              setInitialUpdateValue({});
            }}
          >
            Thêm sản phẩm (Modal)
          </Button>
          <Button onClick={() => history.push(ROUTER.ADMIN.CREATE_PRODUCT)}>
            Thêm sản phẩm (Trang mới)
          </Button>
        </Space>
      </Row>
      {productList.error && <p>Error: {productList.error.message}</p>}
      <Row style={{ width: '60%', margin: '0 auto', paddingBottom: 16 }}>
        <Input
          className={classes.searchInput}
          prefix={<SearchOutlined />}
          placeholder="Search"
          onChange={e => setProductKeyword(e.target.value)}
          // onChange={e => searchProductHandler(e.target.value)}
        />
      </Row>
      <Table
        size="small"
        columns={tableColumns}
        dataSource={tableData}
        loading={productList.loading}
      />

      <Pagination
        current={productList.meta.page}
        total={productList.meta.total}
        onChange={page => dispatch(getProductListAction({ limit: 10, page }))}
      />

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
            label="Nhà sản xuất"
            name="categoryId"
            rules={[{ required: true, message: 'Bạn chưa chọn nhà sản xuất' }]}
          >
            <Select placeholder="Nhà sản xuất">{renderCategoryOptions}</Select>
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
