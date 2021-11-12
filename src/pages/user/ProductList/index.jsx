import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PAGE_SIZE } from '../../../constants/pagination';
import { Col, Row, Card, Tag, Input, Space, Button } from 'antd';

import { ROUTER } from '../../../constants/router';
import {
  getProductListAction,
  getCategoryListAction,
} from '../../../redux/actions';
import * as S from './styles';

const ProductListPage = () => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [keywordFilter, setKeywordFilter] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { productList } = useSelector(state => state.productReducer);
  const { categoryList } = useSelector(state => state.categoryReducer);

  useEffect(() => {
    dispatch(
      getProductListAction({
        limit: PAGE_SIZE.USER_PRODUCT,
        page: 1,
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getProductListAction({
          limit: PAGE_SIZE.USER_PRODUCT,
          page: 1,
          keyword: keywordFilter,
        })
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [keywordFilter]);

  const renderCategoryList = () => {
    return categoryList.data?.map(item => (
      <S.FilterItem
        key={item.id}
        active={categoryFilter?.id === item.id}
        onClick={() => {
          dispatch(
            getProductListAction({
              limit: PAGE_SIZE.USER_PRODUCT,
              page: 1,
              categoryId: item.id,
              keyword: keywordFilter,
            })
          );
          setCategoryFilter(item);
        }}
      >
        {item.name}
      </S.FilterItem>
    ));
  };

  const renderProductList = () => {
    return productList.data?.map(item => (
      <Col span={6} key={item.id}>
        <div
          className="card"
          onClick={() =>
            history.push(
              generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: item.id })
            )
          }
        >
          {item.isNew && <div className="new">NEW</div>}
          <img src={item.image} className="image" alt="" />
          <div className="card-content">
            <div>{item.name}</div>
            <div>{`${item.price.toLocaleString()} ₫`}</div>
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card size="small">{renderCategoryList()}</Card>
      </Col>
      <Col span={18}>
        <Input
          placeholder="Search"
          value={keywordFilter}
          onChange={e => {
            // dispatch(
            //   getProductListAction({
            //     limit: PAGE_SIZE.USER_PRODUCT,
            //     page: 1,
            //     categoryId: categoryFilter?.id,
            //     keyword: e.target.value,
            //   })
            // );

            setKeywordFilter(e.target.value);
          }}
        />
        <Space style={{ marginTop: 16 }}>
          {categoryFilter && (
            <Tag
              closable
              onClose={() => {
                setCategoryFilter({});
                dispatch(
                  getProductListAction({
                    limit: PAGE_SIZE.USER_PRODUCT,
                    page: 1,
                    keyword: keywordFilter,
                  })
                );
              }}
            >
              {categoryFilter.name}
            </Tag>
          )}
          {keywordFilter && (
            <Tag
              closable
              onClose={() => {
                setKeywordFilter('');
                dispatch(
                  getProductListAction({
                    limit: PAGE_SIZE.USER_PRODUCT,
                    page: 1,
                    categoryId: categoryFilter?.id,
                  })
                );
              }}
            >
              Keyword: {keywordFilter}
            </Tag>
          )}
        </Space>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {renderProductList()}
        </Row>
        {productList.meta.total !== productList.data.length && (
          <Row justify="center" style={{ marginTop: 16 }}>
            <Button
              loading={productList.loading}
              onClick={() => {
                dispatch(
                  getProductListAction({
                    limit: PAGE_SIZE.USER_PRODUCT,
                    page: productList.meta.page + 1,
                    categoryId: categoryFilter?.id,
                    keyword: keywordFilter,
                    more: true,
                  })
                );
              }}
            >
              Show more
            </Button>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default ProductListPage;
