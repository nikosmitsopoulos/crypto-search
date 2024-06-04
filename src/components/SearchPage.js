import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cryptos, setCryptos] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        setCryptos(response.data);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
      }
    };
    fetchCryptos();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setShowSuggestions(false);

    try {
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          headers: {
            "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
          params: { namePrefix: query },
        }
      );
      setResults(response.data.data);
    } catch (error) {
      setError("Error fetching search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handleSuggestionClick = (crypto) => {
    if (crypto.id) {
      navigate(`/coin/${crypto.id}`);
    }
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search..."
          className="search-bar form-control"
        />
        <button
          onClick={handleSearch}
          className="search-button btn btn-primary mt-2"
        >
          Search
        </button>
        {showSuggestions && (
          <ul className="suggestions-list list-group">
            {cryptos.slice(0, 10).map((crypto, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => handleSuggestionClick(crypto)}
              >
                {crypto.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {error && (
        <div className="error">
          {error}
          <button onClick={() => setError("")} className="btn btn-close">
            x
          </button>
        </div>
      )}
      <div className="results row mt-3">
        {results.length === 0 && !loading && <p>No results found.</p>}
        {results.map((item) => (
          <div
            key={item.id}
            className="card col-md-4"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="card-body">
              <h5 className="card-title">{item.city}</h5>
              <p className="card-text">{item.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
