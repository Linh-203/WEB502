import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch('http://localhost:8080/api/products/' + id)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  return (
    <div>
      <h1>Product Detail Page</h1>

      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
      <h2>
        <img src={product.image} alt="" />
      </h2>
      <h2>{product.categoryId?.name}</h2>
      <h2>{product.desc}</h2>
    </div>
  );
};

export default ProductDetailPage;
