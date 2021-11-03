import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetailAction } from '../../../redux/actions';

const ProductDetailPage = ({ match, ...props }) => {
  const id = match.params?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(getProductDetailAction({ id }));
  }, [id]);

  const { productDetail } = useSelector(state => state.productReducer);
  const { loading } = productDetail;
  const { name, price } = productDetail.data;

  return (
    <div>
      Product Detail Page
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div>{name}</div>
          <div>{`${price} ₫`}</div>
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
