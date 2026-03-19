"use client";

import { useEffect, useState } from "react";
import { Product } from "./types";
import { getAllProducts } from "./api/product";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/productCard";
import "./page.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getAllProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-container">
      <div className="search-section">
        <h1>Catálogo de Productos</h1>

        <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

        <p className="results-count">
          {searchQuery
            ? `${filteredProducts.length} resultado(s) para "${searchQuery}"`
            : `${products.length} productos en total`}
        </p>
      </div>

      {loading && <h1>Loading...</h1>}
      {error && <h2>{error}</h2>}

      <div className="results-container">
        {filteredProducts.slice(0, 20).map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;