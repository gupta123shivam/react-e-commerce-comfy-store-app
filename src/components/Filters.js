import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const { filters, updateFilters, clearFilters, all_products } =
    useFilterContext();
  const {
    text,
    company,
    category,
    color,
    min_price,
    max_price,
    price,
    free_shipping,
  } = filters;
  // Can also go for an button[Filter Products] rather than automatic,
  // clicking upon which triggers filters change, and then only we call updateFilters

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>Categories</h5>
            <div className="">
              {categories.map((c, idx) => {
                return (
                  <button
                    className={`${c === category ? "active" : null}`}
                    key={idx}
                    onClick={updateFilters}
                    type="button"
                    name="category"
                    value={c}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>Company</h5>
            <div className="">
              {companies.map((c, idx) => {
                return (
                  <button
                    className={`${c === company ? "active" : null}`}
                    key={idx}
                    onClick={updateFilters}
                    type="button"
                    name="company"
                    value={c}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/*START of colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              <button
                name="color"
                data-color="all"
                className={`all-btn ${"all" === color ? "active" : null}`}
                onClick={updateFilters}
              >
                all
              </button>
              {colors.slice(1).map((c, idx) => {
                return (
                  <button
                  key={idx}
                    name="color"
                    className={`color-btn ${c === color ? "active" : null}`}
                    data-color={c}
                    style={{ background: c }}
                    onClick={updateFilters}
                  >
                    {color === c && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* END of colors */}
          {/*START of price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              id=""
              onChange={updateFilters}
              max={max_price}
              min={min_price}
              value={price}
              step={50}
            />
          </div>
          {/* END of price */}
          {/*START of shipping */}
          <div className="form-control shipping">
            <label htmlFor="free_shipping">free shipping</label>
            <input
              type="checkbox"
              name="free_shipping"
              id="free_shipping"
              onChange={updateFilters}
              checked={free_shipping}
            />
          </div>
          {/* END of shipping */}
          {/*START of clear filter */}
          <button type="button" className="clear-btn" onClick={clearFilters}>Clear Filters</button>
          {/* END of clear filter  */}
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
