import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";

const CartTotals = () => {
  const { total_amount, shipping_fee, total_items } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();
  const isTotalNotZero = total_items > 0;
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal: <span>{formatPrice(total_amount)}</span>
          </h5>
          <h5>
            shipping_fee: <span>{formatPrice(shipping_fee)}</span>
          </h5>
          <hr />
          <h4>
            Order total:{" "}
            <span>
              {isTotalNotZero
                ? formatPrice(total_amount + shipping_fee)
                : "----"}
            </span>
          </h4>
        </article>
        {isTotalNotZero ? (
          <>
            {!myUser ? (
              <button className="btn" onClick={loginWithRedirect}>
                Login to buy
              </button>
            ) : (
              <Link to="/checkout" className="btn">
                Proceed to pay
              </Link>
            )}
          </>
        ) : (
          <h4 className="warning">
            You have 0 items in your cart. Please add some items{" "}
          </h4>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
  .warning {
    width: 50%;
  }
`;

export default CartTotals;
