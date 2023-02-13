import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { colors, id, stock } = product;
  const [main, setMain] = useState(0);
  const [amount, setAmount] = useState(1);

  function handleAmountChange(i) {
    if (![1, -1].includes(i)) {
      return;
    }
    if (i === 1 && amount + 1 > stock) return;
    if (i === -1 && amount - 1 < 0) return;
    setAmount((t) => t + i);
  }

  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>
          {colors.map((color, idx) => {
            return (
              <button
                key={idx}
                onClick={() => setMain(idx)}
                className={`color-btn ${idx === main ? "active" : null}`}
                style={{ background: color }}
              >
                {main === idx && <FaCheck />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons amount={amount} onChange={handleAmountChange} />
        <button
          type="button"
          className="btn"
          disabled={amount === 0}
          onClick={() => {
            addToCart(id, colors[main], amount, product);
          }}
        >add to cart</button>
        <Link to={'/cart'} className={'btn'} >Go to cart</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    margin-left:1rem;
  }
`;
export default AddToCart;
