import React, { useEffect } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ROUTER } from '../../../constants/router';
import { getProductListAction } from '../../../redux/actions';

const ProductListPage = () => {
  useEffect(() => {
    dispatch(getProductListAction({ limit: 10, page: 1 }));
  }, []);

  const { productList } = useSelector(state => state.productReducer);

  const dispatch = useDispatch();

  const history = useHistory();

  const renderProductList = () => {
    return productList.data.map(item => (
      <div
        key={item.id}
        className="card"
        onClick={() =>
          history.push({
            pathname: generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: item.id }),
            search: '?sort=new',
            hash: '#demo',
            state: item,
          })
        }
      >
        {item.isNew && <div className="new">NEW</div>}
        <img src={item.image} className="image" alt="" />
        <div className="card-content">
          <div>{item.name}</div>
          <div>{`${item.price.toLocaleString()} ₫`}</div>
        </div>
      </div>
    ));
  };

  return <div className="list">{renderProductList()}</div>;
};

export default ProductListPage;
