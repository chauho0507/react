import React from 'react';
import { useSelector } from 'react-redux';

const ProductDetailPage = ({ match, ...props }) => {
  const { productList } = useSelector(state => state.productReducer);
  const id = match.params?.id;
  const productData = productList.find(item => item.id === parseInt(id));
  console.log(productData);

  return (
    <div>
      Product Detail Page
      <div>{productData?.name}</div>
      <div>{productData?.price.toLocaleString()}</div>
    </div>
  );
};

export default ProductDetailPage;
