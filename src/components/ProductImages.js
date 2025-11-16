import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProductImages = ({ images = [] }) => {
  const [main, setMain] = useState(0);

  // ensure main index is valid when images change
  useEffect(() => {
    if (!images || images.length === 0) return;
    if (main > images.length - 1) setMain(0);
  }, [images, main]);

  // normalize images: allow array of objects, array of strings, or empty
  const hasImages = images && images.length > 0;
  if (!hasImages) {
    // nothing to show
    return null;
  }

  const getUrl = (img) => (typeof img === "string" ? img : img?.url);
  const getAlt = (img, idx) => (typeof img === "string" ? `image-${idx}` : img?.filename || `image-${idx}`);

  return (
    <Wrapper>
      <img src={getUrl(images[main])} alt="main" className="main" />
      <div className="gallery">
        {images.map((image, idx) => (
          <img
            src={getUrl(image)}
            alt={getAlt(image, idx)}
            key={idx}
            onClick={() => setMain(idx)}
            className={`${getUrl(image) === getUrl(images[main]) ? "active" : ""}`}
          />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
