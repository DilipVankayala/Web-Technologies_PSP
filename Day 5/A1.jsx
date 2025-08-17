import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const API_KEY = "your_api_key_here"; // Replace with your OMDb API key

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Fetch movies
  const fetchMovies = async (newQuery, newPage = 1) => {
    if (!newQuery) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${newQuery}&page=${newPage}`
      );
      if (res.data.Search) {
        setMovies((prev) =>
          newPage === 1 ? res.data.Search : [...prev, ...res.data.Search]
        );
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
    setLoading(false);
  };

  // Debounced search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);

    if (debounceTimer) clearTimeout(debounceTimer);

    setDebounceTimer(
      setTimeout(() => {
        fetchMovies(value, 1);
      }, 600) // debounce 600ms
    );
  };

  // Load more
  const loadMore = () => {
    const nextPage = page + 1;
    fetchMovies(query, nextPage);
    setPage(nextPage);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🎬 Movie Search</h2>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleSearchChange}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => <Skeleton key={i} height={220} />)
          : movies.map((movie) => (
              <div
                key={movie.imdbID}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center",
                  background: "#fafafa",
                }}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/150"
                  }
                  alt={movie.Title}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
                <h4>{movie.Title}</h4>
                <p>{movie.Year}</p>
              </div>
            ))}
      </div>

      {movies.length > 0 && !loading && (
        <button
          onClick={loadMore}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}