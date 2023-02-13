import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const {
    single_products,
    fetchSingleProductLocal,
    fetchSingleProduct,
    single_product_loading: loading,
    single_product_error: error,
  } = useProductsContext();
  const { productId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchSingleProduct(productId);
    // fetchSingleProductLocal();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (error.flag) {
        // history.push("/");
      }
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error.flag, history]);

  if (loading || !single_products) {
    return <Loading />;
  }
  if (error.flag) {
    return <Error {...error} />;
  }

  const {
    id: sku,
    stock,
    price,
    images,
    reviews,
    stars,
    name,
    description,
    company,
  } = single_products;
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available: </span>
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p className="info">
              <span>SKU: </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand: </span>
              {company}
            </p>
            <hr></hr>
            {stock > 0 ? <AddToCart product={single_products} /> : <h4 style={{marginTop:'2rem'}}>Product Not in STock</h4>}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
