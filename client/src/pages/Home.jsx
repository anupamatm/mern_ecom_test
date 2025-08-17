import { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { API_BASE } from "../api/http";
import { PRODUCT_CATEGORIES } from "../constants/categories";
import ProductCard from "../components/ProductCard.jsx";

import "../styles/Home.css";
import "../styles/Card.css";
import "../styles/Pager.css";
import "../styles/FilterStyles.css";
import "../styles/Error.css";

export default function Home() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [minPrice, setMin] = useState("");
  const [maxPrice, setMax] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await http.get("/products", {
        params: { q, category, sort, page, minPrice, maxPrice, limit: 12 },
      });
      setItems(data.items);
      setPages(data.pages);
    } catch (e) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [q, category, sort, page, minPrice, maxPrice]);

  return (
    <div className="container">
      <h1>Our Products</h1>

      <div className="filter-container">
        <div className="filter-group" style={{ flex: '2' }}>
          <label className="filter-label">Search Products</label>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or description..."
            value={q}
            onChange={e => {
              setPage(1);
              setQ(e.target.value);
            }}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            value={category}
            onChange={e => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {PRODUCT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <div className="price-container">
            <input
              type="number"
              className="price-input"
              placeholder="Min"
              value={minPrice}
              onChange={e => {
                setPage(1);
                setMin(e.target.value);
              }}
            />
            <span>to</span>
            <input
              type="number"
              className="price-input"
              placeholder="Max"
              value={maxPrice}
              onChange={e => {
                setPage(1);
                setMax(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select 
            value={sort} 
            onChange={e => setSort(e.target.value)}
            className="filter-select"
          >
            <option value="createdAt:desc">Newest First</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="name:asc">Name: A to Z</option>
          </select>
        </div>

        {(q || category || minPrice || maxPrice) && (
          <button 
            className="clear-filters"
            onClick={() => {
              setQ('');
              setCategory('');
              setMin('');
              setMax('');
              setPage(1);
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Loading…</p>
      ) : items.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid">
          {items.map((p) => (
           <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      <div className="pager">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          {page} / {pages}
        </span>
        <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
