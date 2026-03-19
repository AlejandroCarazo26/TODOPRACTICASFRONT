"use client";


import { Product } from "@/app/types";
import SectionContainer from "@/app/components/sectionContainer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./productDetail.css";
import { getProductById } from "@/app/api/product";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getProductById(String(id))
      .then((res) => {
        setProduct(res.data);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message ?? e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="product-detail-container">
      {loading && <h1>Loading...</h1>}
      {error && <h2>{error}</h2>}

      {product && (
        <SectionContainer className="product-detail-card">

          <div className="product-gallery">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt={`${product.title} ${i + 1}`} className="gallery-img" />
            ))}
          </div>

          <h1 className="product-detail-title">{product.title}</h1>

          <p className="product-detail-info">
            <strong>Marca:</strong> {product.brand}
          </p>

          <p className="product-detail-info">
            <strong>Descripción:</strong> {product.description}
          </p>

          <p className="product-detail-info">
            <strong>Categoría:</strong>{" "}
            <span className="product-category-badge">{product.category}</span>
          </p>

          <p className="product-detail-price">
            {product.price.toFixed(2)}€
          </p>

          <p className="product-detail-info">
            <strong>Stock:</strong>{" "}
            {product.stock < 10
              ? `Pocas unidades (${product.stock})`
              : `En stock (${product.stock})`}
          </p>

          <p className="product-detail-info">
            <strong>Valoración:</strong> {"".repeat(Math.round(product.rating))} ({product.rating})
          </p>

          <p className="product-detail-info">
            <strong>Peso:</strong> {product.weight}g
          </p>

          <p className="product-detail-info">
            <strong>Dimensiones:</strong>{" "}
            {product.dimensions.width} {product.dimensions.height} {product.dimensions.depth} cm
          </p>

          <button className="product-back-button" onClick={() => router.back()}>
            ← Volver al catálogo
          </button>

        </SectionContainer>
      )}
    </div>
  );
};

export default ProductDetail;