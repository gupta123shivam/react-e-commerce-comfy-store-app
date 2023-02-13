import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext();

  if (cart.length < 1) {
    return (
      <main>
        <PageHero title={"checkout"} />
        <Wrapper className="page">
          <div className="empty">
            <h2>Your Cart is empty</h2>
            <Link to={"/cart"} className="btn">
              fill it
            </Link>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
          <StripeCheckout />
      </Wrapper>
    </main>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;
export default CheckoutPage;
