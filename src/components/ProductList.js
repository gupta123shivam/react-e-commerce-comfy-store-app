import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import styled from "styled-components";

const ProductList = () => {
  const { filtered_products: products, is_grid_view } = useFilterContext();

  if (products.length < 1) {
    return <Wrapper>Sorry, no products matched your filter....</Wrapper>;
  }

  if (is_grid_view) {
    return <GridView products={products}></GridView>;
  }
  return <ListView products={products}></ListView>;
};

const Wrapper = styled.h5`
  text-transform: "none";
`;

export default ProductList;
