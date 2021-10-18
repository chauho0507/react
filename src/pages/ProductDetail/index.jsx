import React from "react";

import { PRODUCT_LIST } from "../../constants/product";

const ProductDetailPage = ({ match, ...props }) => {
  const id = match.params?.id;
  const productData = PRODUCT_LIST.find((item) => item.id === parseInt(id));

  return (
    <div>
      Product Detail Page
      <div>{productData.name}</div>
      <div>{productData.price.toLocaleString()}</div>
    </div>
  );
};

export default ProductDetailPage;
