"use client";

import { useRouter } from "next/navigation";
import { Product } from "../types";
import SectionContainer from "./sectionContainer";
import "./productCard.css";

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <SectionContainer className="product-card">
      <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />
      <span className="product-category">{product.category}</span>
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">{product.price.toFixed(2)}€</p>
      <button
        className="product-button"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        Ver detalles
      </button>
    </SectionContainer>
  );
};

export default ProductCard;