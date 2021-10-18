import React from 'react';
import { useHistory, generatePath } from 'react-router-dom';

import { PRODUCT_LIST } from '../../constants/product';
import { ROUTER } from '../../constants/router';

const ProductListPage = () => {
  const history = useHistory();

  const renderProductList = () => {
    return PRODUCT_LIST.map((item, index) => (
      <div
        key={item.id}
        className="card"
        onClick={() =>
          history.push({
            pathname: generatePath(ROUTER.PRODUCT_DETAIL, { id: item.id }),
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
          <div>{item.price.toLocaleString()}</div>
        </div>
      </div>
    ));
  };

  return <div className="list">{renderProductList()}</div>;
};

export default ProductListPage;
