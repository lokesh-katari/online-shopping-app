// import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/Products/Product';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(products);
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
export default ProductList;