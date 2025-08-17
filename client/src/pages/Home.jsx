import { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate , Link} from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { API_BASE } from "../api/http";
import ProductCard from "../components/ProductCard.jsx";

import "../styles/Home.css";
import "../styles/Card.css";
import "../styles/Pager.css";
import "../styles/Filters.css";
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
      <h1>Products</h1>

      <div className="filters">
        <input
          placeholder="Search"
          value={q}
          onChange={e => {
            setPage(1);
            setQ(e.target.value);
          }}
        />
        <input
          placeholder="Category"
          value={category}
          onChange={e => {
            setPage(1);
            setCategory(e.target.value);
          }}
        />
        <input
          placeholder="Min ₹"
          value={minPrice}
          onChange={e => {
            setPage(1);
            setMin(e.target.value);
          }}
        />
        <input
          placeholder="Max ₹"
          value={maxPrice}
          onChange={e => {
            setPage(1);
            setMax(e.target.value);
          }}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="createdAt:desc">Newest</option>
          <option value="price:asc">Price: Low → High</option>
          <option value="price:desc">Price: High → Low</option>
          <option value="name:asc">Name A–Z</option>
        </select>
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
