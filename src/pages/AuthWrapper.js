import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loadingGif from '../assets/preloader.gif'

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();
  
  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt="" />
      </Wrapper>
    );
  }

  if (error) {
    return <Wrapper>oops... {error.message}</Wrapper>;
  }

  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
