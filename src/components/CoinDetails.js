import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CoinDetails.css";

const CoinDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setDetails(response.data);
      } catch (error) {
        setError("Error fetching coin details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="coin-details">
      <h1>{details.name}</h1>
      <p>Symbol: {details.symbol.toUpperCase()}</p>
      <p>Current Price: ${details.market_data.current_price.usd}</p>
      <p>Market Cap: ${details.market_data.market_cap.usd}</p>
      <p>24h High: ${details.market_data.high_24h.usd}</p>
      <p>24h Low: ${details.market_data.low_24h.usd}</p>
      <p>Circulating Supply: {details.market_data.circulating_supply}</p>
      <p>Total Supply: {details.market_data.total_supply}</p>
      <p>
        Description:{" "}
        {details.description.en ? details.description.en.split(". ")[0] : "N/A"}
      </p>
      <img src={details.image.large} alt={`${details.name} logo`} />
    </div>
  );
};

export default CoinDetails;
