import React, { useState } from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const [len, setLen] = useState(3);
  const {
    featured_products: featured,
    products_loading: loading,
    products_error: error,
  } = useProductsContext();

  // For showing more products as user clicks on show more
  const increment = 1;
  const handleClick = () => {
    const nextLen = len + increment;
    if (nextLen > featured.length) {
      return;
    }
    setLen(nextLen);
  };

  if (loading) {
    return <Loading />;
  }
  if (error.flag) {
    return <Error {...error} />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="featured section-center">
        {featured.slice(0, len).map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleClick}>
          show more
        </button>
        <Link to="/products" className="btn">
          All products
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  .btn-container{

    padding: 0 25rem;
display:flex;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
