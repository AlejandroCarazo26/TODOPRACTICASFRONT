"use client";

import { getProductById } from "@/app/api/product";
import { Product } from "@/app/types";
import SectionContainer from "@/app/components/sectionContainer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./productDetail.css";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    getProductById(String(id))
      .then((res) => {
        setProduct(res.data);
        setCurrentImage(0);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message ?? e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handlePrev = () => {
    if (!product) return;
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!product) return;
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="product-detail-container">
      {loading && <h1>Loading...</h1>}
      {error && <h2>{error}</h2>}

      {product && (
        <SectionContainer className="product-detail-card">

          {/* Galería con navegación — mismo sitio que antes tenía la imagen única */}
          <div className="product-gallery">
            <button className="gallery-btn" onClick={handlePrev}>&#8592;</button>
            <div className="gallery-img-wrapper">
              <img
                src={product.images[currentImage]}
                alt={`${product.title} ${currentImage + 1}`}
                className="country-detail-flag"
              />
              <p className="gallery-counter">
                {currentImage + 1} / {product.images.length}
              </p>
            </div>
            <button className="gallery-btn" onClick={handleNext}>&#8594;</button>
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
            <strong>Valoración:</strong> ({product.rating})
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