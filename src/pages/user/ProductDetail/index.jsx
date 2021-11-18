import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetailAction } from "../../../redux/actions";

const ProductDetailPage = ({ match, ...props }) => {
  const id = match.params?.id;
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.productReducer);
  const { loading } = productDetail;
  useEffect(() => {
    if (id) {
      dispatch(getProductDetailAction({ id }));
    }
  }, [id]);

  return (
    <div>
      Product Detail Ahihi Page
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div>{productDetail.data.name}</div>
          <div>{`${productDetail.data.price?.toLocaleString()} ₫`}</div>
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
